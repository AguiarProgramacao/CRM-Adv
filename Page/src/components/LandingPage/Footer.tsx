import { Scale, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-24 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VertexJuris
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Plataforma completa para atendimento e gestão de clientes para 
              escritórios de advocacia. Transforme seu atendimento jurídico com tecnologia.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Produto</h3>
            <ul className="space-y-2">
              <li><a href="#funcionalidades" className="text-muted-foreground hover:text-primary transition-colors">Funcionalidades</a></li>
              <li><a href="#como-funciona" className="text-muted-foreground hover:text-primary transition-colors">Como Funciona</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Preços</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Demonstração</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Central de Ajuda</a></li>
              <li><a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">WhatsApp</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Treinamentos</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 VertexJuris. Todos os direitos reservados.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Política de Privacidade
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Termos de Uso
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                LGPD
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;