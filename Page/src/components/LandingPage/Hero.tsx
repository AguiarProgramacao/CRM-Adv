import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/img-page.png";

const Hero = () => {
  return (
    <section className="bg-gradient-subtle py-20 lg:py-32" id="hero">
      <div className="container mx-auto px-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Transforme seu{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                atendimento jurídico
              </span>{" "}
              com tecnologia
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Plataforma completa para escritórios de advocacia com gestão de tarefas, 
              CRM inteligente e automações que otimizam o tempo dos advogados.
            </p>

            <div className="mb-8">
              <a href="#contato">
                <Button variant="hero" className="group w-full py-7">
                  Transformar atendimento jurídico!
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Totalmente web
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Fácil de usar
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                Suporte completo
              </div>
            </div>
          </div>

          <div className="animate-slide-up relative">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="VertexJuris - Plataforma para escritórios de advocacia" 
                className="rounded-2xl shadow-large animate-float"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;