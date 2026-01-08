import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText, ArrowRight } from "lucide-react";
import { STATUS_COLORS } from "./constants";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

export default function ProcessosRecentes({ processos }) {
  return (
    <Card className="card-shadow border-0">
      <CardHeader className="pb-4">
        <div className="flex justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <FileText color="#9810fa" /> 
            <span className="text-black">Processos Recentes</span>
          </CardTitle>
          <Link to="/processos"><ArrowRight className="w-4 h-4 text-black" /></Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {processos.slice(0, 3).map(p => (
          <div key={p.id} className="p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-950">{p.numero}</p>
                <p className="text-xs mt-1 text-gray-600">{p.cliente?.nome}</p>
                <p className="text-xs mt-1 text-purple-600">{p.areaJuridica}</p>
              </div>
              <Badge className={STATUS_COLORS[p.andamento]}>
                {p.andamento}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
