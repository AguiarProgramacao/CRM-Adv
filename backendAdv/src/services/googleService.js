const { google } = require('googleapis');
const oAuth2Client = require('../config/googleAuth');
const prisma = new (require('@prisma/client')).PrismaClient();

exports.setCredentials = (tokens) => {
  oAuth2Client.setCredentials(tokens);
};

exports.generateAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/calendar'],
    redirect_uri: process.env.GOOGLE_REDIRECT_URI
  });
};

exports.loadCredentialsForUser = async (userId) => {
  const token = await prisma.googleToken.findUnique({ where: { userId } });
  if (!token) throw new Error('Token do Google não encontrado para este usuário');

  oAuth2Client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
    scope: token.scope,
    token_type: token.tokenType,
    expiry_date: token.expiryDate.getTime(),
  });

  if (Date.now() >= token.expiryDate.getTime()) {
    const { credentials } = await oAuth2Client.refreshAccessToken();
    oAuth2Client.setCredentials(credentials);

    await prisma.googleToken.update({
      where: { userId },
      data: {
        accessToken: credentials.access_token,
        expiryDate: new Date(credentials.expiry_date)
      }
    });
  }
};

exports.createGoogleEvent = async (userId, agendamento) => {
  await exports.loadCredentialsForUser(userId);

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const dataHoraFim = agendamento.dataHoraFim
    ? new Date(agendamento.dataHoraFim)
    : new Date(new Date(agendamento.dataHoraInicio).getTime() + 60 * 60 * 1000); // adiciona 1 hora se não vier

  const event = {
    summary: agendamento.titulo,
    description: `${agendamento.descricao || ''}\n\nContato: ${agendamento.email || ''} - ${agendamento.telefone || ''}`,
    start: {
      dateTime: new Date(agendamento.dataHoraInicio).toISOString(),
      timeZone: 'America/Sao_Paulo'
    },
    end: {
      dateTime: dataHoraFim.toISOString(),
      timeZone: 'America/Sao_Paulo'
    },
    attendees: agendamento.email ? [{ email: agendamento.email }] : [],
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    }
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    conferenceDataVersion: 1
  });

  return res.data.id;
};

exports.updateGoogleEvent = async (userId, googleEventId, agendamento) => {
  await exports.loadCredentialsForUser(userId);
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  await calendar.events.update({
    calendarId: 'primary',
    eventId: googleEventId,
    requestBody: {
      summary: agendamento.titulo,
      description: agendamento.descricao,
      start: { dateTime: agendamento.dataHoraInicio.toISOString() },
      end: { dateTime: agendamento.dataHoraFim.toISOString() }
    }
  });
};

exports.deleteGoogleEvent = async (userId, googleEventId) => {
  await exports.loadCredentialsForUser(userId);
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  await calendar.events.delete({
    calendarId: 'primary',
    eventId: googleEventId
  });
};

exports.verificarStatusGoogle = async (userId) => {
  const token = await prisma.googleToken.findUnique({
    where: { userId }
  });

  if (!token) {
    return { conectado: false };
  }

  const expirado = token.expiryDate && Date.now() >= token.expiryDate.getTime();

  return {
    conectado: !expirado
  };
};
