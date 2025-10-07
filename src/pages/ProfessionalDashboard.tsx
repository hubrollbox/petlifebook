import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePets } from "@/hooks/usePets";
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Grid3x3, List, Calendar, Crown, MapPin, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Pet } from "@/types/database";

const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const { pets, loading } = usePets({ userId: user?.id });
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pet.breed?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || pet.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: pets.length,
    forSale: pets.filter(p => p.status === "for_sale").length,
    inCare: pets.filter(p => p.status === "in_care").length,
    adopted: pets.filter(p => p.status === "adopted").length,
  };

  return (
    <>
      <SEO 
        title="Dashboard Profissional - PetLifeBook"
        description="Gerencie todos os seus animais num só lugar"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Profissional</h1>
              <p className="text-muted-foreground">Gerencie todos os seus animais num só lugar</p>
            </div>
            <Button onClick={() => navigate("/criar-perfil")} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Animal
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total de Animais</CardDescription>
                <CardTitle className="text-3xl">{stats.total}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Disponíveis para Venda</CardDescription>
                <CardTitle className="text-3xl">{stats.forSale}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Em Cuidados</CardDescription>
                <CardTitle className="text-3xl">{stats.inCare}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Adotados</CardDescription>
                <CardTitle className="text-3xl">{stats.adopted}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Ferramentas de Filtro e Pesquisa */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por nome ou raça..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="personal">Pessoal</SelectItem>
                    <SelectItem value="for_sale">À Venda</SelectItem>
                    <SelectItem value="in_care">Em Cuidados</SelectItem>
                    <SelectItem value="adopted">Adotado</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="animals" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="animals">Animais</TabsTrigger>
              <TabsTrigger value="litters">Ninhadas</TabsTrigger>
              <TabsTrigger value="health">Saúde</TabsTrigger>
            </TabsList>

            <TabsContent value="animals" className="space-y-4 mt-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : filteredPets.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      {searchQuery || statusFilter !== "all"
                        ? "Nenhum animal encontrado com os filtros aplicados."
                        : "Adicione um animal para começar."}
                    </p>
                  </CardContent>
                </Card>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} navigate={navigate} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPets.map((pet) => (
                    <PetListItem key={pet.id} pet={pet} navigate={navigate} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="litters" className="space-y-4 mt-6">
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Funcionalidade de gestão de ninhadas em desenvolvimento.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-4 mt-6">
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Funcionalidade de gestão de saúde em desenvolvimento.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

const PetCard = ({ pet, navigate }: { pet: Pet; navigate: any }) => {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      personal: { label: "Pessoal", variant: "default" },
      for_sale: { label: "À Venda", variant: "secondary" },
      in_care: { label: "Em Cuidados", variant: "outline" },
      adopted: { label: "Adotado", variant: "destructive" },
    };
    return statusMap[status] || { label: status, variant: "default" };
  };

  const statusBadge = getStatusBadge(pet.status || "personal");

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
              {pet.is_premium && <Crown className="w-4 h-4 text-yellow-500" />}
            </CardTitle>
            {pet.breed && <CardDescription>{pet.breed}</CardDescription>}
          </div>
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
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

const PetListItem = ({ pet, navigate }: { pet: Pet; navigate: any }) => {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      personal: { label: "Pessoal", variant: "default" },
      for_sale: { label: "À Venda", variant: "secondary" },
      in_care: { label: "Em Cuidados", variant: "outline" },
      adopted: { label: "Adotado", variant: "destructive" },
    };
    return statusMap[status] || { label: status, variant: "default" };
  };

  const statusBadge = getStatusBadge(pet.status || "personal");

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/pet/${pet.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {pet.profile_image_url && (
            <img
              src={pet.profile_image_url}
              alt={pet.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{pet.name}</h3>
              {pet.is_premium && <Crown className="w-4 h-4 text-yellow-500" />}
              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            </div>
            {pet.breed && <p className="text-sm text-muted-foreground">{pet.breed}</p>}
          </div>
          <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
            {pet.birth_date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {format(new Date(pet.birth_date), "dd/MM/yyyy", { locale: ptBR })}
              </div>
            )}
            {pet.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {pet.location}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalDashboard;
