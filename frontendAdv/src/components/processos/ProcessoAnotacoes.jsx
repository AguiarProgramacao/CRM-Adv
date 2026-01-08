import { FileText } from "lucide-react";

export default function ProcessoAnotacoes({ anotacoes = [], onNova }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mt-4 h-68 overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg flex items-center">
          <FileText className="mr-2 text-blue-500" size={20} />
          Anotações ({anotacoes.length})
        </h3>

        <button
          onClick={onNova}
          className="bg-blue-600 text-white text-xs rounded px-2 py-1 hover:bg-blue-700"
        >
          + Nova
        </button>
      </div>

      {anotacoes.length === 0 ? (
        <div className="text-center mt-5">
          <FileText size={35} className="mx-auto mb-2" />
          <p>Nenhuma anotação</p>
          <p className="text-sm text-gray-500">
            Este processo ainda não possui anotações.
          </p>
          <button
            onClick={onNova}
            className="bg-blue-600 text-white mt-3 px-3 py-2 rounded hover:bg-blue-700"
          >
            + Criar Primeira Anotação
          </button>
        </div>
      ) : (
        <ul className="space-y-2">
          {anotacoes.map(a => (
            <li key={a.id} className="p-3 bg-gray-100 rounded">
              <p>{a.conteudo}</p>
              <p className="text-xs text-gray-400 mt-1">
                Criado em: {new Date(a.criadoEm).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
