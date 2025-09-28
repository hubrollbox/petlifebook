import { Link } from "react-router-dom";
import { Heart, Star, Shield, Smartphone, Camera, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        
        <div className="relative container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            Eternize as Memórias do seu Pet
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Crie um memorial digital único para seu companheiro de quatro patas. 
            Compartilhe fotos, histórias e mantenha viva a memória de quem tanto amou.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="memorial" asChild>
              <Link to="/demo">Criar Memorial Grátis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/demo">Ver Exemplo</Link>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            Gratuito para sempre • Sem cartão necessário
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Um lugar especial para eternizar o amor
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada pet merece ser lembrado de forma única. Nosso memorial digital 
              oferece tudo o que você precisa para honrar a memória do seu companheiro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Timeline de Memórias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organize fotos, vídeos e histórias em uma linha do tempo linda e cronológica.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Comunidade de Apoio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Conecte-se com outros tutores e compartilhe experiências em um ambiente acolhedor.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-accent to-memorial-gold rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Seguro e Privado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Suas memórias ficam seguras em nossa plataforma com backup automático e privacidade total.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Histórias que tocam o coração
            </h2>
            <p className="text-lg text-muted-foreground">
              Veja como outros tutores estão honrando a memória de seus companheiros
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-memorial-gold fill-memorial-gold" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "O PetMemorial me ajudou a processar a partida do meu Thor. 
                  Poder ver todas nossas memórias organizadas de forma tão carinhosa 
                  foi um verdadeiro presente."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Maria Silva</p>
                    <p className="text-sm text-muted-foreground">Tutora do Thor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-memorial-gold fill-memorial-gold" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "A comunidade aqui é incrível. Encontrei pessoas que entendem 
                  exatamente o que estou passando. Isso fez toda diferença no meu luto."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Carlos Mendes</p>
                    <p className="text-sm text-muted-foreground">Tutor da Luna</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-soft to-secondary-soft">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comece a eternizar as memórias hoje
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie um memorial gratuito em poucos minutos. Sem compromissos, 
            sem cartão de crédito necessário.
          </p>
          
          <Button size="lg" variant="memorial" asChild>
            <Link to="/demo">Criar Memorial Grátis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;