import React, { useState } from "react";
import { createUsuario } from "../../services/usuarioService";

export default function FormularioUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("ADVOGADO");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setMensagem("Preencha nome, email e senha.");
      return;
    }

    try {
      setCarregando(true);
      await createUsuario({ nome, email, senha, perfil });
      setMensagem("Responsável criado com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
      setPerfil("ADVOGADO");
    } catch (err) {
      setMensagem(err.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Criar Responsável</h2>

      <div className="mb-4">
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nome do responsável"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="email@exemplo.com"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite uma senha"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="perfil" className="block text-sm font-medium text-gray-700">
          Perfil
        </label>
        <select
          id="perfil"
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="ADVOGADO">Advogado</option>
          <option value="ESTAGIARIO">Estagiário</option>
          <option value="SOCIO">Sócio</option>
        </select>
      </div>

      {mensagem && (
        <p className="mb-4 text-sm text-center text-red-600">{mensagem}</p>
      )}

      <button
        type="submit"
        disabled={carregando}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {carregando ? "Criando..." : "Criar"}
      </button>
    </form>
  );
}
