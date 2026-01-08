import { useEffect, useState } from "react";
import { getTodosProcessos, getAllTarefas } from "../services/processoService";
import { getClientes, getTodosAgendamentos } from "../services/clienteService";
import { startOfMonth, endOfMonth } from "date-fns";

export function useDashboardData() {
  const [processos, setProcessos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [agAtual, setAgAtual] = useState([]);
  const [agPassado, setAgPassado] = useState([]);

  useEffect(() => {
    async function load() {
      const [
        processosData,
        clientesData,
        tarefasData,
        agendamentos
      ] = await Promise.all([
        getTodosProcessos(),
        getClientes(),
        getAllTarefas(),
        getTodosAgendamentos()
      ]);

      setProcessos(processosData);
      setClientes(clientesData);
      setTarefas(tarefasData);

      const now = new Date();

      const atualIni = startOfMonth(now);
      const atualFim = endOfMonth(now);

      const pasIni = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));
      const pasFim = endOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));

      setAgAtual(
        agendamentos.filter(a => {
          const d = new Date(a.dataHoraInicio);
          return d >= atualIni && d <= atualFim;
        })
      );

      setAgPassado(
        agendamentos.filter(a => {
          const d = new Date(a.dataHoraInicio);
          return d >= pasIni && d <= pasFim;
        })
      );
    }

    load().catch(console.error);
  }, []);

  return {
    processos,
    clientes,
    tarefas,
    agAtual,
    agPassado,
  };
}
