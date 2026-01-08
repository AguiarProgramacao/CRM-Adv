import { useEffect, useState } from "react";
import { getEtapas } from "../../services/etapasService";
import { updateLead } from "../../services/clienteService";

const ModalLeadForm = ({ isOpen, onClose, cliente }) => {
  const [etapaId, setEtapaId] = useState("");
  const [etapas, setEtapas] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const carregarEtapas = async () => {
      const res = await getEtapas();
      setEtapas(res.data || []);
    };
    carregarEtapas();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateLead(cliente.id, Number(etapaId));
      alert("Lead atualizada!");
      setEtapaId("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar lead.");
    }
  };

  if (!isOpen || !cliente) return null;

  return (
    <div className="modal">
      <h2>Atualizar Lead de {cliente.nome}</h2>
      <select
        value={etapaId}
        onChange={(e) => setEtapaId(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="">Selecione a etapa</option>
        {etapas.map((etapa) => (
          <option key={etapa.id} value={etapa.id}>{etapa.nome}</option>
        ))}
      </select>
      <button type="submit" onClick={handleSubmit}>Salvar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default ModalLeadForm;
