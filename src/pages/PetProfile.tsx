import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Share2, Edit, Flag, FileDown, Calendar, MapPin, Star, MessageCircle, Camera, Video, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import dogZidane from "@/assets/pets/dog-zidane.jpg";
import catMimi from "@/assets/pets/cat-mimi.jpg";
import catMimi2 from "@/assets/pets/cat-mimi-2.jpg";

const PetProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [pet, setPet] = useState<any>(null);
  const [memories, setMemories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (id) {
      loadPetData();
      loadMemories();
    }
  }, [id]);

  const loadPetData = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPet(data);
    } catch (error: any) {
      console.error('Error loading pet:', error);
      toast({
        title: "Erro ao carregar perfil",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMemories = async () => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('pet_id', id)
        .order('memory_date', { ascending: false });

      if (error) throw error;
      setMemories(data || []);
    } catch (error: any) {
      console.error('Error loading memories:', error);
    }
  };

  const isOwner = user && pet && user.id === pet.owner_id;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Perfil não encontrado</h2>
          <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  const calculateAge = () => {
    if (!pet.birth_date) return "Idade desconhecida";
    const birth = new Date(pet.birth_date);
    const end = pet.death_date ? new Date(pet.death_date) : new Date();
    const months = Math.floor((end.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0) {
      return `${years} ${years === 1 ? 'ano' : 'anos'}${remainingMonths > 0 ? ` e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}` : ''}`;
    }
    return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  };

  return (
    <div className="min-h-screen">
      {/* Cover Photo & Profile Header */}
      <div className="relative h-80 bg-gradient-to-r from-primary-soft to-secondary-soft">
        <div className="absolute inset-0 bg-black/20" />
        {pet.profile_image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${pet.profile_image_url})` }}
          />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-end space-x-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={pet.profile_image_url} alt={pet.name} />
                <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="text-white mb-2">
                <h1 className="text-3xl font-bold">{pet.name}</h1>
                <p className="text-lg opacity-90">{pet.breed || "Raça desconhecida"} • {calculateAge()}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  {pet.birth_date && (
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {pet.is_deceased ? 'Viveu' : 'Nascido em'} {new Date(pet.birth_date).toLocaleDateString('pt-PT')}
                      {pet.death_date && ` - ${new Date(pet.death_date).toLocaleDateString('pt-PT')}`}
                    </span>
                  )}
                  {pet.location && (
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {pet.location}
                    </span>
                  )}
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
          {isOwner && (
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          )}
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
            {pet.story && (
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o {pet.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {pet.story}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Timeline */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Memórias</h2>
              
              {memories.length > 0 ? (
                memories.map((memory) => (
                  <Card key={memory.id} className="hover:shadow-memorial transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            {memory.media_type === 'photo' && <Camera className="w-5 h-5 text-white" />}
                            {memory.media_type === 'video' && <Video className="w-5 h-5 text-white" />}
                            {!memory.media_type && <Star className="w-5 h-5 text-white" />}
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {new Date(memory.memory_date).toLocaleDateString('pt-PT')}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-muted-foreground">
                              <Heart className="w-4 h-4 mr-1" />
                              {memory.likes_count}
                            </Button>
                          </div>
                          
                          {memory.title && <h3 className="font-semibold mb-1">{memory.title}</h3>}
                          {memory.content && <p className="text-foreground mb-3">{memory.content}</p>}
                          
                          {memory.media_url && (
                            <div className="rounded-lg overflow-hidden">
                              <img 
                                src={memory.media_url} 
                                alt="Momento especial"
                                className="w-full max-w-md h-64 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ainda sem memórias</h3>
                    <p className="text-muted-foreground">
                      {isOwner ? "Comece a adicionar memórias especiais do seu pet!" : "Este perfil ainda não tem memórias publicadas."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Galeria de Fotos</CardTitle>
              </CardHeader>
              <CardContent>
                {memories.filter(m => m.media_url).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {memories.filter(m => m.media_url).map((memory) => (
                      <div key={memory.id} className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={memory.media_url} 
                          alt={memory.title || 'Foto'}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Ainda não há fotos na galeria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Mensagens em breve</h3>
                <p className="text-muted-foreground">
                  A funcionalidade de mensagens será adicionada em breve
                </p>
              </CardContent>
            </Card>
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