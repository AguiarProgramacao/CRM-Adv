const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // corpo RAW graças ao express.raw()
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Erro ao verificar assinatura do webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      /* ---------------------------------------------------------
       * boleto gerado   → captura linha digitável & hosted_url
       * -------------------------------------------------------*/
      case 'payment_intent.requires_action':
      case 'payment_intent.created': {
        const pi         = event.data.object;
        const linha      = pi?.next_action?.boleto_display_details?.number;
        const hostedUrl  = pi?.next_action?.boleto_display_details?.hosted_voucher_url;
        const clienteId  = parseInt(pi.metadata?.clienteId);

        if (!linha || !hostedUrl || !clienteId) {
          console.warn('Dados incompletos para atualizar boleto');
          break;
        }

        await prisma.boleto.updateMany({
          where: { clienteId, linhaDigitavel: null },
          data:  { linhaDigitavel: linha, stripeUrl: hostedUrl }
        });

        console.log('✅ Linha digitável gravada:', linha);
        break;
      }

      /* ---------------------------------------------------------
       * boleto confirmado pago
       * -------------------------------------------------------*/
      case 'payment_intent.succeeded':
      case 'checkout.session.async_payment_succeeded': {
        const obj        = event.data.object; // pode ser session ou PI
        const clienteId  = parseInt(obj.metadata?.clienteId);
        const pagoEm     = new Date(obj.created * 1000);

        if (clienteId) {
          await prisma.boleto.updateMany({
            where: { clienteId, status: { in: ['emitido', 'vencido'] } },
            data:  { status: 'pago', pagoEm }
          });
          console.log(`💰 Boleto do cliente ${clienteId} marcado como PAGO`);
        }
        break;
      }

      /* ---------------------------------------------------------
       * boleto expirou sem pagamento -> marcar como vencido
       * -------------------------------------------------------*/
      case 'charge.expired': {
        const charge     = event.data.object;
        const clienteId  = parseInt(charge.metadata?.clienteId);
        if (clienteId) {
          await prisma.boleto.updateMany({
            where: { clienteId, status: 'emitido' },
            data:  { status: 'vencido' }
          });
          console.log(`⚠️ Boleto do cliente ${clienteId} vencido`);
        }
        break;
      }

      default:
        console.log('ℹ️ Evento ignorado:', event.type);
    }

    res.status(200).send('Webhook recebido');
  } catch (err) {
    console.error('Erro ao processar webhook:', err);
    res.status(500).send('Erro interno');
  }
});

module.exports = router;
