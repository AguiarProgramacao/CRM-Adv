import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getProcessoById,
  getTarefasByProcesso,
  createTarefa,
  getAnotacoesByProcesso,
  createAnotacao,
  getArquivosByProcesso
} from '../services/processoService';
import { atualizarProcesso } from '../services/processoService';
import { ArrowLeft, Edit } from 'lucide-react';
import ModalTarefaForm from "../components/modal/ModalTarefaForm";
import ModalProcessoForm from '../components/modal/ModalProcessoForm';
import ModalAnotacaoForm from '../components/modal/ModalAnotacaoForm';
import { useToast } from '../context/ToastContext';
import ProcessoAnotacoes from '../components/processos/ProcessoAnotacoes';
import ProcessoTarefas from "../components/processos/ProcessoTarefas"
import ProcessoInfo from '../components/processos/ProcessoInfo';

export default function DetalhesProcessoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [processo, setProcesso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModalTarefa, setShowModalTarefa] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [anotacoes, setAnotacoes] = useState([]);
  const [showModalAnotacao, setShowModalAnotacao] = useState(false);
  const [arquivos, setArquivos] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchDados() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const [processoData, tarefasData, anotacoesData, arquivosData] = await Promise.all([
          getProcessoById(id).catch(err => {
            console.error('Erro ao buscar processo:', err);
            return null;
          }),
          getTarefasByProcesso(id).catch(err => {
            console.error('Erro ao buscar tarefas:', err);
            return [];
          }),
          getAnotacoesByProcesso(id).catch(err => {
            console.error('Erro ao buscar anotações:', err);
            return [];
          }),
          getArquivosByProcesso(id).catch(err => {
            console.error('Erro ao buscar arquivos:', err);
            return [];
          }),
        ]);

        setProcesso(processoData);

        setTarefas(Array.isArray(tarefasData) ? tarefasData :
          (tarefasData?.data && Array.isArray(tarefasData.data)) ? tarefasData.data : []);

        setAnotacoes(Array.isArray(anotacoesData) ? anotacoesData :
          (anotacoesData?.data && Array.isArray(anotacoesData.data)) ? anotacoesData.data : []);

        setArquivos(Array.isArray(arquivosData) ? arquivosData :
          (arquivosData?.data && Array.isArray(arquivosData.data)) ? arquivosData.data : []);

      } catch (error) {
        console.error('Erro geral ao buscar dados:', error);
        showToast && showToast("Erro ao carregar dados do processo", "error");
      } finally {
        console.log('Finalizando loading...');
        setLoading(false);
      }
    }

    fetchDados();
  }, [id]);

  const handleCriarTarefa = async (novaTarefa) => {
    try {
      await createTarefa(processo.id, novaTarefa);

      const tarefasAtualizadas = await getTarefasByProcesso(processo.id);
      console.log('Tarefas atualizadas após criação:', tarefasAtualizadas);

      setTarefas(Array.isArray(tarefasAtualizadas) ? tarefasAtualizadas :
        (tarefasAtualizadas?.data && Array.isArray(tarefasAtualizadas.data)) ? tarefasAtualizadas.data : []);

      setShowModalTarefa(false);
      showToast("Tarefa criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      showToast("Erro ao criar tarefa", "error");
    }
  };

  const handleCriarAnotacao = async (novaAnotacao) => {
    try {
      await createAnotacao(processo.id, novaAnotacao);

      const anotacoesAtualizadas = await getAnotacoesByProcesso(processo.id);
      console.log('Anotações atualizadas após criação:', anotacoesAtualizadas);

      setAnotacoes(Array.isArray(anotacoesAtualizadas) ? anotacoesAtualizadas :
        (anotacoesAtualizadas?.data && Array.isArray(anotacoesAtualizadas.data)) ? anotacoesAtualizadas.data : []);

      setShowModalAnotacao(false);
      showToast("Anotação criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar anotação:", error);
      showToast("Erro ao criar anotação", "error");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Carregando...
      </div>
    );
  }

  if (!processo) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-center text-gray-500">Processo não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div className='flex justify-center items-center'>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center mb-2 border border-gray-200 rounded p-2 bg-white mt-2 cursor-pointer hover:bg-gray-300 transition"
          >
            <ArrowLeft />
          </button>
          <div className='ml-5'>
            <h2 className="text-2xl font-bold text-gray-900">{processo.numero}</h2>
            <p className="text-gray-500">Detalhes do processo • {processo.cliente?.nome}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModalEditar(true)}
            className="bg-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-200 transition"
          >
            <Edit />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProcessoInfo
          processo={processo}
          arquivos={arquivos}
        />

        <div className="space-y-4">
          <ProcessoTarefas tarefas={tarefas} onNova={() => setShowModalTarefa(true)} />
          <ProcessoAnotacoes anotacoes={anotacoes} onNova={() => setShowModalAnotacao(true)} />
        </div>
      </div>

      {showModalTarefa && (
        <ModalTarefaForm
          isOpen={showModalTarefa}
          onClose={() => setShowModalTarefa(false)}
          onCreate={handleCriarTarefa}
          processoFixoId={processo.id}
        />
      )}

      {showModalEditar && (
        <ModalProcessoForm
          isOpen={showModalEditar}
          onClose={() => setShowModalEditar(false)}
          processo={processo}
          onSubmit={async (dadosAtualizados) => {
            try {
              const atualizado = await atualizarProcesso(processo.id, dadosAtualizados);
              setProcesso(atualizado.data || atualizado);
              setShowModalEditar(false);
              showToast("Processo atualizado com sucesso");
            } catch (error) {
              console.error("Erro ao atualizar processo:", error);
              showToast("Erro ao atualizar processo", "error");
            }
          }}
        />
      )}

      {showModalAnotacao && (
        <ModalAnotacaoForm
          isOpen={showModalAnotacao}
          onClose={() => setShowModalAnotacao(false)}
          onCreate={handleCriarAnotacao}
        />
      )}
    </div>
  );
}