import { useState } from "react";
import { atendimentoCliente } from "../../services/clienteService";

const ModalAtendimentoForm = ({ isOpen, onClose, cliente }) => {
  const [descricao, setDescricao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await atendimentoCliente({
        clienteId: cliente.id,
        descricao,
      });

      alert("Atendimento criado com sucesso!");
      setDescricao("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao criar atendimento.");
    }
  };

  if (!isOpen || !cliente) return null;

  return (
    <div className="modal">
      <h2>Adicionar Atendimento para {cliente.nome}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          className="border p-2 w-full mb-4"
        />
        <button type="submit">Salvar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default ModalAtendimentoForm;
