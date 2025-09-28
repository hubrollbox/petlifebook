import { useState } from "react";
import { Heart, Calendar, MapPin, MessageCircle, Share2, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import petExample1 from "@/assets/pet-example-1.jpg";
import petExample2 from "@/assets/pet-example-2.jpg";

const Demo = () => {
  const [activeTab, setActiveTab] = useState("timeline");

  const memories = [
    {
      id: 1,
      type: "photo",
      date: "15 de março, 2024",
      title: "Primeiro dia em casa",
      content: "Max chegou em casa hoje! Estava um pouco assustado, mas logo se sentiu em família.",
      image: petExample1,
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      type: "video",
      date: "22 de março, 2024", 
      title: "Aprendendo a sentar",
      content: "Olha só como o Max está esperto! Já consegue sentar e dar a patinha.",
      likes: 8,
      comments: 2
    },
    {
      id: 3,
      type: "photo",
      date: "5 de abril, 2024",
      title: "Passeio no parque",
      content: "Primeiro passeio no parque. Max adorou correr e brincar com outros cães!",
      image: petExample2,
      likes: 15,
      comments: 5
    }
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Pet Profile Header */}
        <Card className="mb-8 overflow-hidden">
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${petExample1})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-4 right-4 bg-memorial-gold text-white">
              Exemplo
            </Badge>
          </div>
          
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  Max
                  <Heart className="w-6 h-6 text-primary fill-primary/20 ml-3" />
                </h1>
                <p className="text-muted-foreground text-lg">Golden Retriever</p>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button variant="memorial" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Seguir Memorial
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Nascimento</p>
                  <p className="font-medium">15 Jan 2022</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Local</p>
                  <p className="font-medium">São Paulo, SP</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-primary mr-3" />
                <div>
                  <p className="text-sm text-muted-foreground">Tutor</p>
                  <p className="font-medium">Ana Silva</p>
                </div>
              </div>
            </div>
            
            <p className="text-foreground/80 leading-relaxed">
              Max era um golden retriever cheio de energia e amor. Adorava correr no parque, 
              brincar com sua bolinha vermelha favorita e receber carinho de toda a família. 
              Sempre foi um companheiro leal e trouxe muita alegria para nossas vidas.
            </p>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                variant={activeTab === "timeline" ? "memorial" : "outline"}
                onClick={() => setActiveTab("timeline")}
                size="sm"
              >
                <Camera className="w-4 h-4 mr-2" />
                Timeline de Memórias
              </Button>
              <Button 
                variant={activeTab === "community" ? "memorial" : "outline"}
                onClick={() => setActiveTab("community")}
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Mensagens da Comunidade
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Content */}
        {activeTab === "timeline" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Timeline de Memórias</h2>
              <p className="text-muted-foreground">
                Todas as memórias especiais do Max organizadas cronologicamente
              </p>
            </div>
            
            {memories.map((memory, index) => (
              <Card key={memory.id} className="hover:shadow-memorial transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{memory.title}</h3>
                      <p className="text-sm text-muted-foreground">{memory.date}</p>
                    </div>
                    <div className="flex items-center">
                      {memory.type === "photo" ? (
                        <Camera className="w-5 h-5 text-primary" />
                      ) : (
                        <Video className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                  
                  {memory.image && (
                    <img 
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <p className="text-foreground/80 mb-4">{memory.content}</p>
                  
                  <Separator className="mb-4" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        {memory.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {memory.comments}
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Community Content */}
        {activeTab === "community" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Mensagens da Comunidade</h2>
              <p className="text-muted-foreground">
                Apoio e carinho de outros tutores que entendem sua dor
              </p>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Maria Santos</h4>
                    <p className="text-sm text-muted-foreground">Há 2 dias</p>
                  </div>
                </div>
                <p className="text-foreground/80">
                  "Max parecia ser um companheiro incrível! Pelas fotos dá para ver 
                  toda a alegria que ele trazia. Sei que vocês criaram memórias lindas juntos. 💙"
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Carlos Mendes</h4>
                    <p className="text-sm text-muted-foreground">Há 3 dias</p>
                  </div>
                </div>
                <p className="text-foreground/80">
                  "Que memorial lindo! Os golden retrievers têm um lugar muito especial 
                  no meu coração. Max certamente foi muito amado e isso fica claro em cada foto. ❤️"
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary-soft to-secondary-soft border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Gostou do que viu? Crie o memorial do seu pet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Comece gratuitamente e eternize as memórias mais preciosas do seu companheiro. 
              É rápido, fácil e feito com muito carinho.
            </p>
            <Button variant="memorial" size="lg">
              Criar Meu Memorial Grátis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;