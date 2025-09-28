import { useState } from "react";
import { MessageSquare, Plus, ThumbsUp, Reply, Flag, Search, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "geral", name: "Discussões Gerais", icon: MessageSquare, topics: 245, color: "bg-primary" },
    { id: "luto", name: "Apoio no Luto", icon: Heart, topics: 89, color: "bg-memorial-gold" },
    { id: "cuidados", name: "Cuidados e Saúde", icon: Users, topics: 156, color: "bg-secondary" },
    { id: "historias", name: "Histórias Inspiradoras", icon: MessageSquare, topics: 201, color: "bg-accent" },
    { id: "criacao", name: "Criação e Treinamento", icon: Users, topics: 78, color: "bg-primary" },
    { id: "adocao", name: "Adoção Responsável", icon: Heart, topics: 45, color: "bg-memorial-gold" }
  ];

  const topics = [
    {
      id: 1,
      title: "Como lidar com a primeira noite sem meu Golden?",
      author: "Maria Silva",
      avatar: "/placeholder.svg",
      category: "luto",
      replies: 23,
      likes: 45,
      lastActivity: "2 horas atrás",
      isPinned: false,
      isFeatured: true
    },
    {
      id: 2,
      title: "Dicas para fotografar pets: compartilhem suas técnicas!",
      author: "João Santos",
      avatar: "/placeholder.svg",
      category: "geral",
      replies: 67,
      likes: 89,
      lastActivity: "4 horas atrás",
      isPinned: true,
      isFeatured: false
    },
    {
      id: 3,
      title: "Sinais de que meu gato está feliz - compartilhem experiências",
      author: "Ana Carolina",
      avatar: "/placeholder.svg",
      category: "cuidados",
      replies: 34,
      likes: 56,
      lastActivity: "6 horas atrás",
      isPinned: false,
      isFeatured: false
    },
    {
      id: 4,
      title: "História do meu Thor - 15 anos de pura alegria",
      author: "Carlos Mendes",
      avatar: "/placeholder.svg",
      category: "historias",
      replies: 12,
      likes: 78,
      lastActivity: "1 dia atrás",
      isPinned: false,
      isFeatured: false
    },
    {
      id: 5,
      title: "Processo de adoção: o que vocês consideram mais importante?",
      author: "Patricia Lima",
      avatar: "/placeholder.svg",
      category: "adocao",
      replies: 45,
      likes: 67,
      lastActivity: "2 dias atrás",
      isPinned: false,
      isFeatured: false
    }
  ];

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Comunidade PetLifeBook
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um espaço acolhedor para compartilhar experiências, encontrar apoio 
            e celebrar a vida dos nossos companheiros de quatro patas.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="memorial">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Tópico
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar tópicos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center`}>
                          <category.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.topics} tópicos</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-gradient-to-br from-primary-soft to-secondary-soft">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span>Membros ativos</span>
                    <span className="font-semibold">2.847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tópicos totais</span>
                    <span className="font-semibold">814</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mensagens hoje</span>
                    <span className="font-semibold">67</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* New Topic Form */}
            <Card>
              <CardHeader>
                <CardTitle>Iniciar Nova Discussão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Título do tópico..."
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Compartilhe sua experiência, dúvida ou história..."
                  rows={4}
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>💡 Dica: Seja específico no título para receber melhores respostas</span>
                  </div>
                  <Button variant="memorial">
                    Publicar Tópico
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Topics List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Discussões Recentes</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Mais Recentes</Button>
                  <Button variant="ghost" size="sm">Mais Populares</Button>
                </div>
              </div>

              {filteredTopics.map((topic) => (
                <Card key={topic.id} className={`hover:shadow-memorial transition-all duration-300 ${topic.isFeatured ? 'border-memorial-gold' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={topic.avatar} alt={topic.author} />
                        <AvatarFallback>{topic.author.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-2">
                          {topic.isPinned && (
                            <Badge variant="outline" className="text-xs bg-primary text-white">
                              Fixado
                            </Badge>
                          )}
                          {topic.isFeatured && (
                            <Badge className="text-xs bg-memorial-gold text-white">
                              Em Destaque
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {categories.find(cat => cat.id === topic.category)?.name}
                          </Badge>
                        </div>

                        <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                          {topic.title}
                        </h3>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>por <strong>{topic.author}</strong></span>
                            <span>•</span>
                            <span>{topic.lastActivity}</span>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-sm">
                              <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                              <span>{topic.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Reply className="w-4 h-4 text-muted-foreground" />
                              <span>{topic.replies}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredTopics.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum tópico encontrado</h3>
                    <p className="text-muted-foreground">
                      Não encontramos discussões com os termos pesquisados.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;