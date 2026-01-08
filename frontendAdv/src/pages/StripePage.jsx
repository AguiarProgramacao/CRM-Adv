import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  User, Receipt, CreditCard, CircleCheck, CircleX, Timer
} from 'lucide-react';
import { criarPagamento, listarCobrancasPorCliente } from '../services/financeiroService';
import { getClientes } from '../services/clienteService';

export default function StripePage() {
  const [clientes, setClientes] = useState([]);
  const [cobrancas, setCobrancas] = useState([]);
  const [filtros, setFiltros] = useState({ clienteId: '', status: '' });
  const [novaCobranca, setNovaCobranca] = useState({
    clienteId: '',
    valor: '',
    descricao: '',
    tipoPagamento: 'boleto'
  });

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const res = await getClientes();
      setClientes(res);
    } catch (error) {
      alert('Erro ao carregar clientes: ' + error.message);
    }
  };

  const buscarCobrancas = async () => {
    try {
      if (!filtros.clienteId) return alert('Selecione um cliente');
      const res = await listarCobrancasPorCliente(filtros.clienteId);
      const filtradas = filtros.status
        ? res.filter(c => c.status === filtros.status)
        : res;
      setCobrancas(filtradas);
    } catch {
      alert('Erro ao buscar cobranças');
    }
  };

  const handleCriarCobranca = async () => {
    try {
      const cliente = clientes.find(c => c.id === Number(novaCobranca.clienteId));
      if (!cliente) return alert('Cliente inválido');

      const dados = {
        clienteId: cliente.id,
        nomeCliente: cliente.nome,
        email: cliente.email,
        valor: parseFloat(novaCobranca.valor),
        descricao: novaCobranca.descricao,
        tipoPagamento: novaCobranca.tipoPagamento,
        documento: cliente.documento
      };

      const res = await criarPagamento(dados);

      if (res?.sessionUrl) {
        const abrir = confirm('Cobrança criada com sucesso. Deseja abrir o boleto agora?');
        if (abrir) window.open(res.sessionUrl, '_blank');
      } else {
        alert('Cobrança criada com sucesso');
      }

      setNovaCobranca({ clienteId: '', valor: '', descricao: '', tipoPagamento: 'boleto' });
      buscarCobrancas();
    } catch (error) {
      alert('Erro ao criar cobrança');
    }
  };

  const renderStatus = (status) => {
    const map = {
      emitido: { label: 'Emitido', icon: <Timer className="w-4 h-4 text-yellow-600" />, class: 'bg-yellow-100 text-yellow-700' },
      pago: { label: 'Pago', icon: <CircleCheck className="w-4 h-4 text-green-600" />, class: 'bg-green-100 text-green-700' },
      cancelado: { label: 'Cancelado', icon: <CircleX className="w-4 h-4 text-red-600" />, class: 'bg-red-100 text-red-700' }
    };

    const item = map[status] || { label: status, icon: null, class: 'bg-gray-100 text-gray-600' };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.class}`}>
        {item.icon} {item.label}
      </span>
    );
  };

  return (
    <div className="p-8 ml-64">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Receipt className="text-blue-600" /> Cobranças
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="text-emerald-600" /> Criar nova cobrança
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={novaCobranca.clienteId}
            onChange={e => setNovaCobranca({ ...novaCobranca, clienteId: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecione o cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome} - {c.email}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Valor"
            value={novaCobranca.valor}
            onChange={e => setNovaCobranca({ ...novaCobranca, valor: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Descrição"
            value={novaCobranca.descricao}
            onChange={e => setNovaCobranca({ ...novaCobranca, descricao: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <select
            value={novaCobranca.tipoPagamento}
            onChange={e => setNovaCobranca({ ...novaCobranca, tipoPagamento: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="boleto">Boleto</option>
          </select>
        </div>
        <button
          onClick={handleCriarCobranca}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Criar Cobrança
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User className="text-indigo-600" /> Cobranças Recentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            value={filtros.clienteId}
            onChange={e => setFiltros({ ...filtros, clienteId: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Filtrar por cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
          <select
            value={filtros.status}
            onChange={e => setFiltros({ ...filtros, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Todos os status</option>
            <option value="emitido">Emitido</option>
            <option value="pago">Pago</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <button
          onClick={buscarCobrancas}
          className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left">Cliente</th>
                <th className="p-2 border text-left">Valor</th>
                <th className="p-2 border text-left">Status</th>
                <th className="p-2 border text-left">Descrição</th>
                <th className="p-2 border text-left">Data</th>
                <th className="p-2 border text-left">Boleto</th>
              </tr>
            </thead>
            <tbody>
              {cobrancas.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{c.clienteNome}</td>
                  <td className="p-2 border">R$ {(c.valor / 100).toFixed(2)}</td>
                  <td className="p-2 border">{renderStatus(c.status)}</td>
                  <td className="p-2 border">{c.descricao}</td>
                  <td className="p-2 border">{format(new Date(c.emissao), 'dd/MM/yyyy HH:mm')}</td>
                  <td className="p-2 border">
                    {c.stripeUrl ? (
                      <a
                        href={c.stripeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Ver
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
