import React, { useState, useEffect, useRef } from 'react';
import { Search, Phone, Video, MoreVertical } from 'lucide-react';
import { getMensagens, sendMensagem } from '../services/mensagemService';
import { useToast } from "../context/ToastContext";
import EmojiPicker from 'emoji-picker-react';
import AudioMessagePlayer from '../components/atendimento/AudioMessagePlayer';

export default function Atendimento() {
  const [conversaSelecionada, setConversaSelecionada] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [contatos, setContatos] = useState([]);
  const [input, setInput] = useState('');
  const mensagensEndRef = useRef(null);
  const emojiRef = useRef(null);
  const { showToast } = useToast();
  const ultimaMensagemIdRef = useRef(null);
  const mensagensAntigasRef = useRef([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const scrollToBottom = () => {
    mensagensEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  function formatarNumero(numero) {
    return `+${numero.slice(0, 2)} (${numero.slice(2, 4)}) ${numero.slice(4, 9)}-${numero.slice(9)}`;
  }

  const fetchMensagens = async () => {
    const res = await getMensagens();
    const novasMensagens = res.data;

    const mensagensClientesNovas = novasMensagens
      .filter(m => m.remetente === "cliente" && (!ultimaMensagemIdRef || m.id > ultimaMensagemIdRef));

    if (mensagensClientesNovas.length > 0) {
      const ultima = mensagensClientesNovas.reduce((a, b) => (a.id > b.id ? a : b));

      showToast({
        nome: ultima.nome,
        texto: ultima.texto,
      });

      ultimaMensagemIdRef.current = ultima.id;
    }

    setMensagens(res.data);

    const agrupado = res.data.reduce((acc, msg) => {
      const jaExiste = acc.find((c) => c.numero === msg.numero);
      const agora = new Date();
      const tempo = (agora - new Date(msg.criadoEm)) / 1000;

      let status = 'none';

      if (!jaExiste) {
        acc.push({
          nome: msg.remetente === 'cliente' ? msg.nome : formatarNumero(msg.numero),
          numero: msg.numero,
          ultimaMensagem: msg.texto,
          criadoEm: msg.criadoEm,
          ultimaRemetente: msg.remetente,
          status: msg.remetente === 'cliente'
            ? tempo > 60 ? 'red' : tempo > 30 ? 'yellow' : 'green'
            : 'none',
        });
      } else {
        if (new Date(msg.criadoEm) > new Date(jaExiste.criadoEm)) {
          jaExiste.ultimaMensagem = msg.texto;
          jaExiste.criadoEm = msg.criadoEm;
          jaExiste.ultimaRemetente = msg.remetente;

          jaExiste.status = msg.remetente === 'cliente'
            ? tempo > 60 ? 'red' : tempo > 30 ? 'yellow' : 'green'
            : 'none';
        }
      }

      return acc;
    }, []);

    agrupado.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
    setContatos(agrupado);
  };

  useEffect(() => {
    fetchMensagens();
    const interval = setInterval(fetchMensagens, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mensagensAntigas = mensagensAntigasRef.current;
    const novasMensagens = mensagens.length > mensagensAntigas.length;

    if (novasMensagens) {
      scrollToBottom();
    }

    mensagensAntigasRef.current = mensagens;
  }, [mensagens]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = async () => {
    if (!conversaSelecionada || !input.trim()) return;

    await sendMensagem(conversaSelecionada.numero, input);

    setInput('');

    setContatos((prev) =>
      prev.map((c) =>
        c.numero === conversaSelecionada.numero ? { ...c, status: 'green' } : c
      )
    );

    await fetchMensagens();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-[300px] bg-white border-gray-300 border-r">
        <div className="p-4 border-gray-300 border-b">
          <h2 className="text-lg font-semibold">Atendimento</h2>
          <p className="text-sm text-gray-500">5 conversas</p>
        </div>

        <div className="p-3">
          <input
            type="text"
            placeholder="Buscar conversas..."
            className="w-full p-2 border-gray-300 border rounded text-sm"
          />
        </div>

        <div className="overflow-y-auto">
          {contatos.map((contato, index) => (
            <div
              key={index}
              className={`px-4 py-3 cursor-pointer hover:bg-blue-50 ${contato.numero === conversaSelecionada?.numero ? 'bg-blue-100' : ''
                }`}
              onClick={() => setConversaSelecionada(contato)}
            >
              <div className="flex justify-between items-center">
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <div className="font-semibold">{contato.nome || 'Desconhecido'}</div>
                    {contato.status !== 'none' && (
                      <div
                        className={`w-3 h-3 rounded-full ml-2 ${contato.status === 'green' ? 'bg-green-500' :
                          contato.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        title={
                          contato.status === 'green'
                            ? 'Novo'
                            : contato.status === 'yellow'
                              ? 'Aguardando'
                              : 'Tempo de espera alto'
                        }
                      ></div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 truncate">
                    {contato.ultimaMensagem?.length > 35
                      ? contato.ultimaMensagem.slice(0, 35) + '...'
                      : contato.ultimaMensagem}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        {conversaSelecionada ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-gray-300 border-b bg-white">
              <div>
                <h2 className="font-semibold text-lg">{conversaSelecionada.nome}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <Search size={18} />
                <Phone size={18} />
                <Video size={18} />
                <MoreVertical size={18} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
              {mensagens
                .filter(msg => msg.numero === conversaSelecionada.numero)
                .map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 flex ${msg.remetente === 'atendente' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="bg-white p-2 rounded shadow text-sm max-w-[70%]">
                      <p className="font-semibold">{msg.nome}</p>
                      {msg.tipo === 'audio' && msg.arquivoUrl ? (
                        <AudioMessagePlayer src={msg.arquivoUrl} />
                      ) : (
                        <p>{msg.texto}</p>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(msg.criadoEm).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

              <div ref={mensagensEndRef}></div>
            </div>

            <div className="p-4 bg-white border-gray-300 border-t flex items-center gap-2 relative">
              <button className="text-xl" onClick={() => setShowEmoji(!showEmoji)}>😊</button>
              {showEmoji && (
                <div ref={emojiRef} className="absolute bottom-16 left-2 z-50">
                  <EmojiPicker onEmojiClick={(e) => setInput((prev) => prev + e.emoji)} />
                </div>
              )}
              <textarea
                placeholder="Digite sua mensagem..."
                className="flex-1 border-gray-300 border rounded-md px-4 py-2 text-sm resize-none"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                rows={1}
              />
              <button onClick={handleSend}>Enviar</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Selecione uma conversa para começar
          </div>
        )}
      </main>
    </div>
  );
}
