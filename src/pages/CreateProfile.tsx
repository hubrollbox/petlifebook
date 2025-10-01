import { useState } from "react";
import { Camera, Upload, Save, Share2, Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CreateProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [profileData, setProfileData] = useState({
    name: "",
    species: "",
    breed: "",
    birthDate: "",
    deathDate: "",
    location: "",
    story: "",
    isDeceased: false
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    
    if (validImages.length + selectedImages.length > 10) {
      toast({
        title: "Limite excedido",
        description: "Máximo de 10 fotos no plano gratuito",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedImages([...selectedImages, ...validImages]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const uploadImages = async (petId: string): Promise<string | null> => {
    if (selectedImages.length === 0) return null;

    try {
      const mainImage = selectedImages[0];
      const fileExt = mainImage.name.split('.').pop();
      const fileName = `${petId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('pet-photos')
        .upload(fileName, mainImage);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('pet-photos')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const validateForm = (): boolean => {
    if (!profileData.name.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "O nome do animal é obrigatório",
        variant: "destructive"
      });
      return false;
    }

    if (!profileData.species) {
      toast({
        title: "Campo obrigatório",
        description: "A espécie do animal é obrigatória",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handlePublish = async () => {
    if (!user) {
      toast({
        title: "Autenticação necessária",
        description: "Faça login para criar um perfil",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data: pet, error: petError } = await supabase
        .from('pets')
        .insert({
          owner_id: user.id,
          name: profileData.name,
          breed: profileData.breed || null,
          birth_date: profileData.birthDate || null,
          death_date: profileData.deathDate || null,
          location: profileData.location || null,
          story: profileData.story || null,
          is_deceased: profileData.isDeceased,
          is_premium: false
        })
        .select()
        .single();

      if (petError) throw petError;

      const imageUrl = await uploadImages(pet.id);

      if (imageUrl) {
        const { error: updateError } = await supabase
          .from('pets')
          .update({ profile_image_url: imageUrl })
          .eq('id', pet.id);

        if (updateError) throw updateError;
      }

      toast({
        title: "Perfil criado!",
        description: `O perfil de ${profileData.name} foi criado com sucesso.`
      });

      navigate(`/pet/${pet.id}`);
    } catch (error: any) {
      console.error('Error creating profile:', error);
      toast({
        title: "Erro ao criar perfil",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Dados do Animal", icon: Camera },
    { number: 2, title: "Fotos e Vídeos", icon: Upload },
    { number: 3, title: "História e Configurações", icon: Save }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-primary border-primary text-white' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    Passo {step.number}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {currentStep === 1 && "Dados do seu Animal"}
              {currentStep === 2 && "Fotos e Vídeos"}
              {currentStep === 3 && "História e Configurações"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nome do Animal *</Label>
                    <Input 
                      id="name" 
                      placeholder="Ex: Rex, Mimi, Thor..."
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="species">Espécie *</Label>
                    <Select value={profileData.species} onValueChange={(value) => setProfileData({...profileData, species: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a espécie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cão">Cão</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                        <SelectItem value="Pássaro">Pássaro</SelectItem>
                        <SelectItem value="Peixe">Peixe</SelectItem>
                        <SelectItem value="Hamster">Hamster</SelectItem>
                        <SelectItem value="Coelho">Coelho</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="breed">Raça</Label>
                    <Input 
                      id="breed" 
                      placeholder="Ex: Golden Retriever, SRD..."
                      value={profileData.breed}
                      onChange={(e) => setProfileData({...profileData, breed: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Data de Nascimento</Label>
                    <Input 
                      id="birthDate" 
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input 
                      id="location" 
                      placeholder="Ex: Lisboa, Portugal"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="deathDate">Data de Falecimento (Opcional)</Label>
                    <Input 
                      id="deathDate" 
                      type="date"
                      value={profileData.deathDate}
                      onChange={(e) => setProfileData({...profileData, deathDate: e.target.value, isDeceased: !!e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="border-2 border-dashed border-muted rounded-lg p-12">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload de Fotos</h3>
                    <p className="text-muted-foreground mb-4">
                      Adicione fotos do seu animal de estimação
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                      Selecionar Fotos
                    </Button>
                    
                    <div className="mt-6 text-sm text-muted-foreground">
                      <Badge variant="outline" className="mr-2">Plano Gratuito</Badge>
                      <span>Limite: 10 fotos | {selectedImages.length}/10</span>
                    </div>
                  </div>
                </div>

                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        {index === 0 && (
                          <Badge className="absolute bottom-2 left-2">Principal</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="story">História do {profileData.name || "seu pet"}</Label>
                  <Textarea 
                    id="story"
                    placeholder="Conte a história do seu pet, como vocês se conheceram, momentos especiais..."
                    rows={6}
                    value={profileData.story}
                    onChange={(e) => setProfileData({...profileData, story: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    A história será visível no perfil público
                  </p>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-medium mb-2">Resumo do Perfil</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Nome:</strong> {profileData.name || "—"}</p>
                    <p><strong>Espécie:</strong> {profileData.species || "—"}</p>
                    <p><strong>Raça:</strong> {profileData.breed || "—"}</p>
                    <p><strong>Fotos:</strong> {selectedImages.length} selecionadas</p>
                    {profileData.isDeceased && (
                      <p className="text-primary"><strong>Memorial:</strong> Este perfil será adicionado ao céu 🌟</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Anterior
              </Button>
              
              <div className="space-x-2">
                {currentStep < 3 ? (
                  <Button 
                    onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                    disabled={currentStep === 1 && (!profileData.name || !profileData.species)}
                  >
                    Próximo
                  </Button>
                ) : (
                  <Button 
                    variant="memorial" 
                    onClick={handlePublish}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      "Publicar Perfil"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProfile;