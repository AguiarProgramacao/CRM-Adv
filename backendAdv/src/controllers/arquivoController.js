const arquivoService = require('../services/arquivoService');

exports.uploadArquivo = async (req, res) => {
  try {
    const { processoId } = req.body;

    if (!processoId) {
      return res.status(400).json({ error: 'processoId é obrigatório.' });
    }

    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const arquivos = Array.isArray(req.files.file) ? req.files.file : [req.files.file];

    const arquivosSalvos = [];

    for (const arquivo of arquivos) {
      const arquivoSalvo = await arquivoService.salvarArquivo(
        arquivo.name,
        processoId,
        arquivo.data
      );
      arquivosSalvos.push(arquivoSalvo);
    }

    res.status(201).json(arquivosSalvos);
  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload de arquivo.' });
  }
};

exports.getArquivosByProcesso = async (req, res) => {
  try {
    const processoId = Number(req.params.id);
    if (isNaN(processoId)) {
      return res.status(400).json({ error: 'processoId inválido' });
    }

    const arquivos = await arquivoService.buscarArquivosPorProcesso(processoId);

    const arquivosComUrl = arquivos.map(a => ({
      ...a,
      url: `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/${path.basename(a.caminho)}`
    }));

    res.json(arquivosComUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};