import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-24 py-4 flex items-center justify-between">
        <div>
          <a href="#hero" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              VertexJuris
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#funcionalidades" className="text-foreground hover:text-primary transition-colors">
            Funcionalidades
          </a>
          <a href="#como-funciona" className="text-foreground hover:text-primary transition-colors">
            Como Funciona
          </a>
          <a href="#precos" className="text-foreground hover:text-primary transition-colors">
            Preços
          </a>
          <a href="#depoimentos" className="text-foreground hover:text-primary transition-colors">
            Depoimentos
          </a>
          <a href="#contato" className="text-foreground hover:text-primary transition-colors">
            Contato
          </a>
        </nav>

        <a href="#contato">
          <Button variant="gradient">
            Solicitar Demonstração
          </Button>
        </a>
      </div>
    </header>
  );
};

export default Header;