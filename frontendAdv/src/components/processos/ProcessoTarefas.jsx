import { CheckSquare, AlertTriangle } from "lucide-react";
import { Badge } from "../ui/badge";
import { PRIORIDADE_COLORS } from "./constants";

export default function ProcessoTarefas({ tarefas = [], onNova }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-68 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg flex items-center">
          <CheckSquare size={20} className="text-orange-500 mr-1" />
          Tarefas ({tarefas.length})
        </h3>

        <button
          onClick={onNova}
          className="bg-orange-600 text-white text-xs rounded px-2 py-1 hover:bg-orange-700"
        >
          + Nova
        </button>
      </div>

      {tarefas.length === 0 ? (
        <div className="text-center mt-10">
          <CheckSquare size={35} className="mx-auto mb-2" />
          <p>Nenhuma tarefa</p>
          <p className="text-sm text-gray-500">
            Este processo ainda não possui tarefas.
          </p>
          <button
            onClick={onNova}
            className="bg-orange-600 text-white mt-3 px-3 py-2 rounded hover:bg-orange-700"
          >
            + Criar Primeira Tarefa
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {tarefas.map(t => (
            <li key={t.id} className="p-3 rounded shadow-md hover:shadow-xl">
              <div className="flex justify-between">
                <h2 className="font-semibold flex items-center">
                  {t.titulo}
                  <AlertTriangle size={14} className="ml-2 text-red-500" />
                </h2>

                <Badge className={PRIORIDADE_COLORS[t.prioridade]}>
                  {t.prioridade}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                Responsável: {t.responsavel?.nome || "Não definido"}
              </p>

              <p className="text-sm text-gray-500 mt-2">{t.descricao}</p>

              <p className="text-xs text-gray-500 mt-2">
                {t.status} <br />
                Vencimento: {new Date(t.dataVencimento).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
