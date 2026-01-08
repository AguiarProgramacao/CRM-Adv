import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Autônomo",
    description: "Perfeito para advogados que trabalham sozinhos",
    price: "97",
    period: "/mês",
    icon: Star,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    buttonVariant: "default",
    popular: false,
    features: [
      "Até 500 clientes",
      "WhatsApp integrado",
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
    color: "text-purple-500",
    bgColor: "bg-purple-400/10",
    buttonVariant: "gradient",
    popular: true,
    features: [
      "Clientes ilimitados",
      "WhatsApp Business API",
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
    color: "text-orange-500",
    bgColor: "bg-orange-400/10",
    buttonVariant: "coral",
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
  const navigate = useNavigate();

  const iniciarAssinatura = async (plano) => {
    let user = JSON.parse(localStorage.getItem("novoUsuario"));

    if (!user) {
      alert("Usuário não encontrado no localStorage.");
      return;
    }

    // Atualiza o plano no localStorage
    user = { ...user, plano: plano.name.toLowerCase() };
    localStorage.setItem("novoUsuario", JSON.stringify(user));
    console.log(user);
    navigate("/pagamento-sucesso");
  };

  return (
    <section id="precos" className="py-10 bg-background">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Escolha o plano ideal{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 bg-clip-text text-transparent">
              para seu escritório
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Planos flexíveis que crescem com seu escritório. Todos incluem
            garantia de satisfação.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={index}
                className={`relative group hover:shadow-large transition-all duration-300 hover:-translate-y-2 border-border/50 ${plan.popular ? 'ring-2 ring-accent shadow-medium ring-purple-500' : ''
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="px-4 py-1 bg-purple-500 text-white">
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${plan.color}`} />
                  </div>

                  <CardTitle>
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                  </CardTitle>

                  <p className="text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="text-center mb-3">
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm text-muted-foreground">R$</span>
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="">
                    <button
                      onClick={() => iniciarAssinatura(plan)}
                      className="w-full py-3 bg-gradient-to-r from-blue-400 via-purple-600 to-orange-500 rounded-md text-white font-medium flex items-center justify-center gap-5 mb-3 cursor-pointer"
                    >
                      Selecionar Plano <ArrowRight />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ">
                          <Check className="w-5 h-3 text-success" />
                        </div>
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
