import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { CheckSquare, Save } from "lucide-react";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from "../ui/textarea"
import { getUsuarios } from '../../services/usuarioService';
import { getTodosProcessos } from '../../services/processoService';
import { useToast } from "../../context/ToastContext";

const prioridades = [
  { label: "Baixa", value: "baixa" },
  { label: "Média", value: "media" },
  { label: "Alta", value: "alta" },
  { label: "Urgente", value: "urgente" }
];

const statusTarefa = [
  { label: "Pendente", value: "pendente" },
  { label: "Em andamento", value: "em_andamento" },
  { label: "Concluída", value: "concluida" },
  { label: "Cancelada", value: "cancelada" }
];

const tiposTarefa = [
  { label: "Acompanhamento", value: "acompanhamento" },
  { label: "Audiência", value: "audiencia" },
  { label: "Documento", value: "documento" },
  { label: "Peticionamento", value: "peticionamento" },
  { label: "Prazo", value: "prazo" },
  { label: "Reunião", value: "reunião" }
];

const ModalTarefaForm = ({ isOpen, onClose, onCreate, tarefa, processoFixoId = null }) => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    status: "pendente",
    responsavelId: "",
    processoId: "",
    dataVencimento: "",
    tipo: "",
    prioridade: "media",
    observacoes: ""
  });
  const [usuarios, setUsuarios] = useState([]);
  const [processos, setProcessos] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (tarefa) {
      setForm({
        id: tarefa.id,
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        status: tarefa.status,
        responsavelId: tarefa.responsavelId || "",
        processoId: processoFixoId ?? tarefa.processoId ?? "",
        dataVencimento: tarefa.dataVencimento || "",
        tipo: tarefa.tipo || "documento",
        prioridade: tarefa.prioridade || "media",
        observacoes: tarefa.observacoes || ""
      });
    } else {
      setForm({
        titulo: "",
        descricao: "",
        status: "pendente",
        responsavelId: "",
        processoId: "",
        dataVencimento: "",
        tipo: "",
        prioridade: "media",
        observacoes: ""
      });
    }
  }, [tarefa]);

  useEffect(() => {
    if (isOpen) {
      getUsuarios()
        .then(setUsuarios)
        .catch(() => alert('Erro ao carregar usuários'));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      getTodosProcessos().then(setProcessos).catch(() => alert('Erro ao carregar processos'));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, documentos: files });
      setForm({ ...form, [e.target.name]: e.target.value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreate({
        ...form,
        responsavelId: form.responsavelId ? Number(form.responsavelId) : null,
        processoId: form.processoId ? Number(form.processoId) : null
      });
      onClose();
      showToast("Tarefa Criada com Sucesso");
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
      showToast("Erro ao criar a terefa", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 flex items-center gap-2">
          <CheckSquare className="text-orange-500" /> {tarefa ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl border-b border-gray-200 font-medium pb-2">Informações Básicas</h2>
          <div className="items-center">
            <Label>Título da Tarefa*</Label>
            <Input
              className="w-full focus:outline-none"
              placeholder="Título da tarefa"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
            />
          </div>

          <div className="items-start">
            <Label>Descrição*</Label>
            <Textarea
              className="w-full focus:outline-none resize-none"
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              rows={3}
              required
            />
          </div>

          <h2 className="text-xl border-b border-gray-200 font-medium pb-2">Vinculação</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="processoId">Processo</Label>
              <select
                name="processoId"
                id="processoId"
                value={form.processoId}
                onChange={handleChange}
                disabled={!!processoFixoId}
                className="input w-full"
                required
              >
                <option value="Null">Selecione um processo</option>
                {processos.map((proc) => (
                  <option key={proc.id} value={proc.id}>
                    {proc.numero} - {proc.cliente?.nome}
                  </option>
                ))}
              </select>

              {/* Exibe nome do processo fixo (se houver) */}
              {processoFixoId && (
                <p className="text-sm text-gray-500 mt-1">
                  Processo fixo: {
                    processos.find(p => p.id === processoFixoId)?.numero
                  } — {
                    processos.find(p => p.id === processoFixoId)?.cliente?.nome
                  }
                </p>
              )}
            </div>
            <div>
              <Label>Responsável</Label>
              <select
                id="responsavelId"
                name="responsavelId"
                value={form.responsavelId}
                onChange={handleChange}
                required
                className="border border-gray-200 p-2 rounded-md w-full"
              >
                <option value="">Nome do advogado responsável</option>
                {usuarios.map(user => (
                  <option key={user.id} value={user.id}>{user.nome}</option>
                ))}
              </select>
            </div>
          </div>

          <h2 className="text-xl border-b border-gray-200 font-medium pb-2">Configurações</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Data de Vencimento</Label>
              <Input
                type="date"
                value={form.dataVencimento}
                onChange={(e) => setForm({ ...form, dataVencimento: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Tipo da Tarefa</Label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                {tiposTarefa.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Prioridade</Label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2"
                value={form.prioridade}
                onChange={(e) => setForm({ ...form, prioridade: e.target.value })}
              >
                {prioridades.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Status</Label>
              <select
                className="w-full border border-gray-200 rounded px-3 py-2"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {statusTarefa.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label>Observações Adicionais</Label>
            <Textarea
              rows={2}
              placeholder="Informações extras sobre a tarefa..."
              value={form.observacoes}
              onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4">
            <button onClick={onClose} type="button" className="bg-white hover:bg-gray-600 border border-gray-200 rounded px-6">
              Cancelar
            </button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
              <Save size={18} className="text-white-200 mt-0.5 mr-2" />Salvar Tarefa
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTarefaForm;
