// src/controllers/atendimentoController.ts
export const enviarMensagem = async (req, res) => {
  const { atendimentoId, remetente, mensagem } = req.body;

  if (!atendimentoId || !mensagem || !remetente) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });
  }

  try {
    const novaMensagem = await prisma.mensagemAtendimento.create({
      data: {
        atendimentoId,
        remetente,
        mensagem,
      },
    });

    // Aqui você pode emitir via Socket.IO se estiver usando
    res.json(novaMensagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar mensagem" });
  }
};
