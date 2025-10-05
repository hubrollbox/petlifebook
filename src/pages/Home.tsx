import { Link } from "react-router-dom";
import { Heart, Star, Shield, Camera, Users, BookOpen, Upload, Share2, FileText, Award, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/starry-sky-hero.jpg";
import StarrySky from "@/components/StarrySky";
import SEO from "@/components/SEO";

const Home = () => {
  return (
    <>
      <SEO />
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
            Guarde e celebre cada momento da vida do seu pet
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            PetLifeBook é um espaço digital onde você pode criar o "livro da vida" do seu animal — 
            registrando fotos, vídeos, histórias e marcos desde o primeiro dia até sempre.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="memorial" asChild>
              <Link to="/criar-perfil">Criar Perfil Grátis</Link>
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
              Como Funciona
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Criar o livro da vida do seu pet é simples e rápido
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle>1. Crie o Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Crie o perfil do animal em minutos com informações básicas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <CardTitle>2. Adicione Memórias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Adicione fotos, vídeos e marcos importantes da vida.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-accent to-memorial-gold rounded-full flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <CardTitle>3. Compartilhe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Partilhe ou mantenha privado — guarde tudo para sempre.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-memorial-gold to-primary rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle>4. Preserve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Exporte em PDF ou crie produtos físicos personalizados.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Céu Estrelado */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <StarrySky />
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Funcionalidades
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tudo o que precisa para guardar e celebrar cada momento da vida do seu pet
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">Gratuitas</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Criação de perfil de pets</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Upload de fotos e vídeos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Timeline básica</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Partilha de histórias</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Acesso ao blog e comunidade</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-memorial-gold">Premium</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>Personalização avançada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>Armazenamento ilimitado</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>Diário de vida com marcos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>Livros de memória automáticos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>Integração com redes sociais</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-memorial-gold rounded-full"></div>
                  <span>Serviços físicos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parcerias */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Parceiros
            </h2>
            <p className="text-lg text-muted-foreground">
              Trabalhamos com os melhores profissionais do setor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Criadores / Canis</h3>
                <p className="text-sm text-muted-foreground">
                  Rede certificada de criadores responsáveis
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Clínicas Veterinárias</h3>
                <p className="text-sm text-muted-foreground">
                  Cuidados especializados para o seu pet
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-accent to-memorial-gold rounded-full flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Pet Shops</h3>
                <p className="text-sm text-muted-foreground">
                  Produtos de qualidade para o seu animal
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-6">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-memorial-gold to-primary rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Fotógrafos</h3>
                <p className="text-sm text-muted-foreground">
                  Sessões fotográficas especializadas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-card p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Seja Parceiro</h3>
              <p className="text-muted-foreground mb-6">
                Junte-se à nossa rede de parceiros e ofereça os seus serviços aos tutores
              </p>
              <Button>Candidatar-se</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Blog
            </h2>
            <p className="text-lg text-muted-foreground">
              Últimas publicações, histórias de pets e dicas de criação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Como lidar com a perda de um pet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Dicas importantes para atravessar este momento difícil...
                  </p>
                  <Button variant="outline" size="sm">Ler mais</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-accent/20"></div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Cuidados essenciais para filhotes</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Guia completo para os primeiros meses de vida...
                  </p>
                  <Button variant="outline" size="sm">Ler mais</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-0">
                <div className="h-48 bg-gradient-to-br from-accent/20 to-memorial-gold/20"></div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Histórias que nos inspiram</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conheça histórias emocionantes de outros tutores...
                  </p>
                  <Button variant="outline" size="sm">Ler mais</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/blog">Leia mais no blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testemunhos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Testemunhos
            </h2>
            <p className="text-lg text-muted-foreground">
              O que dizem outros tutores sobre o PetLifeBook
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-memorial transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-memorial-gold fill-memorial-gold" />
                  ))}
                </div>
                <p className="text-foreground mb-4">
                  "Criar o perfil da Mimi foi muito fácil. Agora tenho todas as memórias dela organizadas num só lugar."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Ana Pereira</p>
                    <p className="text-sm text-muted-foreground">Criadora em Lisboa</p>
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
                  "O PetLifeBook permitiu-me partilhar a história do Zidane com toda a família. É muito emocionante."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">João Silva</p>
                    <p className="text-sm text-muted-foreground">Veterinário no Porto</p>
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
                  "A funcionalidade premium vale cada cêntimo. Os livros de memória ficam lindos!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent to-memorial-gold rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Maria Costa</p>
                    <p className="text-sm text-muted-foreground">Fotógrafa de pets</p>
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
          
          <Button size="lg" asChild>
            <Link to="/criar-perfil">Criar Perfil Grátis</Link>
          </Button>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;