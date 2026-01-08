import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Autônomo",
    description: "Perfeito para advogados que trabalham sozinhos",
    price: "97",
    period: "/mês",
    icon: Star,
    color: "text-primary",
    bgColor: "bg-primary/10",
    buttonVariant: "default" as const,
    popular: false,
    features: [
      "Até 500 clientes",
      "Gestão de tarefas",
      "CRM básico",
      "Google Calendar",
      "Suporte por email",
      "1 usuário",
      "Relatórios básicos",
      "Backup automático"
    ]
  },
  {
    name: "Profissional",
    description: "Ideal para pequenos e médios escritórios",
    price: "197",
    period: "/mês",
    icon: Zap,
    color: "text-accent",
    bgColor: "bg-accent/10",
    buttonVariant: "gradient" as const,
    popular: true,
    features: [
      "Clientes ilimitados",
      "Gestão avançada de tarefas",
      "CRM completo com Kanban",
      "Google Calendar + Meet",
      "Gestão financeira completa",
      "Até 5 usuários",
      "Relatórios avançados",
      "Integrações personalizadas",
      "Suporte prioritário",
      "Treinamento incluso"
    ]
  },
  {
    name: "Empresarial",
    description: "Para grandes escritórios e crescimento",
    price: "397",
    period: "/mês",
    icon: Crown,
    color: "text-coral",
    bgColor: "bg-coral/10",
    buttonVariant: "coral" as const,
    popular: false,
    features: [
      "Tudo do Profissional",
      "Usuários ilimitados",
      "Multi-escritórios",
      "API personalizada",
      "White label",
      "Relatórios customizados",
      "Gerente de conta dedicado",
      "Suporte 24/7",
      "Implementação personalizada",
      "Consultoria jurídico-tecnológica"
    ]
  }
];

const Pricing = () => {
  return (
    <section id="precos" className="py-20 bg-background">
      <div className="container mx-auto px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Escolha o plano ideal{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              para seu escritório
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Planos flexíveis que crescem com seu escritório. Todos incluem 
            30 dias grátis e garantia de satisfação.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-border/50 ${
                plan.popular ? 'ring-2 ring-accent shadow-medium' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="accent" className="px-4 py-1">
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <plan.icon className={`w-8 h-8 ${plan.color}`} />
                </div>
                
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm text-muted-foreground">R$</span>
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    30 dias grátis • Cancele quando quiser
                  </p>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-success/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-subtle border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Dúvidas sobre qual plano escolher?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe está pronta para ajudar você a encontrar o plano ideal 
              para as necessidades do seu escritório.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contato">
                <Button variant="outline" size="lg">
                  Falar com especialista
                </Button>
              </a>
              <a href="#contato">
                <Button variant="ghost" size="lg">
                  Comparar todos os planos
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">30 dias grátis</h4>
            <p className="text-sm text-muted-foreground">
              Teste todas as funcionalidades sem compromisso
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Implementação rápida</h4>
            <p className="text-sm text-muted-foreground">
              Seu escritório funcionando em menos de 24 horas
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-coral/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="w-6 h-6 text-coral" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Suporte premium</h4>
            <p className="text-sm text-muted-foreground">
              Atendimento especializado quando precisar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;