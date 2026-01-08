const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

exports.salvarArquivo = async (fileName, processoId, fileBuffer) => {
  const filePath = path.join(UPLOAD_DIR, fileName);

  // Salva o arquivo no sistema de arquivos
  fs.writeFileSync(filePath, fileBuffer);

  // Salva no banco de dados
  const arquivo = await prisma.arquivo.create({
    data: {
      nome: fileName,
      caminho: filePath,
      processoId: parseInt(processoId),
    },
  });

  return arquivo;
};

exports.buscarArquivosPorProcesso = async (processoId) => {
  const arquivos = await prisma.arquivo.findMany({
    where: {
      processoId: parseInt(processoId),
    },
  });
  return arquivos;
};
