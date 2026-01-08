const service = require('../services/emailService');

exports.enviar = async (req, res) => {
  try {
    const { para, assunto, texto } = req.body;
    await service.enviarEmail(para, assunto, texto);
    res.json({ mensagem: 'E-mail enviado!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
