import { useEffect, useState } from "react";
import { Calendar, Save } from 'lucide-react';
import { criarAgendamento, getClientes } from "../../services/clienteService";

const ModalAgendamentoForm = ({ isOpen, onClose, cliente }) => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    dataHoraInicio: "",
    tipo: "REUNIAO",
    clienteId: cliente?.id || "",
  });

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const inicio = new Date(form.dataHoraInicio);
      const fim = new Date(inicio.getTime() + 60 * 60 * 1000);

      const clienteSelecionado = clientes.find((c) => c.id === parseInt(form.clienteId));

      const dados = {
        titulo: form.titulo,
        descricao: form.descricao,
        tipo: form.tipo,
        dataHoraInicio: inicio.toISOString(),
        dataHoraFim: fim.toISOString(),
        nome: clienteSelecionado?.nome || cliente?.nome,
        email: clienteSelecionado?.email || cliente?.email,
        telefone: clienteSelecionado?.telefone || cliente?.telefone,
      };

      await criarAgendamento(dados);

      alert("Agendamento criado com sucesso!");
      setForm({ titulo: "", descricao: "", dataHoraInicio: "", tipo: "REUNIAO", clienteId: "" });
      onClose();
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      alert("Erro ao criar agendamento.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
        <div className="flex items-center mb-6">
          <div className="border px-2 py-2 mr-4 rounded border-green-700">
            <Calendar className="text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              Agendar Reunião
            </h2>
            {(cliente || form.clienteId) && (
              <p className="text-gray-500">
                Cliente: {cliente?.nome || clientes.find(c => c.id === parseInt(form.clienteId))?.nome}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-bold text-gray-700">Título do Agendamento*</label>
            <input
              className="w-full border border-gray-400 rounded px-3 py-2"
              placeholder="Ex: Reunião Inicial"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-bold text-gray-700">Selecionar Cliente*</label>
            <select
              name="clienteId"
              value={form.clienteId}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded px-3 py-2"
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold text-gray-700">Descrição do Agendamento</label>
            <textarea
              className="w-full border border-gray-400 rounded px-3 py-2 resize-none"
              placeholder="Descrição do agendamento"
              name="descricao"
              rows={3}
              value={form.descricao}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-bold text-gray-700">Data de Início*</label>
            <input
              type="datetime-local"
              name="dataHoraInicio"
              value={form.dataHoraInicio}
              onChange={handleChange}
              required
              className="w-full border border-gray-400 rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button onClick={onClose} type="button" className="bg-white hover:border-gray-600 border border-gray-300 px-5 py-2 rounded cursor-pointer">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center cursor-pointer px-5 py-2 rounded">
              <Save size={18} className="mt-0.5 mr-4" /> {loading ? "Salvando..." : "Marcar Agendamento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgendamentoForm;
