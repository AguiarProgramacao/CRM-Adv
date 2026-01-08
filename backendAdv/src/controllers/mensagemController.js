const fs = require('fs');
const path = require('path');

exports.receberMensagem = async (req, res) => {
  const { processoId } = req.query;
  const { arquivo } = req.body;

  if (!arquivo || !processoId) {
    return res.status(400).json({ error: 'Arquivo ou processoId ausente' });
  }

  try {
    const pdfBuffer = Buffer.from(arquivo, 'utf-8');
    const nomeArquivo = `processo_${processoId}_${Date.now()}.pdf`;
    const caminho = path.join(__dirname, '..', 'uploads', nomeArquivo);
    fs.mkdirSync(path.dirname(caminho), { recursive: true });
    fs.writeFileSync(caminho, pdfBuffer);

    console.log('[DEBUG] Arquivo salvo em:', caminho);
    res.status(200).json({ sucesso: true, caminho });
  } catch (error) {
    console.error('[ERRO] Falha ao salvar PDF:', error);
    res.status(500).json({ erro: 'Erro ao salvar PDF' });
  }
};
