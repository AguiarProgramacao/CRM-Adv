import { useState } from "react";
import api from "../../services/api";

const FormularioCobranca = ({ onClose }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [valorReais, setValorReais] = useState("");

  const gerarBoleto = async (e) => {
    e.preventDefault();

    try {
      const valorCentavos = Math.round(parseFloat(valorReais.replace(",", ".")) * 100);

      const response = await api.post("/stripe/gerar-boleto", {
        nome,
        email,
        clienteId: 1,
        valorCentavos,
      });

      const { sessionUrl } = response.data;

      if (!sessionUrl) {
        throw new Error("URL da sessão não foi gerada.");
      }

      const novaAba = window.open(sessionUrl, "_blank");
      if (!novaAba) alert("Por favor, habilite pop-ups para este site.");
    } catch (error) {
      console.error("Erro ao gerar boleto:", error);
      alert("Erro ao gerar cobrança");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-120 mx-auto mt-10 bg-white shadow-md rounded-xl p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Gerar Cobrança por Boleto</h2>
        <form onSubmit={gerarBoleto} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Valor (em reais)</label>
            <input
              type="number"
              step="0.01"
              value={valorReais}
              onChange={(e) => setValorReais(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Gerar Cobrança
          </button>
        </form>
        <button
          className="mt-4 px-4 py-2 text-white bg-blue-700 font-bold rounded hover:bg-blue-600 absolute top-0 right-5 cursor-pointer"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FormularioCobranca;
