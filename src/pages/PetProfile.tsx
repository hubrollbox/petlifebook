import { useState } from "react";
import { Heart, Share2, Edit, Flag, FileDown, Calendar, MapPin, Star, MessageCircle, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import petExample1 from "@/assets/pet-example-1.jpg";
import petExample2 from "@/assets/pet-example-2.jpg";

const PetProfile = () => {
  const [newMessage, setNewMessage] = useState("");

  const timelineEntries = [
    {
      id: 1,
      date: "2024-01-15",
      type: "photo",
      content: "Primeiro dia em casa! 🏠",
      media: petExample1,
      likes: 24
    },
    {
      id: 2,
      date: "2024-02-10",
      type: "milestone",
      content: "Primeira consulta veterinária - tudo perfeito!",
      likes: 18
    },
    {
      id: 3,
      date: "2024-03-05",
      type: "video",
      content: "Aprendendo a buscar a bolinha 🎾",
      media: petExample2,
      likes: 31
    }
  ];

  const messages = [
    {
      id: 1,
      author: "Maria Silva",
      avatar: "/placeholder.svg",
      content: "Que lindo! Thor é um amor de cachorro ❤️",
      date: "2 dias atrás"
    },
    {
      id: 2,
      author: "Carlos Mendes",
      avatar: "/placeholder.svg",
      content: "Parabéns pela chegada do novo membro da família!",
      date: "1 semana atrás"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Cover Photo & Profile Header */}
      <div className="relative h-80 bg-gradient-to-r from-primary-soft to-secondary-soft">
        <div className="absolute inset-0 bg-black/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${petExample1})` }}
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-end space-x-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={petExample1} alt="Thor" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              
              <div className="text-white mb-2">
                <h1 className="text-3xl font-bold">Thor</h1>
                <p className="text-lg opacity-90">Golden Retriever • 8 meses</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Nascido em 15/05/2023
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    São Paulo, SP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="memorial">
            <Heart className="w-4 h-4 mr-2" />
            Seguir
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button variant="outline">
            <FileDown className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Flag className="w-4 h-4 mr-2" />
            Denunciar
          </Button>
        </div>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Thor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Thor chegou na nossa família em janeiro de 2024, com apenas 8 semanas de vida. 
                  Desde o primeiro dia, ele trouxe muita alegria para casa com sua energia contagiante 
                  e personalidade única. Adora brincar no jardim, correr atrás de bolinhas e fazer 
                  novos amigos no parque.
                </p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Linha do Tempo</h2>
              
              {timelineEntries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-memorial transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                          {entry.type === 'photo' && <Camera className="w-5 h-5 text-white" />}
                          {entry.type === 'video' && <Video className="w-5 h-5 text-white" />}
                          {entry.type === 'milestone' && <Star className="w-5 h-5 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {new Date(entry.date).toLocaleDateString('pt-BR')}
                          </Badge>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Heart className="w-4 h-4 mr-1" />
                            {entry.likes}
                          </Button>
                        </div>
                        
                        <p className="text-foreground mb-3">{entry.content}</p>
                        
                        {entry.media && (
                          <div className="rounded-lg overflow-hidden">
                            <img 
                              src={entry.media} 
                              alt="Momento especial"
                              className="w-full max-w-md h-64 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Fotos e Vídeos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[petExample1, petExample2, petExample1, petExample2, petExample1, petExample2].map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={image} 
                        alt={`Foto ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            {/* New Message */}
            <Card>
              <CardHeader>
                <CardTitle>Deixar uma mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Compartilhe uma lembrança carinhosa ou deixe uma mensagem de apoio..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mensagens da Comunidade</h3>
              
              {messages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={message.avatar} alt={message.author} />
                        <AvatarFallback>{message.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-sm">{message.author}</p>
                          <span className="text-xs text-muted-foreground">{message.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Services Widget */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Serviços Especiais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col">
                <FileDown className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Livro de Memórias</span>
                <span className="text-xs text-muted-foreground">Versão impressa personalizada</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex-col">
                <Video className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Vídeo Tributo</span>
                <span className="text-xs text-muted-foreground">Compilação automática</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex-col">
                <Heart className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Lembranças Físicas</span>
                <span className="text-xs text-muted-foreground">Urnas e certificados</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PetProfile;