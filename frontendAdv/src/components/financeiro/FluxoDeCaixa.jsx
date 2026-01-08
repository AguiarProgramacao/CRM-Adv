import { useState, useEffect } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Search, Edit } from 'lucide-react';
import { Input } from '../ui/input';
import { fetchTransacoes, atualizarStatusTransacao } from '../../services/financeiroService';
import ModalTransacaoForm from '../modal/ModalTransacao';

export default function TransacoesFinanceiras() {
  const [transacoes, setTransacoes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState('todos');
  const [statusSelecionado, setStatusSelecionado] = useState('todos');
  const [isModalAberto, setIsModalAberto] = useState(false);

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const carregarTransacoes = async () => {
    try {
      const res = await fetchTransacoes();

      if (Array.isArray(res)) {
        setTransacoes(res);
      } else if (Array.isArray(res?.data)) {
        setTransacoes(res.data);
      } else {
        console.warn("⚠️ Formato inesperado de resposta:", res);
        setTransacoes([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar transações:', error);
      setTransacoes([]);
    }
  };

  const handleAtualizarStatus = async (id) => {
    const novoStatus = prompt("Digite o novo status (Pago, Recebido):");
    if (!novoStatus) return;
    try {
      await atualizarStatusTransacao(id, novoStatus);
      carregarTransacoes();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const filtrarTransacoes = () => {
    if (!Array.isArray(transacoes)) return [];

    return transacoes.filter((t) => {
      const correspondeFiltro =
        t.descricao?.toLowerCase().includes(filtro.toLowerCase()) ||
        t.cliente?.nome?.toLowerCase().includes(filtro.toLowerCase());

      const correspondeTipo = tipoSelecionado === 'todos' || t.tipo === tipoSelecionado;
      const correspondeStatus = statusSelecionado === 'todos' || t.status === statusSelecionado;

      return correspondeFiltro && correspondeTipo && correspondeStatus;
    });
  };

  return (
    <div>
      <div className='flex justify-between'>
        <div>
          <h2 className="text-xl font-bold mb-1">Transações Financeiras</h2>
          <p className="text-gray-500 mb-4">Gerencie todas as entradas e saídas financeiras</p>
        </div>
        <button
          onClick={() => setIsModalAberto(true)}
          className="bg-blue-600 text-white px-4 rounded h-10 ml-auto cursor-pointer"
        >
          + Nova Transação
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 bg-white p-5 rounded shadow">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Buscar por descrição ou cliente..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="pl-10 p-2 rounded w-full bg-gray-100"
          />
        </div>

        <select
          className="border p-2 rounded"
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value)}
        >
          <option value="todos">Todos Tipos</option>
          <option value="entrada">Entradas</option>
          <option value="saida">Saídas</option>
        </select>

        <select
          className="border p-2 rounded"
          value={statusSelecionado}
          onChange={(e) => setStatusSelecionado(e.target.value)}
        >
          <option value="todos">Todos Status</option>
          <option value="recebido">Recebido</option>
          <option value="pago">Pago</option>
          <option value="pagar">Pagar</option>
          <option value="receber">Receber</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtrarTransacoes().map((transacao) => {
          const vencido = new Date(transacao.dataVencimento) < new Date();
          const statusLower = transacao.status?.toLowerCase() || "";

          return (
            <div
              key={transacao.id}
              className={`rounded-lg p-4 bg-white shadow flex flex-col md:flex-row md:justify-between items-start md:items-center ${transacao.tipo === 'entrada' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}
            >
              <div>
                <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                  {transacao.tipo === 'entrada' ? (
                    <ArrowUpCircle className="text-green-600" size={20} />
                  ) : (
                    <ArrowDownCircle className="text-red-600" size={20} />
                  )}
                  {transacao.descricao}
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded ml-2">
                    {transacao.status}
                  </span>

                  {vencido && statusLower === 'pagar' && (
                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                      ⚠️ Boleto Vencido
                    </span>
                  )}

                  {vencido && statusLower === 'receber' && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                      ⚠️ Fazer Cobrança
                    </span>
                  )}

                  <Edit
                    className="ml-3 text-blue-500 cursor-pointer"
                    size={18}
                    onClick={() => handleAtualizarStatus(transacao.id)}
                    title="Editar Status"
                  />
                </h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
                  <span className="bg-gray-100 px-2 rounded">{transacao.categoria}</span>
                  {transacao.cliente?.nome && (
                    <span className="bg-gray-100 px-2 rounded">{transacao.cliente.nome}</span>
                  )}
                  <span className="bg-gray-100 px-2 rounded">{transacao.formaPagamento}</span>
                </div>
                <p className="text-sm text-gray-600">
                  Data: {new Date(transacao.dataTransacao).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Status: {transacao.status}</p>
              </div>
              <div className="mt-3 md:mt-0 font-bold text-lg">
                {transacao.tipo === 'entrada' ? (
                  <span className="text-green-600">+ R$ {transacao.valor?.toFixed(2)}</span>
                ) : (
                  <span className="text-red-600">- R$ {transacao.valor?.toFixed(2)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Modal de Nova Transação */}
      <ModalTransacaoForm
        isOpen={isModalAberto}
        onClose={() => {
          setIsModalAberto(false);
          carregarTransacoes();
        }}
      />
    </div>
  );
}