import { useEffect, useState } from 'react';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Edit, FileText, Search, Trash, UserPlus, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { getClientes, createCliente, deleteCliente, updateCliente, updateLead } from '../services/clienteService';
import ClienteCard from "../components/clientes/ClienteCard";
import ModalClienteForm from '../components/modal/ModalClienteForm';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import ModalEditarEtapas from "../components/modal/ModalEditarEtapas";
import { useNavigate } from 'react-router-dom';
import { getEtapas } from "../services/etapasService";
import { useToast } from '../context/ToastContext';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [viewMode, setViewMode] = useState("kanban");
  const [etapas, setEtapas] = useState([]);
  const [showEtapasModal, setShowEtapasModal] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const fetchEtapas = async () => {
    try {
      const res = await getEtapas();
      setEtapas(res.data);
    } catch (err) {
      console.error("Erro ao buscar etapas:", err);
    }
  };

  useEffect(() => {
    fetchClientes();
    fetchEtapas();
  }, []);

  const handleCreate = async (formData) => {
    try {
      let cliente;
      if (formData.id) {
        await updateCliente(formData.id, formData);
      } else {
        const res = await createCliente(formData);
        cliente = res;

        const etapaInicial = etapas.find(e => e.nome === "Contato Inicial");
        if (etapaInicial) {
          await updateLead(cliente.id, etapaInicial.id);
        }
      }
      await fetchClientes();
      setShowForm(false);
      setEditingCliente(null);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      fetchClientes();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  const clientesFiltrados = (clientes || []).filter((c) =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.documento?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const coresEtapas = ["blue", "green", "yellow", "orange", "purple"];

  const clientesPorEtapa = (etapas || []).reduce((acc, etapaObj) => {
    acc[etapaObj.nome] = clientesFiltrados.filter(
      (c) => c.leads?.[0]?.etapa?.nome === etapaObj.nome
    );
    return acc;
  }, {});

  const handleDragEnd = async (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const clienteId = parseInt(draggableId);
    const novaEtapaNome = destination.droppableId;
    const novaEtapa = etapas.find((e) => e.nome === novaEtapaNome);
    if (novaEtapa) {
      await updateLead(clienteId, novaEtapa.id);
      await fetchClientes();
    }
  };

  const abrirDetalhes = (cliente) => {
    navigate("/detalhes-cliente", { state: { cliente } });
  };

  return (
    <div className="p-6 mt-6 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold flex items-center gap-2">
          <Users className="w-8 h-8 text-blue-600" /> Gestão de Clientes
        </h2>
        <Button onClick={() => setShowForm(true)} className="gradient-bg hover:opacity-90">
          <UserPlus className="w-5 h-5 mr-2" /> Adicionar Cliente
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full w-fit mb-4">
        {["kanban", "gallery", "list"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${viewMode === mode
              ? "bg-white shadow text-blue-600"
              : "text-gray-500 hover:text-blue-600"
              }`}
          >
            {mode[0].toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      <Card className="card-shadow border-0 mb-6">
        <CardContent className="p-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Buscar por nome ou documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 bg-gray-50 focus:bg-white"
            />
          </div>
        </CardContent>
      </Card>

      {clientesFiltrados.length === 0 ? (
        <p className="text-gray-500">Nenhum cliente encontrado.</p>
      ) : viewMode === "gallery" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {clientesFiltrados.map((c) => (
            <ClienteCard key={c.id} cliente={c} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
        </div>
      ) : viewMode === "list" ? (
        <table className="w-full text-left border rounded overflow-hidden shadow-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Documento</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.nome}</td>
                <td className="p-3">{c.documento}</td>
                <td className="p-3">{c.telefone}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3 space-x-2 flex">
                  <Button onClick={() => abrirDetalhes(c)} size="sm"><FileText size={18} /></Button>
                  <Button onClick={() => handleDelete(c.id)} size="sm" variant="danger"><Trash size={16} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Pipeline de Leads</h3>
            <Button onClick={() => setShowEtapasModal(true)} className="bg-gray-200 flex items-center hover:bg-gray-300 text-sm">
              <Edit size={18} className='mr-3' /> Editar Etapas
            </Button>
          </div>
          <div className="flex gap-6 overflow-x-auto">
            {etapas.map((etapaObj, index) => {
              const etapa = etapaObj.nome;
              const cor = coresEtapas[index % coresEtapas.length];

              return (
                <Droppable droppableId={etapa} key={etapaObj.id}>
                  {(provided) => (
                    <div
                      className={`min-w-[300px] rounded-lg shadow p-4 border-t-4 border-${cor}-500 bg-white`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h3 className={`text-${cor}-600 font-bold mb-4`}>{etapa}</h3>
                      {(clientesPorEtapa[etapa] || []).map((c, i) => (
                        <Draggable key={c.id.toString()} draggableId={c.id.toString()} index={i}>
                          {(provided) => (
                            <div
                              role="button"
                              tabIndex={0}
                              className="bg-white rounded p-3 mb-3 shadow-sm w-full text-start cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => abrirDetalhes(c)}
                            >
                              <p className="text-sm text-gray-500">Etapa: {c.leads?.[0]?.etapa?.nome || 'N/A'}</p>
                              <p className="font-semibold text-gray-800">{c.nome}</p>
                              <p className="text-sm text-gray-500">{c.documento}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </DragDropContext>
      )}

      {showForm && (
        <ModalClienteForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
          cliente={editingCliente}
        />
      )}

      {showEtapasModal && (
        <ModalEditarEtapas
          isOpen={showEtapasModal}
          onClose={() => setShowEtapasModal(false)}
          etapas={etapas}
          setEtapas={setEtapas}
        />
      )}
    </div>
  );
}
