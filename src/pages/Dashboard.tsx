import { useAuth } from "@/contexts/AuthContext";
import { usePets } from "@/hooks/usePets";
import { useMemories } from "@/hooks/useMemories";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Heart, Plus, Calendar, MapPin, Crown, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SEO from "@/components/SEO";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pets, loading: petsLoading } = usePets({ userId: user?.id });

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0];

  return (
    <>
      <SEO
        title="Meu Dashboard - PetLifeBook"
        description="Gerencie seus pets, memórias e planos"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {displayName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">Olá, {displayName}! 👋</h1>
                <p className="text-muted-foreground">
                  Bem-vindo ao seu dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Meus Pets
                </CardTitle>
                <Heart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pets.length}</div>
                <p className="text-xs text-muted-foreground">
                  {pets.filter(p => !p.is_deceased).length} vivos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Plano Atual
                </CardTitle>
                <Crown className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Gratuito</div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  onClick={() => navigate("/planos")}
                >
                  Fazer upgrade
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Memórias
                </CardTitle>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {pets.reduce((sum, pet) => sum + (pet.is_premium ? 1 : 0), 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  pets com histórico
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="pets" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="pets">Meus Pets</TabsTrigger>
              <TabsTrigger value="memories">Memórias Recentes</TabsTrigger>
            </TabsList>

            {/* Pets Tab */}
            <TabsContent value="pets" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Meus Pets</h2>
                <Button onClick={() => navigate("/criar-perfil")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Pet
                </Button>
              </div>

              {petsLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : pets.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Nenhum pet ainda
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Comece adicionando o perfil do seu primeiro pet
                    </p>
                    <Button onClick={() => navigate("/criar-perfil")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Primeiro Pet
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Memories Tab */}
            <TabsContent value="memories" className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Memórias Recentes</h2>
              
              {pets.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Adicione um pet para começar a criar memórias
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {pets.map((pet) => (
                    <PetMemoriesSection key={pet.id} pet={pet} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

// Pet Card Component
const PetCard = ({ pet }: { pet: any }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/pet/${pet.id}`)}
    >
      {pet.profile_image_url && (
        <div className="aspect-square overflow-hidden">
          <img
            src={pet.profile_image_url}
            alt={pet.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {pet.name}
              {pet.is_premium && (
                <Crown className="w-4 h-4 text-yellow-500" />
              )}
            </CardTitle>
            {pet.breed && (
              <CardDescription>{pet.breed}</CardDescription>
            )}
          </div>
          {pet.is_deceased && (
            <Badge variant="secondary">No Céu ⭐</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {pet.birth_date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {format(new Date(pet.birth_date), "dd/MM/yyyy", { locale: ptBR })}
          </div>
        )}
        {pet.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {pet.location}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Pet Memories Section Component
const PetMemoriesSection = ({ pet }: { pet: any }) => {
  const { memories, loading } = useMemories({ petId: pet.id, limit: 3 });
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {pet.name}
            {pet.is_premium && <Crown className="w-4 h-4 text-yellow-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {pet.name}
            {pet.is_premium && <Crown className="w-4 h-4 text-yellow-500" />}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/pet/${pet.id}`)}
          >
            Ver Todas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {memories.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            Nenhuma memória ainda. Clique para adicionar!
          </p>
        ) : (
          <div className="space-y-4">
            {memories.map((memory, index) => (
              <div key={memory.id}>
                {index > 0 && <Separator className="my-4" />}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{memory.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(memory.memory_date), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                  {memory.content && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {memory.content}
                    </p>
                  )}
                  {memory.media_url && (
                    <img
                      src={memory.media_url}
                      alt={memory.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
