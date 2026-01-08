import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { DollarSign } from "lucide-react";
import { criarTransacao } from "../../services/financeiroService";
import { getClientes } from "../../services/clienteService";
import { getTodosProcessos } from "../../services/processoService";

const ModalTransacaoForm = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    tipo: "saida",
    valor: "",
    descricao: "",
    categoria: "",
    status: "Pagar",
    dataTransacao: "",
    dataVencimento: "",
    processoId: "",
    clienteId: "",
    formaPagamento: "",
  });

  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [processos, setProcessos] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [resClientes, resProcessos] = await Promise.all([
          getClientes(),
          getTodosProcessos(),
        ]);
        setClientes(resClientes || []);
        setProcessos(resProcessos || []);
      } catch (err) {
        console.error("Erro ao buscar clientes ou processos:", err);
      }
    };

    fetchData();
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "valor" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        dataTransacao: new Date(form.dataTransacao).toISOString(),
        dataVencimento: new Date(form.dataVencimento).toISOString(),
        processoId: form.processoId || null,
        clienteId: form.clienteId || null,
      };

      await criarTransacao(payload);
      alert("Transação criada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      alert("Erro ao criar transação.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center mb-6">
          <div className="border px-2 py-2 mr-4 rounded border-blue-600">
            <DollarSign className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Nova Transação</h2>
            <p className="text-gray-500">Preencha os dados financeiros</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl border-b pb-2">Informações Básicas</h2>
          <div className="flex gap-3">
            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Tipo*</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Valor*</label>
              <input
                type="number"
                name="valor"
                step="0.01"
                value={form.valor}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Descrição*</label>
            <input
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <h2 className="text-xl border-b pb-2">Categorização</h2>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Categoria</label>
              <input
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Pagar">Pagar</option>
                <option value="Pago">Pago</option>
                <option value="Receber">Receber</option>
                <option value="Recebido">Recebido</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Data Transação*</label>
              <input
                type="datetime-local"
                name="dataTransacao"
                value={form.dataTransacao}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Data Vencimento*</label>
              <input
                type="datetime-local"
                name="dataVencimento"
                value={form.dataVencimento}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <h2 className="text-xl border-b pb-2">Vinculação (opcional)</h2>

          <div className="flex gap-3">
            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Cliente</label>
              <select
                name="clienteId"
                value={form.clienteId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="text-sm font-bold text-gray-700">Processo</label>
              <select
                name="processoId"
                value={form.processoId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Selecione um processo</option>
                {processos.map((processo) => (
                  <option key={processo.id} value={processo.id}>
                    {processo.numero || `Processo #${processo.numero}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Forma de Pagamento</label>
            <input
              name="formaPagamento"
              value={form.formaPagamento}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Salvando..." : "Salvar Transação"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTransacaoForm;
