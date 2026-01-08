import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MensagensRecentes({ mensagens }) {
  return (
    <Card className="card-shadow border-0">
      <CardHeader className="pb-4">
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2 text-pink-600">
            <MessageSquare color="oklch(59.2% 0.249 0.584)" />
            <span className="text-black">Mensagens Recentes</span>
          </CardTitle>
          <Link to="/mensagens"><ArrowRight className="w-4 h-4 text-black" /></Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {mensagens.map(m => (
          <div key={m.id} className="p-3 bg-pink-50 rounded-lg border">
            <p className="font-medium text-gray-950">{m.nome || "Desconhecido"}</p>
            <p className="text-xs text-gray-600">{m.texto}</p>
            <p className="text-xs text-pink-600">
              {new Date(m.criadoEm).toLocaleString()}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
