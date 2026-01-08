import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "Dr. Carlos Mendes",
    role: "Advogado Criminalista",
    company: "Mendes & Associados",
    image: testimonial1,
    rating: 5,
    text: "O VertexJuris revolucionou meu escritório. Agora consigo acompanhar todos os clientes em tempo real e nunca mais perco uma informação importante. Minha produtividade aumentou 300%!"
  },
  {
    name: "Dra. Ana Beatriz Silva",
    role: "Advogada Trabalhista",
    company: "Silva Advocacia",
    image: testimonial2,
    rating: 5,
    text: "Finalmente encontrei uma plataforma que entende o fluxo jurídico. A gestão de tarefas é perfeita e o CRM em Kanban facilita muito o acompanhamento dos processos."
  },
  {
    name: "Dr. Ricardo Santos",
    role: "Sócio-Fundador",
    company: "Santos, Lima & Partners",
    image: testimonial3,
    rating: 5,
    text: "Implementamos o VertexJuris em nosso escritório de 8 advogados e os resultados foram imediatos. Organização total e clientes muito mais satisfeitos com nosso atendimento."
  }
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-20 bg-background">
      <div className="container mx-auto px-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            O que nossos clientes{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              estão dizendo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advogados e escritórios que já transformaram seu atendimento com o VertexJuris.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 border-border/50 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="w-12 h-12" />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-coral text-coral" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-subtle border border-border rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Advogados ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-coral mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Suporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;