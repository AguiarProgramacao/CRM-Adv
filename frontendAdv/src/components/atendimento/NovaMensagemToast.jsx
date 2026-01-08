import React, { useEffect } from "react";
import { X } from "lucide-react";
import somNotificacao from "../../assets/notification.mp3";

const NovaMensagemToast = ({ mensagem, onClose }) => {
  useEffect(() => {
    const audio = new Audio(somNotificacao);
    audio.play();

    const timeout = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed top-5 right-5 z-50 bg-white shadow-xl border-l-4 border-green-600 rounded-lg w-[300px] p-4">
      <div className="flex justify-between items-start gap-3">
        <div>
          <p className="font-bold text-sm text-black">{mensagem.nome}</p>
          <p className="text-gray-700 text-sm">{mensagem.texto}</p>
        </div>
        <button onClick={onClose}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default NovaMensagemToast;
