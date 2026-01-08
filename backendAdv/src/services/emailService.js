const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.enviarEmail = async (para, assunto, texto) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: para,
    subject: assunto,
    text: texto
  });
};
