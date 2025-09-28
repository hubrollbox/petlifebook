import { useState } from "react";
import { Calendar, User, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articles = [
    {
      id: 1,
      title: "Como Lidar com a Perda do seu Pet: Um Guia Completo",
      excerpt: "O luto pela perda de um animal de estimação é real e doloroso. Entenda as fases do luto e encontre maneiras saudáveis de processar essa perda.",
      author: "Dra. Ana Carolina",
      date: "2024-01-15",
      category: "luto",
      readTime: "8 min",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 2,
      title: "Criando Memórias Duradouras: Ideias Criativas",
      excerpt: "Descubra formas únicas e especiais de preservar as lembranças do seu companheiro de quatro patas.",
      author: "Maria Silva",
      date: "2024-01-10",
      category: "memorias",
      readTime: "5 min",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 3,
      title: "Sinais de que seu Pet está Envelhecendo",
      excerpt: "Aprenda a identificar os sinais do envelhecimento e como proporcionar o melhor cuidado na terceira idade.",
      author: "Dr. Carlos Mendes",
      date: "2024-01-08",
      category: "cuidados",
      readTime: "6 min",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 4,
      title: "O Poder Terapêutico dos Animais de Estimação",
      excerpt: "Como os pets contribuem para nossa saúde mental e bem-estar emocional ao longo de suas vidas.",
      author: "Dra. Patricia Lima",
      date: "2024-01-05",
      category: "bem-estar",
      readTime: "7 min",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 5,
      title: "Preparando-se para os Últimos Momentos",
      excerpt: "Um guia sensível sobre como tomar decisões difíceis e garantir conforto nos momentos finais.",
      author: "Dr. Roberto Santos",
      date: "2024-01-01",
      category: "cuidados",
      readTime: "10 min",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 6,
      title: "Histórias Inspiradoras: Pets que Marcaram Vidas",
      excerpt: "Conheça histórias tocantes de tutores e seus companheiros que deixaram legados de amor.",
      author: "Equipe PetLifeBook",
      date: "2023-12-28",
      category: "historias",
      readTime: "4 min",
      image: "/placeholder.svg",
      featured: false
    }
  ];

  const categories = [
    { value: "all", label: "Todos", count: articles.length },
    { value: "luto", label: "Luto e Apoio", count: 2 },
    { value: "cuidados", label: "Cuidados", count: 3 },
    { value: "memorias", label: "Memórias", count: 1 },
    { value: "bem-estar", label: "Bem-estar", count: 1 },
    { value: "historias", label: "Histórias", count: 1 }
  ];

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const filteredArticles = regularArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog & Recursos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conteúdos especializados para ajudar você a cuidar, honrar e preservar 
            as memórias dos seus companheiros de quatro patas.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Card className="mb-12 overflow-hidden hover:shadow-memorial transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div 
                className="h-64 md:h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredArticle.image})` }}
              />
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-memorial-gold text-white">
                  Artigo em Destaque
                </Badge>
                <h2 className="text-2xl font-bold mb-4">{featuredArticle.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{featuredArticle.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{new Date(featuredArticle.date).toLocaleDateString('pt-BR')}</span>
                  <span>{featuredArticle.readTime} de leitura</span>
                </div>
                
                <Button variant="memorial" className="w-fit" asChild>
                  <Link to={`/blog/${featuredArticle.id}`}>
                    Ler Artigo Completo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Buscar Artigos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar..."
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
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-primary text-white'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.label}</span>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="bg-gradient-to-br from-primary-soft to-secondary-soft">
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Receba conteúdos exclusivos e dicas especiais no seu email.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Seu email" type="email" />
                  <Button className="w-full" variant="memorial">
                    Assinar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-memorial transition-all duration-300 group">
                  <div 
                    className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-3 h-3" />
                      <Badge variant="outline" className="text-xs">
                        {categories.find(cat => cat.value === article.category)?.label}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <User className="w-3 h-3 mr-1" />
                      <span className="mr-3">{article.author}</span>
                      <Calendar className="w-3 h-3 mr-1" />
                      <span className="mr-3">{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                      <span>{article.readTime}</span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to={`/blog/${article.id}`}>
                        Ler Mais
                        <ArrowRight className="w-3 h-3 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum artigo encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-16 bg-gradient-to-r from-primary-soft to-secondary-soft">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Crie o livro da vida do seu pet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Comece agora a documentar e preservar todos os momentos especiais 
              do seu companheiro em um espaço digital seguro e carinhoso.
            </p>
            <Button variant="memorial" size="lg" asChild>
              <Link to="/criar-perfil">
                Criar Perfil Gratuito
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;