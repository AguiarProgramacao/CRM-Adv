import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import api from "../services/api";

export default function PagamentoSucesso() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dados = localStorage.getItem("novoUsuario");
    if (!dados) {
      alert("Dados do usuário não encontrados. Por favor, faça o cadastro novamente.");
      navigate("/register");
      return;
    }

    const dadosUsuario = JSON.parse(dados);

    const cadastrarUsuario = async () => {
      try {
        const payload = {
          name: dadosUsuario.nome,
          email: dadosUsuario.email,
          password: dadosUsuario.senha,
          whatsapp: dadosUsuario.whatsapp,
          empresa: dadosUsuario.empresa,
        };

        const response = await api.post("/auth/register", payload);
        const { token, user } = response.data || {};

        if (!token || !user) {
          alert("Erro ao criar conta.");
          setLoading(false);
          return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ ...user, nome: user.name }));
        localStorage.removeItem("novoUsuario");

        setLoading(false);
      } catch (error) {
        alert("Erro na comunicação: " + error.message);
        setLoading(false);
      }
    };

    cadastrarUsuario();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4 animate-bounce-slow">
            <CheckCircle2 className="text-green-600 w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {loading ? "Criando sua conta..." : "Conta criada com sucesso!"}
        </h1>
        <p className="text-muted-foreground text-lg">
          {loading
            ? "Aguarde enquanto configuramos sua conta."
            : "Você já pode acessar o sistema com seus dados."}
        </p>
        {!loading && (
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-gradient-to-r from-blue-400 via-purple-600 to-orange-500 rounded-md text-white font-medium flex items-center justify-center gap-5 mb-3 cursor-pointer mt-5"
          >
            Fazer login
          </button>
        )}
      </div>
    </div>
  );
}
