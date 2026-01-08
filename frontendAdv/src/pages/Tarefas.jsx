import React, { useState, useEffect } from "react";
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  CheckSquare,
  Search,
  Plus,
  Calendar,
  User,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import ModalTarefaForm from "../components/modal/ModalTarefaForm";
import { createTarefa, getAllTarefas, getTodosProcessos, updateTarefa } from "../services/processoService";
import { Input } from "../components/ui/input";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [processos, setProcessos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [prioridadeFilter, setPrioridadeFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTarefa, setEditingTarefa] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTarefas = async () => {
    try {
      const response = await getAllTarefas();
      setTarefas(response);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      setTarefas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProcessos = async () => {
      try {
        const res = await getTodosProcessos();
        setProcessos(res);
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    fetchTarefas();
    fetchProcessos();
  }, []);

  const filteredTarefas = tarefas.filter(tarefa => {
    const matchesSearch =
      tarefa.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarefa.responsavel?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarefa.processo?.cliente?.nome?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || tarefa.status === statusFilter;
    const matchesPrioridade = prioridadeFilter === "all" || tarefa.prioridade === prioridadeFilter;

    return matchesSearch && matchesStatus && matchesPrioridade;
  });

  const statusColors = {
    pendente: "bg-yellow-100 text-yellow-800",
    em_andamento: "bg-blue-100 text-blue-800",
    concluida: "bg-green-100 text-green-800",
    cancelada: "bg-gray-100 text-gray-800"
  };

  const prioridadeColors = {
    baixa: "bg-green-100 text-green-800",
    media: "bg-yellow-100 text-yellow-800",
    alta: "bg-orange-100 text-orange-800",
    urgente: "bg-red-100 text-red-800"
  };

  const tipoColors = {
    audiencia: "bg-purple-100 text-purple-800",
    prazo: "bg-red-100 text-red-800",
    peticionamento: "bg-blue-100 text-blue-800",
    reuniao: "bg-green-100 text-green-800",
    documento: "bg-orange-100 text-orange-800",
    acompanhamento: "bg-gray-100 text-gray-800"
  };

  return (
    <div className="p-3 space-y-6" style={{ backgroundColor: "var(--bg-primary)", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
              <CheckSquare className="w-8 h-8 text-orange-600" />
              Gestão de Tarefas
            </h1>
            <p className="text-lg mt-1" style={{ color: "var(--text-secondary)" }}>
              Organize e acompanhe todas as atividades jurídicas
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="gradient-bg hover:opacity-90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Tarefa
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-4 bg-white h-20 rounded-md shadow px-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar por título, responsável ou cliente..."
              className="pl-10 pr-4 py-2 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card className="card-shadow border-0 mb-6">
          <CardContent className="p-4">
            {isLoading ? (
              <p>Carregando tarefas...</p>
            ) : filteredTarefas.length === 0 ? (
              <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredTarefas.map((tarefa) => (
                  <Card key={tarefa.id} className="shadow-sm hover:shadow-lg transition-shadow px-5">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-semibold flex items-center gap-2 mb-2">
                            {tarefa.titulo}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mb-2">
                            {tarefa.processo?.cliente?.nome} • {tarefa.processo?.numero}
                          </p>
                        </div>

                        <select
                          className="text-sm border border-gray-200 rounded px-1 py-1 text-gray-700 cursor-pointer"
                          value={tarefa.status}
                          onChange={async (e) => {
                            const novoStatus = e.target.value;
                            try {
                              await updateTarefa(tarefa.id, { status: novoStatus });
                              await fetchTarefas();
                            } catch (err) {
                              console.error('Erro ao atualizar status:', err);
                            }
                          }}
                        >
                          <option value="pendente">Pendente</option>
                          <option value="em_andamento">Em andamento</option>
                          <option value="concluida">Concluída</option>
                          <option value="cancelada">Cancelada</option>
                        </select>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-2 mt-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={statusColors[tarefa.status] || "bg-gray-100 text-gray-800"}>
                          {tarefa.status}
                        </Badge>
                        <Badge className={prioridadeColors[tarefa.prioridade] || "bg-gray-100 text-gray-800"}>
                          {tarefa.prioridade}
                        </Badge>
                        <Badge className={tipoColors[tarefa.tipo] || "bg-gray-100 text-gray-800"}>
                          {tarefa.tipo}
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{tarefa.descricao || "Sem descrição."}</p>

                      <p className="text-sm flex items-center gap-1 text-gray-700">
                        <User className="w-4 h-4" />
                        {tarefa.responsavel?.nome || "Sem responsável"}
                      </p>

                      <p className={`text-sm flex items-center gap-1 font-medium ${tarefa.dataVencimento ? 'text-red-600' : 'text-gray-400'}`}>
                        <Calendar className="w-4 h-4" />
                        {tarefa.dataVencimento
                          ? `Vence: ${format(new Date(tarefa.dataVencimento), "dd/MM/yyyy")}`
                          : "Sem vencimento"}
                      </p>

                      <p className="text-sm flex items-center gap-1 text-gray-600">
                        <FileText className="w-4 h-4" />
                        {tarefa.processo?.numero || "Sem processo"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Form Modal */}
        {showForm && (
          <ModalTarefaForm
            isOpen={showForm}
            onClose={() => {
              setShowForm(false);
              setEditingTarefa(null);
            }}
            tarefa={editingTarefa}
            processos={processos}
            usuarios={[]}
            onCreate={(dados) => {createTarefa(null, dados) }}
            processoFixoId={null}
          />
        )}
      </div>
    </div>
  );
}
