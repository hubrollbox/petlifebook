import { Heart, Users, Shield, Award, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const About = () => {
  const team = [
    {
      name: "Ana Silva",
      role: "Fundadora & CEO",
      bio: "Veterinária apaixonada por animais com 15 anos de experiência. Criou o PetLifeBook após perder sua cadela Luna.",
      image: "/placeholder.svg"
    },
    {
      name: "Carlos Santos",
      role: "Diretor de Tecnologia",
      bio: "Especialista em tecnologia com foco em soluções que conectam pessoas. Tutor orgulhoso de 3 gatos resgatados.",
      image: "/placeholder.svg"
    },
    {
      name: "Maria Oliveira",
      role: "Diretora de Experiência",
      bio: "Psicóloga especializada em luto e vínculos afetivos. Dedica sua carreira a ajudar famílias em momentos difíceis.",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Amor Incondicional",
      description: "Acreditamos que o amor entre humanos e animais é uma das forças mais puras do mundo."
    },
    {
      icon: Users,
      title: "Comunidade Acolhedora",
      description: "Criamos espaços seguros onde pessoas podem compartilhar suas experiências sem julgamento."
    },
    {
      icon: Shield,
      title: "Privacidade e Segurança",
      description: "Protegemos suas memórias mais preciosas com os mais altos padrões de segurança."
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Oferecemos produtos e serviços de excelência para honrar adequadamente cada vida especial."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre o PetLifeBook
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nascemos da necessidade de criar um espaço digno para celebrar e preservar 
            as memórias dos nossos companheiros mais leais. Cada pet merece ter sua história contada.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Target className="w-8 h-8 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Proporcionar uma plataforma digital carinhosa e segura onde tutores possam 
                celebrar, documentar e preservar as memórias de seus animais de estimação, 
                criando legados duradouros de amor e companherismo.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Eye className="w-8 h-8 text-secondary mx-auto mb-4" />
              <CardTitle className="text-2xl">Nossa Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ser a principal plataforma mundial para preservação de memórias de pets, 
                conectando uma comunidade global de amantes de animais e oferecendo suporte 
                emocional em todos os momentos da jornada.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Nossa História</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              O PetLifeBook nasceu em 2023, quando nossa fundadora Ana Silva passou pela dolorosa 
              experiência de perder sua companheira Luna, uma Golden Retriever que esteve ao seu 
              lado por 14 anos. Durante o processo de luto, Ana percebeu a falta de um espaço 
              adequado para preservar e celebrar as memórias de Luna.
            </p>
            <p>
              Inspirada pela necessidade de criar algo significativo em memória de Luna, Ana reuniu 
              uma equipe de profissionais apaixonados por animais e tecnologia. Juntos, desenvolveram 
              uma plataforma que vai além de um simples memorial - um verdadeiro livro da vida que 
              acompanha os pets desde o primeiro dia.
            </p>
            <p>
              Hoje, milhares de famílias já usam o PetLifeBook para documentar as aventuras de seus 
              companheiros, criar conexões com outros tutores e, quando necessário, encontrar apoio 
              durante momentos difíceis. Cada perfil criado é uma celebração da vida e do amor 
              incondicional que nossos pets nos oferecem.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-memorial transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-memorial transition-all duration-300">
                <CardContent className="p-6">
                  <div 
                    className="w-24 h-24 mx-auto mb-4 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <Card className="mb-16 bg-gradient-to-r from-primary-soft to-secondary-soft">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Impacto em Números</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10.5k+</div>
                <div className="text-sm text-muted-foreground">Perfis Criados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">50k+</div>
                <div className="text-sm text-muted-foreground">Fotos Preservadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">2.8k+</div>
                <div className="text-sm text-muted-foreground">Famílias Conectadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-memorial-gold mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              Faça Parte da Nossa Comunidade
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de tutores que já preservam as memórias dos seus pets 
              conosco. Comece hoje mesmo a documentar a jornada do seu companheiro.
            </p>
            <div className="space-x-4">
              <Button variant="memorial" size="lg" asChild>
                <Link to="/criar-perfil">Criar Perfil Gratuito</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/comunidade">Conhecer a Comunidade</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;