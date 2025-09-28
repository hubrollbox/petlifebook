import { Check, Star, Heart, Camera, Users, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Plans = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Escolha o Plano Ideal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece gratuitamente e aproveite recursos premium para criar o memorial mais especial
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative hover:shadow-memorial transition-all duration-300">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Plano Gratuito</CardTitle>
              <div className="text-4xl font-bold mb-2">R$ 0</div>
              <p className="text-muted-foreground">Para sempre</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>1 perfil de pet</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>Até 10 fotos</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>Até 2 vídeos</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>Timeline básica</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>Acesso ao fórum comunitário</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>Backup seguro</span>
                </div>
              </div>
              
              <div className="pt-6">
                <Button variant="memorial" className="w-full" size="lg">
                  Começar Gratuitamente
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative hover:shadow-glow transition-all duration-300 border-2 border-memorial-gold">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-memorial-gold to-accent text-white px-4 py-1">
                <Crown className="w-4 h-4 mr-1" />
                Mais Popular
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-memorial-gold to-accent rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Plano Premium</CardTitle>
              <div className="text-4xl font-bold mb-2">R$ 19,90</div>
              <p className="text-muted-foreground">por mês</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Perfis ilimitados</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Fotos ilimitadas</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Vídeos ilimitados</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Templates premium</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Diário digital personalizado</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Compartilhamento nas redes sociais</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Suporte prioritário</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-memorial-gold mr-3 flex-shrink-0" />
                  <span className="font-medium">Sem anúncios</span>
                </div>
              </div>
              
              <div className="pt-6">
                <Button variant="premium" className="w-full" size="lg">
                  Experimentar Premium
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Cancele a qualquer momento
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Perguntas Frequentes</h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso cancelar minha assinatura a qualquer momento?</h3>
                <p className="text-muted-foreground">
                  Sim, você pode cancelar sua assinatura premium a qualquer momento. 
                  Seus dados permanecerão seguros e você voltará automaticamente ao plano gratuito.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Meus dados ficam seguros?</h3>
                <p className="text-muted-foreground">
                  Absolutamente. Utilizamos criptografia de ponta e backup automático para 
                  garantir que suas preciosas memórias estejam sempre protegidas e acessíveis.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Posso fazer upgrade do plano gratuito?</h3>
                <p className="text-muted-foreground">
                  Sim, você pode fazer upgrade para o plano premium a qualquer momento. 
                  Todos os seus dados e memórias já criados serão preservados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;