// components/ConversasList.js
export default function ConversasList({ conversas, onSelecionar }) {
  return (
    <div className="w-80 border-r">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-bold">Atendimento</h2>
        <input
          type="text"
          placeholder="Buscar conversas..."
          className="w-full mt-2 px-3 py-1 border rounded-md text-sm"
        />
      </div>
      <ul className="overflow-y-auto">
        {conversas.map((conv) => (
          <li
            key={conv.id}
            onClick={() => onSelecionar(conv)}
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
          >
            <p className="font-medium">{conv.nome}</p>
            <div className="text-sm text-gray-500 truncate">{conv.ultimaMensagem}</div>
            <div className="flex gap-1 mt-1">
              {conv.tags.map(tag => (
                <span key={tag} className="bg-gray-200 text-xs px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
