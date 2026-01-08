import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  FileText,
  CalendarDays,
  DollarSign,
  CheckSquare,
  Scale,
  MessageCircle,
  Cog
} from "lucide-react";
import { getAllTarefas, getTodosProcessos } from '../../services/processoService';
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [tarefas, setTarefas] = useState([]);
  const [processos, setProcessos] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleConfig = () => {
    navigate("/configuracao");
  }

  let user = null;
  try {
    const userRaw = localStorage.getItem('user');
    if (userRaw && userRaw !== 'undefined') {
      user = JSON.parse(userRaw);
    }
  } catch (e) {
    console.error("Erro ao fazer parse do user:", e);
  }

  const nome = user?.empresa || "Usuário";
  const email = user?.email || "email@exemplo.com";

  const navLinks = [
    { to: "/", label: "Dashboard", icon: <BarChart3 size={18} /> },
    { to: "/cliente", label: "Clientes", icon: <Users size={18} /> },
    { to: "/processos", label: "Processos", icon: <FileText size={18} /> },
    { to: "/tarefas", label: "Tarefas", icon: <CheckSquare size={18} /> },
    { to: "/agendamento", label: "Agendamentos", icon: <CalendarDays size={18} /> },
    { to: "/financeiro", label: "Financeiro", icon: <DollarSign size={18} /> },
    { to: "/atendimento", label: "Atendimento", icon: <MessageCircle size={18} /> },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const tarefasData = await getAllTarefas();
        const tarefasFiltradas = (tarefasData || []).filter(
          tarefa => tarefa.status !== 'concluida' && tarefa.status !== 'cancelada'
        );
        setTarefas(tarefasFiltradas);

        const processosData = await getTodosProcessos();
        const ativos = (processosData || []).filter(p => p.andamento === 'Ativo');
        setProcessos(ativos);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <aside className="w-72 h-screen border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
          <div className="bg-blue-600 rounded-xl p-2">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">VertexJuris</h1>
            <p className="text-sm text-gray-500 leading-4">Gestão Jurídica</p>
          </div>
        </div>

        <div className="mt-6 px-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Navegação Principal
          </h2>
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    {link.icon}
                    <span className="text-sm font-medium">{link.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 px-6 pb-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">Visualização Rápida</h2>
          <div className="space-y-4">
            <QuickAccessCard
              icon={<CheckSquare className="text-orange-500" size={18} />}
              label="Tarefas Pendentes"
              value={tarefas.length}
              color="text-orange-500"
            />

            <QuickAccessCard
              icon={<FileText className="text-purple-500" size={18} />}
              label="Processos Ativos"
              value={processos.length}
              color="text-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-semibold">
            {nome.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold leading-4">{nome}</p>
            <p className="text-xs text-gray-500 leading-4">{email}</p>
          </div>
        </div>
        <div className="text-gray-500 cursor-pointer" onClick={handleConfig}>
          <Cog className="h-5 w-5"/>
        </div>
      </div>
    </aside>
  );
}

function QuickAccessCard({ icon, label, value, color }) {
  return (
    <div className="bg-white shadow rounded-xl p-3 flex items-center gap-4">
      <div className="bg-gray-100 rounded-full p-2">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-lg font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}