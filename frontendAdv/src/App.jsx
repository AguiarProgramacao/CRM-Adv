import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Processos from './pages/Processos';
import ClientesPage from './pages/ClientesPage';
import AgendamentosPage from './pages/Agendamentos';
import ClienteDetalhesWrapper from './pages/ClienteDetalhesWrapper';
import DetalhesProcessoPage from './pages/DetalhesProcesso';
import Tarefas from './pages/Tarefas';
import Financeiro from "./pages/Financeiro";
import AtendimentoPage from './pages/Atendimento';
import ConfigPage from './pages/ConfigPage';
import Register from './pages/Register';
import SelecionarPlano from './pages/SelecionarPlano';
import FinalizarCadastro from './pages/FinalizarCadastro';
import CalendarCallback from './pages/CalendarCallback';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isPlanoPage = location.pathname === '/planos';
  const isPagamento = location.pathname === '/pagamento-sucesso';
  const isAuthenticated = !!localStorage.getItem('token');

  if (isLoginPage || isRegisterPage || isPlanoPage || isPagamento) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/planos" element={<SelecionarPlano />} />
      <Route path="/pagamento-sucesso" element={<FinalizarCadastro />} />
    </Routes>
  );
}

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/processos" element={<Processos />} />
            <Route path="/cliente" element={<ClientesPage />} />
            <Route path="/agendamento" element={<AgendamentosPage />} />
            <Route path="/detalhes-cliente" element={<ClienteDetalhesWrapper />} />
            <Route path="/processos/:id" element={<DetalhesProcessoPage />} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/atendimento" element={<AtendimentoPage />} />
            <Route path="/configuracao" element={<ConfigPage />} />
            <Route path="/google-callback" element={<CalendarCallback />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
