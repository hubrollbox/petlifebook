import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Crown, Heart } from "lucide-react";

const Plans = () => {
  const features = {
    free: [
      "Criação de perfil de pets",
      "Upload de até 10 fotos",
      "Upload de até 2 vídeos",
      "Timeline básica",
      "Partilha de histórias",
      "Acesso ao blog",
      "Participação na comunidade"
    ],
    premium: [
      "Tudo do plano gratuito",
      "Upload ilimitado de fotos e vídeos",
      "Personalização avançada de perfis",
      "Templates exclusivos",
      "Diário digital do pet",
      "Marcos automáticos (aniversários, vacinas)",
      "Criação de livros de memória",
      "Export em PDF profissional",
      "Integração com redes sociais",
      "Suporte prioritário",
      "Produtos físicos com desconto"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Escolha o Seu Plano
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comece gratuitamente e faça upgrade quando quiser mais funcionalidades para celebrar a vida do seu pet
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative border-2 hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Gratuito</CardTitle>
              <div className="text-3xl font-bold text-foreground mt-4">
                €0<span className="text-sm font-normal text-muted-foreground">/mês</span>
              </div>
              <p className="text-muted-foreground mt-2">Para começar a sua jornada</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full" size="lg">
                Começar Gratuitamente
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-memorial-gold hover:shadow-xl transition-all duration-300">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-memorial-gold text-memorial-gold-foreground">
              <Crown className="w-4 h-4 mr-1" />
              Mais Popular
            </Badge>
            
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-memorial-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-memorial-gold" />
              </div>
              <CardTitle className="text-2xl font-bold">Premium</CardTitle>
              <div className="text-3xl font-bold text-foreground mt-4">
                €9.99<span className="text-sm font-normal text-muted-foreground">/mês</span>
              </div>
              <p className="text-muted-foreground mt-2">Celebre cada momento especial</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {features.premium.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-memorial-gold shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full bg-memorial-gold hover:bg-memorial-gold/90 text-memorial-gold-foreground" size="lg">
                Começar Premium
              </Button>
              
              <p className="text-center text-xs text-muted-foreground">
                Primeiro mês gratuito • Cancele a qualquer momento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Posso fazer upgrade a qualquer momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sim! Pode fazer upgrade para Premium a qualquer momento e todas as suas memórias e perfis serão mantidos.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">O que acontece se eu cancelar o Premium?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Todas as suas memórias ficam guardadas, mas perde acesso às funcionalidades Premium. Pode reativar a qualquer momento.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Existe limite de pets no plano gratuito?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Não! Pode criar perfis para todos os seus pets em qualquer plano. O limite é apenas no armazenamento de fotos e vídeos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16 p-8 bg-card rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
          <p className="text-muted-foreground mb-6">
            Junte-se a milhares de tutores que já guardam as memórias dos seus pets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Criar Perfil Gratuito</Button>
            <Button variant="outline" size="lg">Ver Demonstração</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;