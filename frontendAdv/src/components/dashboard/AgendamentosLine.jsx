import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

export default function AgendamentosLine({ atual, passado }) {
  const diasAtual = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date())
  });

  let accAtual = 0;
  let accPassado = 0;

  const data = diasAtual.map((dia, i) => {
    const diaStr = format(dia, "yyyy-MM-dd");

    accAtual += atual.filter(a =>
      format(new Date(a.dataHoraInicio), "yyyy-MM-dd") === diaStr
    ).length;

    accPassado += passado.filter(a =>
      format(new Date(a.dataHoraInicio), "yyyy-MM-dd") === diaStr
    ).length;

    return {
      dia: format(dia, "dd/MM"),
      "Mês Atual": accAtual,
      "Mês Passado": accPassado
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="text-emerald-600" /> Comparativo de Agendamentos
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="dia" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line dataKey="Mês Passado" stroke="#6366F1" strokeWidth={3} />
            <Line dataKey="Mês Atual" stroke="#FACC15" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
