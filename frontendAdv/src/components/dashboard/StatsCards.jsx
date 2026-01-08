import { Users, FileText, Calendar, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function StatsCards({
  clientes,
  processos,
  agAtual,
  agPassado,
  naoLidas,
  crescimentoClientes,
  crescimentoProcessos
}) {
  const diff = agAtual.length - agPassado.length;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Users className="text-blue-600" size={24} />
          </div>
          <TrendingUp className="text-green-500" size={18} />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Total Clientes</p>
          <p className="text-3xl font-bold">{clientes.length}</p>
          <p className={crescimentoClientes >= 0 ? "text-green-600" : "text-red-600"}>
            {crescimentoClientes.toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="p-3 bg-purple-100 rounded-xl">
            <FileText className="text-purple-600" size={24} />
          </div>
          <TrendingUp className="text-green-500" size={18} />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Processos</p>
          <p className="text-3xl font-bold">{processos.length}</p>
          <p className={crescimentoProcessos >= 0 ? "text-green-600" : "text-red-600"}>
            {crescimentoProcessos.toFixed(1)}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="p-3 bg-orange-100 rounded-xl">
            <Calendar className="text-orange-600" size={24} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Agendamentos</p>
          <p className="text-3xl font-bold">{agAtual.length}</p>
          <p className="text-orange-600">
            {diff >= 0 ? "+" : ""}{diff} vs mês passado
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="p-3 bg-pink-100 rounded-xl">
            <MessageSquare className="text-pink-600" size={24} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Mensagens</p>
          <p className="text-3xl font-bold">{naoLidas}</p>
        </CardContent>
      </Card>
    </div>
  );
}
