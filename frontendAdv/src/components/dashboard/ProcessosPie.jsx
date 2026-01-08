import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText } from "lucide-react";

const COLORS = ['#6366F1', '#22C55E', '#F59E0B'];

export default function ProcessosPie({ processos }) {
  const data = [
    { name: 'Ativo', value: processos.filter(p => p.andamento === 'Ativo').length },
    { name: 'Suspenso', value: processos.filter(p => p.andamento === 'Suspenso').length },
    { name: 'Arquivado', value: processos.filter(p => p.andamento === 'Arquivado').length }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-indigo-600" /> Distribuição dos Processos
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={50}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
