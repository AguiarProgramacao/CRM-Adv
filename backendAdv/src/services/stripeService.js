const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.criarBoleto = async ({ nome, email, clienteId, valorCentavos }) => {
  try {
    const valor = Number(valorCentavos);
    if (!valor || isNaN(valor) || valor <= 0) {
      throw new Error('Valor inválido');
    }
    
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['boleto'],
      payment_method_options: {
        boleto: {
          expires_after_days: 3,
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Cobrança para ${nome}`,
            },
            unit_amount: parseInt(valorCentavos),
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        clienteId: String(clienteId),
      },
      payment_intent_data: {
        metadata: {
          clienteId: String(clienteId),
        },
      },
      success_url: 'http://localhost:5173/sucesso',
      cancel_url: 'http://localhost:5173/erro',
      expand: ['payment_intent'],
    });

    const vencimento = new Date();
    vencimento.setDate(vencimento.getDate() + 3);

    const boleto = await prisma.boleto.create({
      data: {
        clienteId,
        clienteNome: nome,
        codigo: `BOL${Date.now()}`,
        descricao: `Cobrança para ${nome}`,
        valor,
        vencimento,
        linhaDigitavel: null,
        stripeUrl: session.url,
      },
    });

    return { session, boleto };
  } catch (error) {
    console.error('Erro ao gerar boleto:', error);
    throw error;
  }
};