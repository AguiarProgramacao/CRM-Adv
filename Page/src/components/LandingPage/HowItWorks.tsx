import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Users, Calendar, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Cliente cria contato no sistema",
    description: "O cliente é cadastrado no sistema com todas as informações relevantes e tarefas são criadas automaticamente.",
    color: "bg-primary"
  },
  {
    number: "02", 
    icon: Users,
    title: "Informações organizadas no CRM",
    description: "Os dados são estruturados no CRM em formato Kanban, permitindo acompanhar cada etapa do processo jurídico.",
    color: "bg-accent"
  },
  {
    number: "03",
    icon: Calendar,
    title: "Agendamento automático integrado",
    description: "Reuniões são agendadas diretamente no Google Calendar com link do Meet enviado automaticamente para o cliente.",
    color: "bg-coral"
  }
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Como funciona a{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              VertexJuris
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Um processo simples e automatizado que transforma o atendimento do seu escritório 
            em apenas 3 passos integrados.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-border/50">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-2 border-background">
                      <span className="text-xs font-bold text-foreground">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-4xl mx-auto shadow-soft">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Resultado: Atendimento 100% profissional e organizado
            </h3>
            <p className="text-muted-foreground text-lg">
              Seus clientes ficam impressionados com a agilidade e organização, 
              enquanto você ganha tempo para focar no que realmente importa: o direito.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;