import { FaTrash } from 'react-icons/fa';
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClienteCard = ({ cliente, onDelete }) => {
  const navigate = useNavigate();

  const abrirDetalhes = () => {
    navigate("/detalhes-cliente", { state: { cliente } });
  };

  const inicial = cliente?.nome?.charAt(0)?.toUpperCase() || "?";
  const cidadeUf = cliente?.cidade && cliente?.estado
    ? `${cliente.cidade}, ${cliente.estado}`
    : "Localização não informada";
  const dataCadastro = cliente?.criadoEm
    ? new Date(cliente.criadoEm).toLocaleDateString()
    : "Data desconhecida";

  const leadMaisRecente = cliente.leads
    ?.slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

  return (
    <button
      onClick={abrirDetalhes}
      className="bg-white p-4 rounded-lg shadow flex flex-col gap-2 relative text-left w-full hover:shadow-md transition cursor-pointer hover:text-blue-700"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(cliente.id);
        }}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        title="Excluir cliente"
      >
        <FaTrash />
      </button>

      <div className="flex items-center gap-4">
        <div className="bg-blue-600 text-white w-10 h-9 flex items-center justify-center rounded-full font-bold text-lg">
          {inicial}
        </div>
        <div className='w-full'>
          <h3 className="text-lg font-semibold">{cliente.nome || "Nome não informado"}</h3>
          <div className='flex justify-between'>
            <p className="text-gray-500 text-sm">{cliente.documento || "CPF não informado"} </p>
          </div>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-700 gap-2">
        <Mail size={16} /> {cliente.email || "Email não informado"}
      </div>
      <div className="flex items-center text-sm text-gray-700 gap-2">
        <Phone size={16} /> {cliente.telefone || "Telefone não informado"}
      </div>
      <div className="flex items-center text-sm text-gray-700 gap-2">
        <MapPin size={16} /> {cidadeUf}
      </div>
      <div className="flex items-center text-sm text-gray-700 gap-2">
        <Calendar size={16} /> Cliente desde {dataCadastro}
      </div>
    </button>
  );
};

export default ClienteCard;
