import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaRegStickyNote, FaTags } from "react-icons/fa";
import Button from "../ui/Button";

const ModalEventoForm = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    descricao: '',
    data: '',
    tipo: 'audiência',
    prazo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate(form);
    setForm({ descricao: '', data: '', tipo: 'audiência', prazo: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
          <FaCalendarAlt /> Novo Evento
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Descrição */}
          <div className="flex items-center border rounded px-3 py-2">
            <FaRegStickyNote className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Descrição"
              className="w-full focus:outline-none"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              required
            />
          </div>

          {/* Data do Evento */}
          <div>
            <label className="block text-sm font-medium mb-1">Data do Evento</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaClock className="text-gray-500 mr-2" />
              <input
                type="datetime-local"
                className="w-full focus:outline-none"
                value={form.data}
                onChange={(e) => setForm({ ...form, data: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaTags className="text-gray-500 mr-2" />
              <select
                className="w-full focus:outline-none"
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="audiência">Audiência</option>
                <option value="reunião">Reunião</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          {/* Prazo */}
          <div>
            <label className="block text-sm font-medium mb-1">Prazo (opcional)</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FaClock className="text-gray-500 mr-2" />
              <input
                type="datetime-local"
                className="w-full focus:outline-none"
                value={form.prazo}
                onChange={(e) => setForm({ ...form, prazo: e.target.value })}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-2 pt-4 border-t mt-4">
            <Button onClick={onClose} type="button" className="bg-gray-500 hover:bg-gray-600 text-white">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEventoForm;
