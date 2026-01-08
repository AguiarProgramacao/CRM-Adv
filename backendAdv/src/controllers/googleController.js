const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const googleService = require('../services/googleService');
const oAuth2Client = require('../config/googleAuth');

exports.authRedirect = (req, res) => {
  const url = googleService.generateAuthUrl();
  res.json({ url });
};

exports.authCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oAuth2Client.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    oAuth2Client.setCredentials(tokens);

    const userId = 1;

    await prisma.googleToken.upsert({
      where: { userId },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || undefined,
        scope: tokens.scope,
        tokenType: tokens.token_type,
        expiryDate: new Date(tokens.expiry_date),
      },
      create: {
        userId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope: tokens.scope,
        tokenType: tokens.token_type,
        expiryDate: new Date(tokens.expiry_date),
      },
    });

    res.json({ message: 'Google Calendar conectado!', tokens });
  } catch (err) {
    console.error("Erro ao autenticar com o Google:", err.response?.data || err.message || err);
    res.status(500).json({ error: err.response?.data || err.message || "Erro desconhecido" });
  }

};

exports.getStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const status = await googleService.verificarStatusGoogle(userId);

    return res.json(status);
  } catch (err) {
    console.error("Erro ao verificar status Google:", err);
    return res.status(500).json({ conectado: false });
  }
};