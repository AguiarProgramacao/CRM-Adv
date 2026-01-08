import { useEffect, useState } from "react";
import { Download, Clipboard, Plus, Receipt, AlertTriangle } from 'lucide-react';
import ModalBoleto from "../modal/ModalBoleto";
import { fetchBoletos } from "../../services/financeiroService";

export default function Boletos() {
  const [boletos, setBoletos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const total = boletos.length;
  const vencidos = boletos.filter(b => b.statusVencimento === 'vencido').length;
  const pagos = boletos.filter(b => b.status === 'pago').length;
  const totalAberto = boletos.reduce((acc, b) => acc + (b.status !== 'pago' ? b.valor / 100 : 0), 0);

  useEffect(() => {
    const carregar = async () => {
      const data = await fetchBoletos();
      setBoletos(data);
    };
    carregar();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Boletos</h2>
          <p className="text-gray-500 text-sm">Emita e acompanhe boletos bancários</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          <Plus size={16} /> Emitir Boleto
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ResumoBox label="Total de Boletos" value={total} color="text-black" />
        <ResumoBox label="Boletos Vencidos" value={vencidos} color="text-red-600" />
        <ResumoBox label="Total em Aberto" value={`R$ ${totalAberto.toLocaleString('pt-BR')}`} color="text-orange-600" />
        <ResumoBox label="Boletos Pagos" value={pagos} color="text-green-600" />
      </div>

      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Buscar por número do boleto ou cliente..."
          className="w-full border px-4 py-2 rounded-md text-sm"
        />
        <select className="border px-4 py-2 rounded-md text-sm">
          <option>Todos Status</option>
          <option>Emitido</option>
          <option>Vencido</option>
          <option>Pago</option>
        </select>
      </div>

      <div className="space-y-6">
        {boletos.map(boleto => (
          <div key={boleto.id} className="bg-white shadow rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <div className="relative p-3 rounded-xl bg-orange-50">
                  <Receipt className="w-6 h-6 text-orange-600" />
                  {boleto.statusVencimento === 'vencido' && (
                    <AlertTriangle className="w-4 h-4 text-red-500 absolute bottom-1 left-2" />
                  )}
                </div>
                <div>
                  <div className="flex gap-4">
                    <h4 className="font-semibold text-lg">{boleto.codigo}</h4>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium
                          ${boleto.status === 'emitido'
                          ? 'bg-blue-100 text-blue-700'
                          : boleto.status === 'pago'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                      {boleto.status}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${boleto.statusVencimento === 'vencido'
                          ? 'bg-red-100 text-red-700'
                          : boleto.statusVencimento === 'aberto'
                            ? 'bg-yellow-100 text-yellow-700'
                            : boleto.statusVencimento === 'fechado'
                              ? 'bg-green-100 text-green-700'
                              : ''
                        }`}
                    >
                      {boleto.statusVencimento === 'vencido'
                        ? 'Vencido'
                        : boleto.statusVencimento === 'aberto'
                          ? 'Aberto'
                          : boleto.statusVencimento === 'fechado'
                            ? 'Fechado'
                            : ''}
                    </span>
                  </div>
                  <p className="font-medium text-gray-700">{boleto.clienteNome}</p>
                  {boleto.descricao && <p className="text-sm text-gray-500">{boleto.descricao}</p>}
                  <p className="text-sm text-gray-500">Emissão: {new Date(boleto.emissao).toLocaleDateString()}</p>
                  <p className="text-sm text-red-600 font-semibold">Vencimento: {new Date(boleto.vencimento).toLocaleDateString()}</p>
                </div>

              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">
                  R$ {(boleto.valor / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                {boleto.stripeUrl && (
                  <a
                    href={boleto.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 border rounded px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Download size={16} />
                    <span>Baixar</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-4 ml-13 bg-gray-100 p-3 rounded-md flex justify-between items-center">
              <span className="text-sm text-gray-700 font-mono">
                {boleto.linhaDigitavel || "Linha digitável não disponível"}
              </span>
              <button
                className="text-gray-500 hover:text-black cursor-pointer"
                onClick={() => navigator.clipboard.writeText(boleto.linhaDigitavel || '')}
              >
                <Clipboard size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && <ModalBoleto onClose={() => setShowModal(false)} />}
    </div>
  );
}

function ResumoBox({ label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
