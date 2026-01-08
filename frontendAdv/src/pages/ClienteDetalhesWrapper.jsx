import React, { useEffect, useState } from "react";
import { deleteCliente, updateCliente, getClienteById } from "../services/clienteService";
import { criarProcesso } from "../services/processoService";
import { Mail, Phone, MapPin, Calendar, ArrowLeft, Edit } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import ModalProcessoForm from "../components/modal/ModalProcessoForm";
import ModalClienteForm from "../components/modal/ModalClienteForm";
import ModalAgendamentoForm from '../components/modal/ModalAgendamentoForm';
import Button from "../components/ui/Button";

export default function DetalhesClientePage() {
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [showModalProcesso, setShowModalProcesso] = useState(false);
  const [cliente, setCliente] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAgendamentoForm, setShowAgendamentoForm] = useState(false);
  const clienteId = location.state?.cliente?.id;

  useEffect(() => {
    if (!clienteId) return;

    const fetchCliente = async () => {
      try {
        const response = await getClienteById(clienteId);
        setCliente(response);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };

    fetchCliente();
  }, [clienteId]);

  const formatarData = (data) => new Date(data).toLocaleString("pt-BR");

  const handleCreateProcesso = async (dados) => {
    try {
      const response = await criarProcesso(dados);
      if (response?.id) {
        alert("Processo criado com sucesso!");
        setShowModalProcesso(false);

        const updated = await getClienteById(clienteId);
        setCliente(updated);
      } else {
        alert("Erro: Processo nao foi criado.");
      }
    } catch (error) {
      alert("Erro ao criar processo.");
    }
  };

  if (!cliente) {
    return <div className="p-6">Carregando dados do cliente...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-start mb-6">
        <div className='flex justify-center items-center'>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-2 border border-gray-200 rounded p-2 bg-white mt-2 cursor-pointer hover:border-gray-600"
          >
            <ArrowLeft />
          </button>
          <div className='ml-5'>
            <h2 className="text-2xl font-bold text-gray-900">{cliente.nome}</h2>
            <p className="text-gray-500">Detalhes do cliente e processos associados</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModalCliente(true)}
            className="bg-white border border-gray-300 rounded px-4 py-2 flex items-center cursor-pointer"
          >
            <Edit size={18} className="mr-2" /> Editar Cliente
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/3 bg-white rounded-lg p-6 shadow relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              {cliente.nome?.charAt(0)?.toUpperCase() || "C"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{cliente.nome}</h2>
              <p className="text-sm text-gray-500">{cliente.documento}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{cliente.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{cliente.telefone}</span>
            </div>
            <div className="flex gap-2">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <p>{cliente.rua}, {cliente.numero} {cliente.complemento} - {cliente.bairro}, {cliente.cidade} - {cliente.estado}.</p>
            </div>
            {cliente.data_nascimento && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Nascimento: {formatarData(cliente.data_nascimento).split(",")[0]}</span>
              </div>
            )}
          </div>

          {cliente.observacoes && (
            <div className="mt-4 border-t pt-4">
              <h4 className="font-medium mb-1">Observacoes</h4>
              <p className="text-sm text-gray-600">{cliente.observacoes}</p>
            </div>
          )}

          {cliente.atendimentos?.length > 0 ? (
            cliente.atendimentos.map((a) => (
              <div key={a.id} className="mt-4 border-t pt-4">
                <h4 className="font-medium mb-1">Atendimento</h4>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">
                    {a.descricao}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-4 border-t pt-4">
              <h4 className="font-medium mb-1">Atendimento</h4>
              <p className="text-sm text-gray-600">Nenhum atendimento vinculado a este cliente</p>
            </div>
          )}

          <button
            onClick={async () => {
              if (confirm("Deseja mesmo excluir este cliente?")) {
                await deleteCliente(cliente.id);
                alert("Cliente excluido.");
                navigate("/clientes");
              }
            }}
            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
          <div className="flex mt-5 justify-between">
            <Button onClick={() => setShowAgendamentoForm(true)} className="bg-green-600 hover:bg-green-700 text-white">
              Agendar Reuniao
            </Button>
            <button className="bg-green-500 px-4 py-2 rounded-md">
              Enviar Mensagem
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-lg p-6 h-full shadow">
            <div className="flex justify-between mb-2 items-center">
              <h3 className="text-lg font-semibold">Processos ({cliente.processo?.length || 0})</h3>
              <button
                onClick={() => setShowModalProcesso(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
              >
                + Novo Processo
              </button>
            </div>
            {cliente.processo?.length > 0 ? (
              cliente.processo.map((p) => (
                <div key={p.id} className="bg-purple-100 border border-purple-200 rounded-lg p-4 mb-3 relative mt-8">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-bold text-gray-950">
                      {p.numero}
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {p.andamento}
                    </span>
                  </div>
                  <p className="text-sm text-gray-950 mb-3 mt-2">
                    {p.areaJuridica} - {p.usuario?.nome || "Responsavel"}
                  </p>
                  <p className="text-sm text-gray-950"><strong>Autor:</strong> {p.autor}</p>
                  <p className="text-sm mb-3 text-gray-950"><strong>Reu:</strong> {p.reu}</p>
                  <p className="text-sm mb-1 text-gray-500">{p.descricao}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Criado em: {formatarData(p.criadoEm).split(",")[0]}</span>
                    <span>Valor da causa: R$ {p.valor?.toLocaleString("pt-BR") || "0,00"}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">Nenhum processo vinculado ao cliente.</p>
            )}
          </div>
        </div>
      </div>

      {showModalProcesso && (
        <ModalProcessoForm
          isOpen={showModalProcesso}
          onClose={() => setShowModalProcesso(false)}
          cliente={cliente}
          onSubmit={handleCreateProcesso}
        />
      )}

      {showModalCliente && (
        <ModalClienteForm
          isOpen={showModalCliente}
          onClose={() => setShowModalCliente(false)}
          cliente={cliente}
          onSubmit={async (dadosAtualizados) => {
            try {
              await updateCliente(cliente.id, dadosAtualizados);
              alert("Cliente atualizado com sucesso!");
              setShowModalCliente(false);
              navigate(0);
            } catch (error) {
              alert("Erro ao atualizar cliente.");
            }
          }}
        />
      )}

      {showAgendamentoForm && (
        <ModalAgendamentoForm
          isOpen={showAgendamentoForm}
          onClose={() => setShowAgendamentoForm(false)}
          cliente={cliente}
          onCreate={() => {
            setShowAgendamentoForm(false);
          }}
        />
      )}
    </div>
  );
}
