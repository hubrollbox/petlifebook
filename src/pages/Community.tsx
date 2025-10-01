import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Plus, ThumbsUp, Search, Users, Heart, Loader2, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Community = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error loading pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Galeria da Comunidade
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça os pets que fazem parte da nossa comunidade e as suas histórias únicas
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="memorial" onClick={() => navigate('/criar-perfil')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Perfil
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar pets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
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
                    <span>Pets registados</span>
                    <span className="font-semibold">{pets.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pets vivos</span>
                    <span className="font-semibold">{pets.filter(p => !p.is_deceased).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No céu</span>
                    <span className="font-semibold">{pets.filter(p => p.is_deceased).length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredPets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPets.map((pet) => (
                  <Card 
                    key={pet.id} 
                    className="cursor-pointer hover:shadow-memorial transition-all duration-300"
                    onClick={() => navigate(`/pet/${pet.id}`)}
                  >
                    <CardContent className="p-0">
                      {pet.profile_image_url && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={pet.profile_image_url} 
                            alt={pet.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{pet.name}</h3>
                          {pet.is_deceased && (
                            <Badge variant="outline" className="bg-primary/10">
                              <Heart className="w-3 h-3 mr-1" />
                              No céu
                            </Badge>
                          )}
                        </div>
                        {pet.breed && (
                          <p className="text-sm text-muted-foreground mb-3">{pet.breed}</p>
                        )}
                        <div className="space-y-1 text-xs text-muted-foreground">
                          {pet.birth_date && (
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(pet.birth_date).toLocaleDateString('pt-PT')}
                              {pet.death_date && ` - ${new Date(pet.death_date).toLocaleDateString('pt-PT')}`}
                            </div>
                          )}
                          {pet.location && (
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {pet.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum pet encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Não encontrámos pets com esses termos" : "Ainda não há pets na comunidade"}
                  </p>
                  <Button onClick={() => navigate('/criar-perfil')}>Criar Primeiro Perfil</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;