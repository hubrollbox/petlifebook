import { useState } from "react";
import { Camera, Upload, Save, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const CreateProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: "",
    species: "",
    breed: "",
    birthDate: "",
    story: "",
    isPublic: false,
    collaborators: ""
  });

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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a espécie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cao">Cão</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="passaro">Pássaro</SelectItem>
                        <SelectItem value="peixe">Peixe</SelectItem>
                        <SelectItem value="hamster">Hamster</SelectItem>
                        <SelectItem value="coelho">Coelho</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
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

                <div>
                  <Label htmlFor="breeder">ID do Criador (Opcional)</Label>
                  <Input 
                    id="breeder" 
                    placeholder="Caso tenha sido adquirido de um criador cadastrado"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="border-2 border-dashed border-muted rounded-lg p-12">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload de Fotos e Vídeos</h3>
                    <p className="text-muted-foreground mb-4">
                      Arraste arquivos aqui ou clique para selecionar
                    </p>
                    <Button variant="outline">Selecionar Arquivos</Button>
                    
                    <div className="mt-6 text-sm text-muted-foreground">
                      <Badge variant="outline" className="mr-2">Plano Gratuito</Badge>
                      <span>Limite: 10 fotos e 2 vídeos</span>
                      <br />
                      <Button variant="link" size="sm" className="mt-2">
                        Fazer upgrade para upload ilimitado
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="story">História Inicial</Label>
                  <Textarea 
                    id="story"
                    placeholder="Conte a história do seu pet, como vocês se conheceram, momentos especiais..."
                    rows={6}
                    value={profileData.story}
                    onChange={(e) => setProfileData({...profileData, story: e.target.value})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="visibility" className="text-base">Perfil Público</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que outras pessoas encontrem e vejam o perfil
                    </p>
                  </div>
                  <Switch 
                    id="visibility"
                    checked={profileData.isPublic}
                    onCheckedChange={(checked) => setProfileData({...profileData, isPublic: checked})}
                  />
                </div>

                <div>
                  <Label htmlFor="collaborators">Colaboradores (Emails)</Label>
                  <Input 
                    id="collaborators"
                    placeholder="email1@exemplo.com, email2@exemplo.com"
                    value={profileData.collaborators}
                    onChange={(e) => setProfileData({...profileData, collaborators: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Pessoas que poderão adicionar fotos e memórias ao perfil
                  </p>
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
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Rascunho
                </Button>
                
                {currentStep < 3 ? (
                  <Button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}>
                    Próximo
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button variant="memorial">
                      Publicar Perfil
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
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