import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Phone, Mail, MapPin, Instagram } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    plano: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, nome, whatsapp, empresa, plano } = formData;

    if (!plano) {
      toast({
        title: "Plano obrigatorio",
        description: "Selecione um plano antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    const subject = "Nova solicitacao de demonstracao";
    const body = [
      `Nome: ${nome}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp}`,
      `Empresa: ${empresa || "-"}`,
      `Plano: ${plano || "-"}`
    ].join("\n");
    const mailtoUrl = `mailto:aguiarprogramacao@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    toast({
      title: "Sucesso!",
      description: "Abrindo seu cliente de e-mail para enviar os dados.",
    });

    setFormData({
      nome: "",
      email: "",
      whatsapp: "",
      empresa: "",
      plano: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contato" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Pronto para{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              transformar seu escritório?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solicite uma demonstração gratuita e veja como o VertexJuris pode
            revolucionar o atendimento do seu escritório de advocacia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mx-auto">
          <Card className="shadow-lg border border-border/50 w-full overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center">
                Solicite sua demonstração gratuita
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Dr. João Silva"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail profissional *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="joao@escritorio.com.br"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Nome do escritório</Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Silva & Associados"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plano">Plano *</Label>
                  <Select
                    value={formData.plano}
                    onValueChange={(value) =>
                      setFormData({ ...formData, plano: value })
                    }
                  >
                    <SelectTrigger id="plano">
                      <SelectValue placeholder="Selecione um plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Autonomo">Autonomo</SelectItem>
                      <SelectItem value="Profissional">Profissional</SelectItem>
                      <SelectItem value="Empresarial">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full group text-sm sm:text-base text-center break-words"
                >
                  Transformar atendimento jurídico!
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obrigatórios. Seus dados estão seguros conosco.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Por que escolher o VertexJuris?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Implementação em 24h</p>
                      <p className="text-sm text-muted-foreground">Seu escritório funcionando no mesmo dia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Treinamento completo incluído</p>
                      <p className="text-sm text-muted-foreground">Capacitação da equipe sem custo adicional</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Suporte 24/7</p>
                      <p className="text-sm text-muted-foreground">Assistência sempre que precisar</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Garantia de satisfação</p>
                      <p className="text-sm text-muted-foreground">30 dias para testar sem compromisso</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Entre em contato
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">(21) 98256-5890</p>
                      <p className="text-sm text-muted-foreground">WhatsApp e ligações</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">aguiarprogramacao@gmail.com</p>
                      <p className="text-sm text-muted-foreground">Suporte e vendas</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Rio de Janeiro, RJ</p>
                      <p className="text-sm text-muted-foreground">Atendemos todo o Brasil</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">aguiar.programador</p>
                      <p className="text-sm text-muted-foreground">Desenvolvedor do sistema</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;




