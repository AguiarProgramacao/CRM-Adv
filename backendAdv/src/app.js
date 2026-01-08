const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const processoRoutes = require('./routes/processoRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const googleRoutes = require('./routes/googleRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const emailRoutes = require('./routes/emailRoutes');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const etapasRoutes = require('./routes/etapasRoutes');

app.use('/webhook', express.raw({ type: 'application/json' }), require('./routes/webhookRoutes'));
app.use('/audios', express.static('public/audios'));

require('dotenv').config();

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: "*"
}));

// Rotas
app.use('/processos', processoRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/google', googleRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/stripe', stripeRoutes);
app.use('/clientes', clienteRoutes);
app.use('/whatsapp', whatsappRoutes);
app.use('/email', emailRoutes);
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/etapas', etapasRoutes);

module.exports = app;
