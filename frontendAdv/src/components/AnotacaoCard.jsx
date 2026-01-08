const AnotacaoCard = ({ evento, onDelete }) => (
  <div className="bg-gray-100 rounded shadow p-3 mb-2">
    <h4 className="font-bold">{evento.descricao}</h4>
    <p>Data: {new Date(evento.data).toLocaleDateString()}</p>
    <button
      className="bg-red-500 text-white px-2 py-1 rounded mt-2"
      onClick={() => onDelete(evento.id)}
    >
      Deletar Evento
    </button>
  </div>
);

export default AnotacaoCard;
