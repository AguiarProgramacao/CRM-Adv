import { Button } from "@/components/ui/button";
import { conectarGoogleCalendar } from "@/services/clienteService";

export default function GoogleAuthButton() {
  const handleGoogleConnect = async () => {
    try {
      await conectarGoogleCalendar();
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com Google");
    }
  };

  return (
    <Button onClick={handleGoogleConnect} className="w-full bg-red-500 hover:bg-red-600 text-white">
      Conectar com Google
    </Button>
  );
}
