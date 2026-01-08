const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const axios = require('axios');
const INSTANCE = process.env.EVO_INSTANCE;
const KEY = process.env.EVO_API_KEY;

exports.receberMensagem = async (req, res) => {
  const { nome, numero, texto, fromMe, tipo, arquivoUrl, duracao } = req.body;

  // Validação básica
  if (!nome || !numero || typeof fromMe === 'undefined') {
    console.log("❌ Dados incompletos recebidos:", req.body);
    return res.status(400).json({ error: "Nome, número e fromMe são obrigatórios." });
  }

  if (!texto && !arquivoUrl) {
    return res.status(400).json({ error: "Mensagem precisa ter texto ou arquivo." });
  }

  try {
    const remetente = fromMe ? 'atendente' : 'cliente';

    const novaMensagem = await prisma.mensagem.create({
      data: {
        nome,
        numero,
        texto,
        tipo,
        arquivoUrl,
        duracao: duracao ? Number(duracao) : null,
        remetente,
      },
    });

    res.status(201).json(novaMensagem);
  } catch (error) {
    console.error("Erro ao salvar mensagem:", error);
    res.status(500).json({ error: "Erro ao salvar mensagem" });
  }
};

exports.listarMensagens = async (req, res) => {
  const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'asc' },
  });
  res.json(mensagens);
};

exports.enviarMensagem = async (req, res) => {
  const { numero, texto } = req.body;

  if (!numero || !texto) {
    return res.status(400).json({ error: "Número e texto são obrigatórios" });
  }

  try {
    const novaMensagem = await prisma.mensagem.create({
      data: {
        nome: 'Atendente',
        numero,
        texto,
        remetente: 'atendente',
      }
    });

    console.log("Corpo recebido:", req.body);

    const response = await axios.post(
      `http://192.168.0.105:8080/message/sendText/${INSTANCE}`,
      {
        number: numero,
        text: texto,
        delay: 0,
        linkPreview: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: KEY
        }
      }
    );

    console.log("Mensagem enviada via Evolution:", response.data);

    res.status(201).json(novaMensagem);
  } catch (e) {
    console.error("Erro ao salvar ou enviar mensagem:", e.message);
    res.status(500).json({ error: e.message });
  }
};