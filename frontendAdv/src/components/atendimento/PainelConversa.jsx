// components/PainelConversa.js
export default function PainelConversa({ conversa }) {
  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{conversa?.nome}</h3>
          <p className="text-sm text-gray-500">Online • {conversa?.assunto}</p>
        </div>
      </header>
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
      </div>
      
      <footer className="p-4 border-t flex items-center gap-2">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 border rounded-md px-3 py-2 text-sm"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2">
          Enviar
        </button>
      </footer>
    </div>
  );
}
