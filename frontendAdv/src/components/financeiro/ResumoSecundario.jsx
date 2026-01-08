import { Banknote, FileText, AlertCircle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const cores = ['#1d4ed8', '#dc2626', '#9333ea', '#10b981', '#f97316'];

export default function ResumoSecundario({
  transacoes = [],
  boletos = [],
  alertas = [],
  fluxoCaixa = [],
  categorias = []
}) {
  const ultimasTransacoes = [...transacoes]
    .sort((a, b) => new Date(b.dataTransacao) - new Date(a.dataTransacao))
    .slice(0, 3);

  const ultimosBoletos = [...boletos]
    .sort((a, b) => new Date(b.dataBoleto) - new Date(a.dataBoleto))
    .slice(0, 3);

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Fluxo de Caixa</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fluxoCaixa}>
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="entrada" name="Entradas" fill="#16a34a" />
              <Bar dataKey="saida" name="Saídas" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Distribuição por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorias}
                dataKey="percentual"
                nameKey="nome"
                cx="40%"
                cy="45%"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
              >
                {categorias.map((_, index) => (
                  <Cell key={index} fill={cores[index % cores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Banknote className="text-blue-500" size={20} /> Últimas Transações
          </h3>
          <div className="space-y-3">
            {ultimasTransacoes.map((transacao) => (
              <div key={transacao.id} className="bg-blue-50 px-4 py-3 rounded-md flex justify-between items-start">
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-950">
                    {transacao.tipo === 'entrada' ? (
                      <ArrowUpCircle className="text-green-600" size={16} />
                    ) : (
                      <ArrowDownCircle className="text-red-600" size={16} />
                    )}
                    {transacao.descricao}
                  </p>
                  <p className="text-xs text-gray-950">
                    {transacao.cliente?.nome || 'Sem cliente'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transacao.dataTransacao).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${transacao.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                    {transacao.tipo === 'entrada' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR')}
                  </p>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {transacao.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Ver Todas
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="text-orange-500" size={20} /> Boletos Recentes
          </h3>
          <div className="space-y-3">
            {ultimosBoletos.map((boleto) => (
              <div key={boleto.id} className="bg-orange-50 px-4 py-3 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-950">{boleto.codigo}</p>
                  <span className="text-gray-950 font-semibold">
                    R$ {boleto.valor.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-600">{boleto.clienteNome || 'Cliente não informado'}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full
                    ${boleto.status === 'emitido'
                        ? 'bg-yellow-100 text-yellow-800'
                        : boleto.status === 'enviado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'}
                      `}
                  >
                    {boleto.status}
                  </span>
                </div>
                <p className="text-xs text-orange-600">
                  Vence: {new Date(boleto.vencimento).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full text-center border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Ver Todos
          </button>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="text-green-600" size={20} /> Alertas Financeiros
          </h3>
          {alertas.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhum alerta</p>
          ) : (
            <div className="bg-red-50 p-3 rounded-md space-y-1">
              {alertas.map((a, idx) => (
                <div key={idx}>
                  <p className="text-sm font-semibold text-red-700">{a.titulo}</p>
                  <p className="text-xs text-red-600">{a.descricao}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
