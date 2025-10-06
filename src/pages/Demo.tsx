import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Upload, Share2, FileText, Heart, Star, Camera, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Demo = () => {
  return (
    <>
      <SEO 
        title="Como Funciona - PetLifeBook"
        description="Aprenda como criar e partilhar o memorial digital do seu pet em passos simples."
      />
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Como Funciona o PetLifeBook
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Criar o memorial digital do seu pet é simples e rápido. 
              Siga estes passos e eternize as memórias mais preciosas.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle>1. Crie o Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comece por criar o perfil do seu pet com informações básicas: nome, espécie, raça e datas importantes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <CardTitle>2. Adicione Memórias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Carregue fotos, vídeos e adicione histórias especiais. Crie uma timeline de momentos inesquecíveis.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-accent to-memorial-gold rounded-full flex items-center justify-center mb-4">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle>3. Partilhe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Partilhe o memorial com família e amigos ou mantenha privado. Você decide quem pode ver.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-memorial-gold to-primary rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <CardTitle>4. Preserve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  As memórias ficam guardadas para sempre. No céu de estrelas, cada pet brilha eternamente.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Detail */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              Recursos Disponíveis
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Timeline de Memórias</h3>
                      <p className="text-muted-foreground">
                        Organize todas as fotos, vídeos e histórias numa linha temporal. 
                        Reviva os momentos mais especiais de forma cronológica.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <Star className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Céu de Estrelas</h3>
                      <p className="text-muted-foreground">
                        Cada pet falecido torna-se uma estrela no céu coletivo. 
                        Um espaço lindo e emocional para homenagear todos os animais.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <Heart className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Plano Gratuito</h3>
                      <p className="text-muted-foreground">
                        Crie memoriais para pets falecidos gratuitamente. 
                        Até 3 pets com espaço para guardar fotos e histórias.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-memorial-gold/10 rounded-lg flex items-center justify-center mr-4 shrink-0">
                      <Clock className="w-6 h-6 text-memorial-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Plano Premium</h3>
                      <p className="text-muted-foreground">
                        Acompanhe pets vivos com ferramentas de saúde, vacinas e lembretes. 
                        Perfis ilimitados e armazenamento sem limites.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Example Preview */}
          <Card className="mb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Veja um Exemplo Real
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Explore como fica um memorial completo. Veja fotos, histórias e a timeline de memórias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <Link to="/">Ver Céu de Estrelas</Link>
                </Button>
                <Button size="lg" asChild>
                  <Link to="/planos">Ver Planos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA Final */}
          <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Comece Agora Gratuitamente
              </h2>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Não espere mais. Crie o memorial do seu pet em minutos e 
                guarde as memórias mais preciosas para sempre.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link to="/criar-perfil">Criar Memorial Grátis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Demo;
