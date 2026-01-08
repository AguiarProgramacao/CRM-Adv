import React, { useState } from "react";
import Button from "../ui/Button";

const ModalAnotacaoForm = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    conteudo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate(form);
    setForm({ conteudo: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Nova Anotação</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="border p-2 mb-2 w-full resize-none"
            placeholder="Conteúdo da anotação"
            value={form.conteudo}
            onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
            required
            rows={4}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={onClose} type="button">Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAnotacaoForm;
