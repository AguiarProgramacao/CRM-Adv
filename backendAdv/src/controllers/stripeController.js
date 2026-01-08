const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { criarBoleto } = require('../services/stripeService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.gerarBoleto = async (req, res) => {
  try {
    const { nome, email, clienteId, valorCentavos } = req.body;

    const { session, boleto } = await criarBoleto({ nome, email, clienteId, valorCentavos });

    console.log('Sessão Stripe retornada:', session);

    const boletoDetails = session?.payment_intent?.next_action?.boleto_display_details || null;

    res.status(201).json({
      sessionUrl: session.url,
      expiresAt: session.expires_at,
      boletoDetails,
      boletoId: boleto.id,
      linhaDigitavel: boleto.linhaDigitavel,
    });
  } catch (err) {
    console.error("Erro ao gerar boleto:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.listarBoletos = async (req, res) => {
  try {
    const boletos = await prisma.boleto.findMany({
      orderBy: { emissao: 'desc' }
    });

    const boletosAtualizados = boletos.map(b => {
      const hoje = new Date();
      const statusVencimento = new Date(b.vencimento) < hoje ? 'vencido' : 'aberto';
      return {
        ...b,
        statusVencimento,
      };
    });

    res.json(boletosAtualizados);
  } catch (err) {
    console.error("Erro ao listar boletos:", err);
    res.status(500).json({ error: "Erro ao buscar boletos" });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️  Erro ao verificar assinatura do webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 🔎 Verifica tipo do evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const paymentIntentId = session.payment_intent;

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      const clienteId = paymentIntent.metadata?.clienteId;
      const linhaDigitavel = paymentIntent.next_action?.boleto_display_details?.number;
      const url = paymentIntent.next_action?.boleto_display_details?.hosted_voucher_url;

      if (!clienteId || !linhaDigitavel) {
        console.warn('Webhook recebido mas sem clienteId ou linha digitável.');
        return res.sendStatus(200);
      }

      const boletoAtualizado = await prisma.boleto.updateMany({
        where: {
          clienteId: parseInt(clienteId),
          linhaDigitavel: null,
        },
        data: {
          linhaDigitavel,
          stripeUrl: url,
        },
      });

      console.log("✅ Linha digitável salva via webhook (checkout.session.completed):", linhaDigitavel);
    } catch (err) {
      console.error('Erro ao buscar PaymentIntent via webhook:', err);
    }
  }

  res.status(200).send();
};

exports.atualizarStatusBoleto = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const novoStatusVencimento = status === 'pago' ? 'fechado' : undefined;

    const boletoAtualizado = await prisma.boleto.update({
      where: { id: parseInt(id) },
      data: {
        status,
        ...(novoStatusVencimento && { statusVencimento: novoStatusVencimento })
      }
    });

    res.json(boletoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar status do boleto:', error);
    res.status(500).json({ error: 'Erro ao atualizar boleto' });
  }
};
