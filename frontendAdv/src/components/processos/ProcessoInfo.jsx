import { User, Calendar, DollarSign, FileText } from "lucide-react";

export default function ProcessoInfo({ processo, arquivos = [] }) {
  if (!processo) return null;

  return (
    <div className="md:col-span-2 bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-xl mb-4 flex items-center">
        <FileText size={22} className="text-purple-500 mr-2" />
        Informações do Processo
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-2">
        <Info label="Número do Processo">
          <div className="bg-gray-100 p-2 rounded">{processo.numero}</div>
        </Info>

        <Info label="Área Jurídica">
          <span className="bg-blue-100 text-blue-700 text-xs rounded-full px-2 py-0.5">
            {processo.areaJuridica}
          </span>
        </Info>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-2">
        <Info label="Responsável">
          <User size={16} />
          {processo.responsavel?.nome || "Não definido"}
        </Info>

        <Info label="Data de Criação">
          <Calendar size={16} className="text-gray-500" />
          {new Date(processo.criadoEm).toLocaleDateString()}
        </Info>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-2">
        <Info label="Valor da Causa">
          <DollarSign size={16} className="text-gray-500" />
          R$ {processo.valor?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </Info>

        <Info label="Andamento">
          <span className="bg-green-100 text-green-700 text-xs rounded-full px-2 py-0.5">
            {processo.andamento}
          </span>
        </Info>
      </div>

      <div className="mt-4">
        <label className="font-bold block text-sm text-gray-600">
          Documentos do Processo
        </label>

        {arquivos.length === 0 ? (
          <p className="text-gray-500 mt-2">
            Nenhum documento enviado ainda.
          </p>
        ) : (
          <ul className="space-y-2 mt-2">
            {arquivos.map((arquivo) => (
              <li
                key={arquivo.id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span>{arquivo.nome}</span>
                <a
                  href={`${import.meta.env.VITE_API_BASE_URL}/uploads/${arquivo.caminho}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Visualizar
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h4 className="font-bold text-lg text-gray-700 mb-2">
          Partes do Processo
        </h4>

        <div className="bg-blue-50 rounded p-2 mb-2 text-gray-950">
          <strong>Autor/Requerente:</strong> {processo.autor}
        </div>

        <div className="bg-red-50 rounded p-2 text-gray-950">
          <strong>Réu/Requerido:</strong> {processo.reu}
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-bold text-lg text-gray-700 mb-2">
          Descrição
        </h4>

        <div className="bg-gray-100 p-2 rounded">
          {processo.descricao || "Sem descrição."}
        </div>
      </div>
    </div>
  );
}

function Info({ label, children }) {
  return (
    <div>
      <label className="font-bold block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
