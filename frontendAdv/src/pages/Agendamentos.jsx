import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarCheck } from 'lucide-react';
import { getTodosAgendamentos, verificarConexaoGoogle } from '../services/clienteService';
import ModalAgendamentoForm from '../components/modal/ModalAgendamentoForm';

const AgendamentosPage = () => {
  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [conectado, setConectado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    carregarAgendamentos();
    checarConexaoGoogle();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      const res = await getTodosAgendamentos();
      const cores = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

      const eventosFormatados = res.map((a, i) => ({
        id: a.id,
        title: a.titulo || `Agendamento #${a.id}`,
        start: a.dataHoraInicio,
        end: a.dataHoraFim,
        description: a.descricao || '',
        clienteNome: a.nome || 'Não informado',
        backgroundColor: cores[i % cores.length],
        borderColor: cores[i % cores.length],
        textColor: '#fff',
      }));

      setEventos(eventosFormatados);
    } catch {
      alert('Erro ao carregar agendamentos');
    }
  };

  const checarConexaoGoogle = async () => {
    const res = await verificarConexaoGoogle();
    setConectado(Boolean(res?.conectado));
  };

  const handleEventClick = (info) => {
    setEventoSelecionado({
      titulo: info.event.title,
      descricao: info.event.extendedProps.description,
      clienteNome: info.event.extendedProps.clienteNome,
      inicio: info.event.start,
    });
  };

  const fecharModal = () => setEventoSelecionado(null);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CalendarCheck className="text-green-600" size={28} />
            Agenda de Reuniões
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Visualize e gerencie seus compromissos
          </p>
          <span
            className={`text-xs px-2 py-1 rounded ${conectado
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {conectado
              ? "Google Calendar conectado"
              : "Google Calendar não conectado"}
          </span>
        </div>

        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
        >
          + Novo Agendamento
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 border border-gray-100">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          locale="pt-br"
          events={eventos}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>

      {eventoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {eventoSelecionado.titulo}
            </h2>
            <div className="text-sm space-y-2 text-gray-700">
              <p>
                <strong>Cliente:</strong> {eventoSelecionado.clienteNome}
              </p>
              <p>
                <strong>Início:</strong>{' '}
                {new Date(eventoSelecionado.inicio).toLocaleString('pt-BR')}
              </p>
              <p>
                <strong>Descrição:</strong>{' '}
                {eventoSelecionado.descricao || 'Sem descrição.'}
              </p>
            </div>
            <button
              onClick={fecharModal}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {mostrarModal && (
        <ModalAgendamentoForm
          isOpen={mostrarModal}
          onClose={() => {
            setMostrarModal(false);
            carregarAgendamentos();
          }}
          cliente={null}
        />
      )}
    </div>
  );
};

export default AgendamentosPage;
