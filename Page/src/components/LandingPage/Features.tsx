import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Users, 
  Database, 
  Calendar, 
  CreditCard, 
  Eye, 
  DollarSign, 
  BarChart3,
  Clock,
  Zap
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Gestão de Tarefas",
    description: "Sistema completo para criar, organizar e acompanhar tarefas jurídicas com prazos e responsáveis definidos.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "CRM Inteligente",
    description: "Gestão de clientes com pipeline em formato Kanban para acompanhar cada etapa do processo jurídico.",
    color: "text-accent"
  },
  {
    icon: Database,
    title: "Registro Automático",
    description: "Todas as conversas são automaticamente registradas no banco de dados para consulta futura.",
    color: "text-coral"
  },
  {
    icon: Calendar,
    title: "Google Calendar",
    description: "Integração completa com Google Calendar para agendamento de reuniões com link automático do Meet.",
    color: "text-success"
  },
  {
    icon: CreditCard,
    title: "Gestão de Cobranças",
    description: "Geração de cobranças com integração futura ao Stripe para boletos e pagamentos online.",
    color: "text-primary"
  },
  {
    icon: Eye,
    title: "Monitoramento em Tempo Real",
    description: "Visualização dos atendimentos, mensagens e status dos leads em tempo real para controle total.",
    color: "text-accent"
  },
  {
    icon: DollarSign,
    title: "Gestão Financeira",
    description: "Controle completo de transações, boletos e lembretes automáticos para pagamentos.",
    color: "text-coral"
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description: "Analytics avançados para acompanhar performance do escritório e produtividade da equipe.",
    color: "text-success"
  }
];

const Features = () => {
  return (
    <section id="funcionalidades" className="py-20 bg-background">
      <div className="container mx-auto px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Tudo que seu escritório{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              precisa em um só lugar
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Funcionalidades pensadas especificamente para o fluxo de atendimento jurídico, 
            desde o primeiro contato até o fechamento do caso.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Economize até 5 horas por dia</span>
            <Zap className="w-5 h-5 text-coral" />
            <span className="text-sm text-muted-foreground">Aumente sua produtividade em 300%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;