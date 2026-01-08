import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getTodosProcessos,
  deletarProcesso,
  criarProcesso
} from '../services/processoService';
import { FaTrash } from 'react-icons/fa';
import { User, FileText, Plus, DollarSign, Calendar } from "lucide-react"
import ModalProcessoForm from "../components/modal/ModalProcessoForm";

export default function Processos() {
  const navigate = useNavigate();
  const [processos, setProcessos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [selectedProcesso, setSelectedProcesso] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    carregarProcessos();
  }, []);

  const carregarProcessos = () => {
    getTodosProcessos()
      .then(data => {
        setProcessos(Array.isArray(data) ? data : []);
      })
      .catch(() => alert('Erro ao carregar processos'));
  };

  const handleDelete = (id) => {
    deletarProcesso(id)
      .then(() => {
        alert('Deletado');
        carregarProcessos();
      })
      .catch(() => alert('Erro ao deletar'));
  };

  const handleCreate = async (dados) => {
    try {
      await criarProcesso(dados);
      alert('Processo criado!');
      setShowModal(false);
      carregarProcessos();
    } catch {
      alert('Erro ao criar processo');
    }
  };

  const irParaDetalhes = (id) => {
    navigate(`/processos/${id}`);
  };

  const processosFiltrados = (processos || []).filter(p => {
    const termo = filtro.toLowerCase();
    return (
      p.numero?.toLowerCase().includes(termo) ||
      p.cliente?.nome?.toLowerCase().includes(termo) ||
      p.autor?.toLowerCase().includes(termo) ||
      p.reu?.toLowerCase().includes(termo) ||
      p.responsavel?.nome?.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="p-6">
      <div className='flex justify-between'>
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FileText size={34} className='text-purple-500 mr-2' /> Gestão de Processos
          </h1>
          <p className="text-gray-500 mb-6">Acompanhe todos os processos jurídicos em andamento</p>
        </div>
        <button
          className="bg-blue-600 text-white rounded px-8 h-10 flex items-center"
          onClick={() => setShowModal(true)}
        >
          <Plus className='mr-2' /> Novo Processo
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10 bg-white p-5 rounded shadow w0full">
        <input
          type="text"
          placeholder="Buscar por número, cliente ou responsável..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="p-2 rounded w-full bg-gray-100"
        />
        <select className="border p-2 rounded">
          <option>Todos Status</option>
          <option>Ativo</option>
          <option>Encerrado</option>
        </select>
        <select className="border p-2 rounded">
          <option>Todas Áreas</option>
          <option>Civil</option>
          <option>Trabalhista</option>
        </select>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {processosFiltrados.map(proc => (
          <button
            key={proc.id}
            onClick={() => irParaDetalhes(proc.id)}
            className="bg-white rounded-lg py-4 px-5 shadow-md hover:shadow-xl transition text-left relative w-full cursor-pointer"
          >
            <div className="items-center mb-2">
              <div className='flex justify-between items-center'>
                <h2 className="font-semibold text-lg hover:text-blue-600 transition">
                  {proc.numero}
                </h2>
                <span className={`text-xs rounded-full px-2 py-1 ${proc.andamento === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {proc.andamento}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500 mb-1">{proc.cliente?.nome}</p>
                <span className={`text-xs rounded-full px-2 py-1 ${proc.areaJuridica === 'civil' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {proc.areaJuridica}
                </span>
              </div>

            </div>
            <p className="text-sm flex mb-2"><User size={16} /> <strong>Responsável:</strong> {proc.responsavel?.nome || 'Não definido'}</p>
            <p className="text-sm"><strong>Autor:</strong> {proc.autor}</p>
            <p className="text-sm mb-3"><strong>Réu:</strong> {proc.reu}</p>
            <p className="text-sm mb-1 flex"><DollarSign size={15} className='mt-0.5 text-gray-500 mr-1.5' /> R$ {proc.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p className="text-sm mb-2 flex"><Calendar size={16} className='text-gray-500 mr-1' /> Criado em {new Date(proc.criadoEm).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">{proc.descricao}</p>

            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                className="text-red-600 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(proc.id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </button>
        ))}
      </div>

      <ModalProcessoForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        processo={null}
      />
    </div>
  );
}
