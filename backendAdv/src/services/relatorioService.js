const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

exports.gerarCSV = (dados, campos) => {
  const parser = new Parser({ fields: campos });
  return parser.parse(dados);
};

exports.gerarPDF = (dados, campos, titulo) => {
  const doc = new PDFDocument();
  let buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(20).text(titulo, { align: 'center' });
  doc.moveDown();

  dados.forEach((item) => {
    campos.forEach((campo) => {
      doc.fontSize(12).text(`${campo}: ${item[campo]}`);
    });
    doc.moveDown();
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
  });
};
