import { useEffect, useState } from "react";
import { getMensagens } from "../services/mensagemService";

export function useMensagens(showToast) {
  const [mensagens, setMensagens] = useState([]);
  const [naoLidas, setNaoLidas] = useState(0);

  useEffect(() => {
    getMensagens().then(res => {
      const agora = new Date();

      const agrupado = res.data.reduce((acc, msg) => {
        const tempo = (agora - new Date(msg.criadoEm)) / 1000;
        const status =
          msg.remetente === "cliente"
            ? tempo > 60 ? "vermelho" : tempo > 30 ? "amarelo" : "verde"
            : "nenhum";

        const existente = acc.find(c => c.numero === msg.numero);

        if (!existente) {
          acc.push({ ...msg, status });
        } else if (new Date(msg.criadoEm) > new Date(existente.criadoEm)) {
          Object.assign(existente, { ...msg, status });
        }

        return acc;
      }, []);

      agrupado.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

      setMensagens(agrupado.slice(0, 3));
      setNaoLidas(agrupado.filter(m => m.status !== "nenhum").length);

      const recente = agrupado.find(m => m.status === "verde");
      if (recente) {
        showToast({ nome: recente.nome, texto: recente.texto });
      }
    });
  }, []);

  return { mensagens, naoLidas };
}
