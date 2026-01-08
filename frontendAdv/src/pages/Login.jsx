import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoSaaS.png';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email,
        password: senha,
      });

      const { token, user } = response.data || {};
      if (!token || !user) {
        throw new Error('Falha ao autenticar.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ ...user, nome: user.name }));

      navigate('/');
    } catch (err) {
      alert('Erro: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-blue-100 px-4">
        <img src={logo} alt="Logo" className="mb-4" />

        <p className="text-blue-800 text-center font-medium text-sm max-w-xs mb-6">
          Transforme sua gestão jurídica com praticidade e eficiência.
        </p>

        <form onSubmit={handleLogin} className="bg-white py-5 px-10 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h1>

          <div className="mb-4">
            <label className="text-gray-700 text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="exemplo@email.com"
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-700 text-sm font-semibold">Senha</label>
            <input
              type="password"
              placeholder="********"
              className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Esqueceu a senha?{' '}
            <span className="text-blue-600 cursor-pointer hover:underline">Recuperar</span>
          </p>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Ainda não tem uma conta?</p>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>

      <div
        className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="bg-blue-800 bg-opacity-40 p-8 rounded-xl text-white text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Bem-vindo ao VertexJuris!</h2>
          <p className="text-sm">
            Gerencie sua advocacia com facilidade. Acesse seu painel para acompanhar processos, boletos e clientes.
          </p>
        </div>
      </div>
    </div>
  );
}
