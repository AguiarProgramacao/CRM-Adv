import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="h-20 bg-white shadow-md flex items-center justify-between px-6 ml-64 top-0 right-0 left-64 z-40">
      <h1 className="text-lg font-semibold text-gray-800">Painel de Controle</h1>
      
      <div className="flex items-center gap-3">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-sm text-gray-700">Bem-vindo!</span>
      </div>
    </div>
  );
}
