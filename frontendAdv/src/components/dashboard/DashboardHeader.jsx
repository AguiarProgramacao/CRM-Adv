import { Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Jurídico</h1>
        <p className="text-gray-600">Visão geral dos seus casos</p>
      </div>

      <div className="flex gap-3">
        <Link to="/cliente">
          <Button variant="outline">
            <Users className="mr-2" /> Novo Cliente
          </Button>
        </Link>
        <Link to="/processos">
          <Button>
            <Plus className="mr-2" /> Novo Processo
          </Button>
        </Link>
      </div>
    </div>
  );
}
