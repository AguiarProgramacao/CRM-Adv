import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { PRIORIDADE_COLORS } from "./constants";
import { Link } from "react-router-dom";

export default function TarefasUrgentes({ tarefas }) {
  return (
    <Card className="card-shadow border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-5 h-5" color="oklch(64.6% 0.222 41.116)" /> 
            <span className="text-black">Tarefas Urgentes</span>
          </CardTitle>
          <Link to="/agendamento"><ArrowRight className="w-4 h-4 text-black" /></Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {tarefas.slice(0, 3).map(t => (
          <div key={t.id} className="p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-950">{t.titulo}</p>
                <p className="text-xs mt-1 text-gray-600">
                  {t.processo?.cliente?.nome} • {t.processo_numero}
                </p>
                <p className="text-xs mt-1 text-orange-600">
                  Vence: {new Date(t.dataVencimento).toLocaleString()}
                </p>
              </div>
              <Badge className={PRIORIDADE_COLORS[t.prioridade]}>
                {t.prioridade}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
