import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import ProcessosPie from "../components/dashboard/ProcessosPie";
import AgendamentosLine from "../components/dashboard/AgendamentosLine";
import TarefasUrgentes from "../components/dashboard/TarefasUrgentes";
import ProcessosRecentes from "../components/dashboard/ProcessosRecentes";
import MensagensRecentes from "../components/dashboard/MensagensRecentes";

import { useDashboardData } from "../hooks/useDashboardData";
import { useMensagens } from "../hooks/useMensagens";
import { calcularCrescimentoPercentual } from "../utils/metrics";
import { useToast } from "../context/ToastContext";

export default function DashboardPage() {
  const { showToast } = useToast();

  const {
    processos,
    clientes,
    tarefas,
    agAtual,
    agPassado
  } = useDashboardData();

  const { mensagens, naoLidas } = useMensagens(showToast);

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />

      <StatsCards
        clientes={clientes}
        processos={processos}
        agAtual={agAtual}
        agPassado={agPassado}
        naoLidas={naoLidas}
        crescimentoClientes={calcularCrescimentoPercentual(clientes.length, 0)}
        crescimentoProcessos={calcularCrescimentoPercentual(processos.length, 0)}
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <ProcessosPie processos={processos} />
        <AgendamentosLine atual={agAtual} passado={agPassado} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <TarefasUrgentes tarefas={tarefas} />
        <ProcessosRecentes processos={processos} />
        <MensagensRecentes mensagens={mensagens} />
      </div>
    </div>
  );
}
