import { useEffect, useState } from "react";
import { X, Trash, Plus } from "lucide-react";
import {
  getEtapas,
  createEtapa,
  updateEtapa,
  deleteEtapa,
} from "../../services/etapasService";

export default function ModalEditarEtapas({ isOpen, onClose, etapas, setEtapas }) {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLista(etapas);
    }
  }, [isOpen, etapas]);

  const handleChange = (index, value) => {
    const novaLista = [...lista];
    novaLista[index].nome = value;
    setLista(novaLista);
  };

  const handleAdd = () => {
    const novaEtapa = { id: `temp-${Date.now()}`, nome: "", ordem: lista.length + 1 };
    setLista([...lista, novaEtapa]);
  };

  const handleRemove = async (index) => {
    const etapa = lista[index];
    if (etapa.id && typeof etapa.id === "number") {
      try {
        await deleteEtapa(etapa.id);
      } catch (err) {
        alert("Erro ao deletar etapa");
        return;
      }
    }
    const novaLista = lista.filter((_, i) => i !== index);
    setLista(novaLista);
  };

  const handleSave = async () => {
    setCarregando(true);
    try {
      const novasEtapas = [];

      for (let i = 0; i < lista.length; i++) {
        const etapa = lista[i];
        if (!etapa.nome.trim()) continue;

        const payload = { nome: etapa.nome.trim(), ordem: i + 1 };

        if (etapa.id && typeof etapa.id === "number") {
          await updateEtapa(etapa.id, payload);
        } else {
          await createEtapa(payload);
        }

        novasEtapas.push({ ...payload, id: etapa.id });
      }

      const { data } = await getEtapas();
      setEtapas(data);
      onClose();
    } catch (err) {
      alert("Erro ao salvar etapas");
    } finally {
      setCarregando(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-700 font-bold">Editar Etapas</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {lista.map((etapa, i) => (
            <div key={etapa.id} className="flex items-center gap-2">
              <input
                value={etapa.nome}
                onChange={(e) => handleChange(i, e.target.value)}
                className="w-full border border-gray-200 p-2 rounded"
                placeholder={`Etapa ${i + 1}`}
              />
              <Trash className="text-red-500 cursor-pointer" onClick={() => handleRemove(i)} />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button onClick={handleAdd} className="flex items-center text-blue-600 text-sm gap-1">
            <Plus size={16} /> Adicionar Etapa
          </button>
          <button
            onClick={handleSave}
            disabled={carregando}
            className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
          >
            {carregando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
