import { useState } from "react";
import { ShoppingCart, Heart, Star, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Livro de Memórias Premium",
      description: "Livro personalizado com fotos e história do seu pet",
      price: "R$ 89,90",
      originalPrice: "R$ 129,90",
      image: "/placeholder.svg",
      category: "books",
      rating: 4.8,
      reviews: 156,
      badge: "Mais Vendido"
    },
    {
      id: 2,
      name: "Urna Biodegradável Ecológica",
      description: "Urna sustentável que se transforma em árvore",
      price: "R$ 149,90",
      image: "/placeholder.svg",
      category: "urns",
      rating: 4.9,
      reviews: 89,
      badge: "Eco-Friendly"
    },
    {
      id: 3,
      name: "Certificado de Vida Digital",
      description: "Documento oficial da jornada do seu pet",
      price: "R$ 29,90",
      image: "/placeholder.svg",
      category: "certificates",
      rating: 4.7,
      reviews: 234,
      badge: null
    },
    {
      id: 4,
      name: "Quadro Personalizado Canvas",
      description: "Impressão em canvas de alta qualidade",
      price: "R$ 69,90",
      originalPrice: "R$ 99,90",
      image: "/placeholder.svg",
      category: "prints",
      rating: 4.8,
      reviews: 178,
      badge: "Oferta"
    },
    {
      id: 5,
      name: "Kit Memorial Completo",
      description: "Livro + Urna + Certificado + Quadro",
      price: "R$ 259,90",
      originalPrice: "R$ 359,60",
      image: "/placeholder.svg",
      category: "kits",
      rating: 5.0,
      reviews: 67,
      badge: "Kit Completo"
    },
    {
      id: 6,
      name: "Pendente com Cinzas",
      description: "Joia comemorativa para guardar um pouco das cinzas",
      price: "R$ 199,90",
      image: "/placeholder.svg",
      category: "jewelry",
      rating: 4.9,
      reviews: 45,
      badge: "Exclusivo"
    }
  ];

  const categories = [
    { value: "all", label: "Todos os Produtos" },
    { value: "books", label: "Livros de Memória" },
    { value: "urns", label: "Urnas Ecológicas" },
    { value: "certificates", label: "Certificados" },
    { value: "prints", label: "Impressões" },
    { value: "kits", label: "Kits Completos" },
    { value: "jewelry", label: "Joias Memoriais" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Loja de Produtos Memoriais
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preserve as memórias do seu pet de forma física com nossos produtos especiais, 
            criados com carinho e qualidade premium.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-64">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-memorial transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <div 
                  className="h-48 bg-muted bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-memorial-gold text-white">
                    {product.badge}
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) 
                            ? 'text-memorial-gold fill-memorial-gold' 
                            : 'text-muted'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({product.reviews} avaliações)
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold text-memorial-gold">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <Button className="w-full" variant="memorial">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-16 bg-gradient-to-r from-primary-soft to-secondary-soft">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Precisa de algo personalizado?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nossa equipe pode criar produtos únicos baseados nas necessidades específicas 
              para honrar a memória do seu pet de forma especial.
            </p>
            <Button variant="memorial" size="lg">
              Solicitar Produto Personalizado
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shop;