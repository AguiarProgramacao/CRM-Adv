import { useEffect, useState } from "react";
import {
  FaGavel,
  FaCalendarAlt,
  FaMoneyBill,
  FaUpload
} from "react-icons/fa";
import Button from "../ui/Button";
import { getUsuarios } from '../../services/usuarioService';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../../context/ToastContext";
import ModalResponsavelForm from "./ModalUsuario";

const ModalProcessoForm = ({ isOpen, onClose, cliente, processo, onSubmit }) => {
  const [form, setForm] = useState({
    numero: "",
    areaJuridica: "",
    responsavelId: "",
    andamento: "Ativo",
    valor: "",
    autor: "",
    reu: "",
    descricao: "",
    documentos: [],
    criadoEm: "",
  });
  const { showToast } = useToast("");
  const [isResponsavelModalOpen, setIsResponsavelModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (isOpen) {
      getUsuarios()
        .then(setUsuarios)
        .catch(() => alert('Erro ao carregar usuários'));
    }
  }, [isOpen]);

  useEffect(() => {
    if (processo) {
      setForm({
        numero: processo.numero || "",
        areaJuridica: processo.areaJuridica || "",
        responsavelId: processo.responsavelId?.toString() || processo.responsavel?.id?.toString() || "",
        andamento: processo.andamento || "Ativo",
        valor: processo.valor || "",
        autor: processo.autor || "",
        reu: processo.reu || "",
        descricao: processo.descricao || "",
        documentos: [],
        criadoEm: processo.criadoEm
          ? new Date(processo.criadoEm).toISOString().slice(0, 10)
          : ""
      });
    }
  }, [processo]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, documentos: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
      ...form,
      responsavelId: Number(form.responsavelId),
      clienteId: cliente?.id || processo?.clienteId || processo?.cliente?.id,
      valor: Number(form.valor),
      criadoEm: form.criadoEm ? new Date(form.criadoEm) : undefined,
    };

    try {
      await onSubmit(dados);
      showToast(processo ? 'Processo atualizado com sucesso!' : 'Processo criado com sucesso!');
      onClose();
    } catch (err) {
      console.error('❌ Erro ao salvar processo:', err);
      showToast('Erro ao salvar processo.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <FaGavel className="text-purple-600" />
          {processo ? 'Editar Processo' : 'Novo Processo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Informações Básicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numero">Número do Processo</Label>
                <Input
                  id="numero"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                  placeholder="0000000-00.0000.0.00.0000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="areaJuridica">Área Jurídica</Label>
                <select
                  id="areaJuridica"
                  name="areaJuridica"
                  value={form.areaJuridica}
                  onChange={handleChange}
                  required
                  className="border border-gray-200 p-2 rounded-md w-full"
                >
                  <option value="">Selecione a área</option>
                  <option value="Civil">Civil</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Empresarial">Empresarial</option>
                  <option value="Família">Família</option>
                  <option value="Previdenciário">Previdenciário</option>
                  <option value="Trabalhista">Trabalhista</option>
                  <option value="Tributário">Tributário</option>
                </select>
              </div>
              <div>
                <Label htmlFor="responsavelId">Responsável</Label>
                <select
                  id="responsavelId"
                  name="responsavelId"
                  value={form.responsavelId}
                  onChange={handleChange}
                  required
                  className="border border-gray-200 p-2 rounded-md w-full"
                >
                  <option value="">Nome do advogado responsável</option>
                  {usuarios.map(user => (
                    <option key={user.id} value={user.id}>{user.nome}</option>
                  ))}
                </select>
                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => setIsResponsavelModalOpen(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    + Novo responsável
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="dataCriacao">Data de Criação</Label>
                <div className="flex items-center border border-gray-200 rounded-md p-2">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  <input
                    type="date"
                    id="criadoEm"
                    name="criadoEm"
                    value={form.criadoEm}
                    onChange={handleChange}
                    required
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="andamento"
                  name="andamento"
                  value={form.andamento}
                  onChange={handleChange}
                  className="border border-gray-200 p-2 rounded-md w-full"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Suspenso">Suspenso</option>
                  <option value="Arquivado">Arquivado</option>
                </select>
              </div>
              <div>
                <Label htmlFor="valorCausa">Valor da Causa (R$)</Label>
                <div className="">
                  <Input
                    type="number"
                    id="valor"
                    name="valor"
                    step="0.01"
                    placeholder="0,00"
                    value={form.valor}
                    onChange={handleChange}
                    className="w-full outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Seção: Partes do Processo */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">Partes do Processo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="autor">Autor/Requerente</Label>
                <Input
                  id="autor"
                  name="autor"
                  placeholder="Nome do autor"
                  value={form.autor}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="reu">Réu/Requerido</Label>
                <Input
                  id="reu"
                  name="reu"
                  placeholder="Nome do réu"
                  value={form.reu}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Seção: Descrição do Processo */}
          <div>
            <Label htmlFor="descricao" className="text-lg font-semibold text-gray-800 mb-2 block">Descrição do Processo</Label>
            <textarea
              id="descricao"
              name="descricao"
              placeholder="Descreva os detalhes do processo, objeto da ação, etc."
              value={form.descricao}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              rows={4}
            />
          </div>

          {/* Seção: Documentos */}
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">Documentos</h3>
          <div className="flex items-center">
            <Label className="flex items-center gap-2 cursor-pointer bg-gray-100 px-5 py-3 rounded-md mr-4 hover:bg-gray-400 transition">
              <FaUpload />
              <span>Selecionar Arquivos</span>
              <Input
                type="file"
                name="documentos"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleChange}
                className="hidden"
              />
            </Label>
            <p className="text-sm text-gray-400 mt-1">PDF, DOC, DOCX, JPG, PNG</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white">
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {processo ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
      {isResponsavelModalOpen && (
        <ModalResponsavelForm
          isOpen={isResponsavelModalOpen}
          onClose={() => setIsResponsavelModalOpen(false)}
          onCreate={(novoResponsavel) => {
            setUsuarios(prev => [...prev, novoResponsavel]);
            setForm(prev => ({ ...prev, responsavelId: novoResponsavel.id }));
            setIsResponsavelModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ModalProcessoForm;
