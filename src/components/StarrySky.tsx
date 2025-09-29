import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, MapPin, Crown, Lock } from 'lucide-react';
import catMimi from '@/assets/pets/cat-mimi.jpg';
import catMimi2 from '@/assets/pets/cat-mimi-2.jpg';
import dogZidane from '@/assets/pets/dog-zidane.jpg';

interface Pet {
  id: string;
  name: string;
  breed: string;
  birthDate: string;
  deathDate?: string;
  location: string;
  image: string;
  description: string;
  isPremium: boolean;
  story?: string;
  milestones?: Array<{ date: string; title: string; description: string }>;
}

const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Mimi',
    breed: 'Gato Europeu',
    birthDate: '15/03/2019',
    location: 'Lisboa, Portugal',
    image: catMimi,
    description: 'A Mimi sempre foi uma gata muito carinhosa e brincalhona...',
    isPremium: false
  },
  {
    id: '2',
    name: 'Zidane',
    breed: 'Labrador Retriever',
    birthDate: '22/08/2018',
    location: 'Porto, Portugal',
    image: dogZidane,
    description: 'O Zidane é um companheiro fiel e cheio de energia...',
    isPremium: true,
    story: 'O Zidane chegou à nossa família quando tinha apenas 8 semanas. Desde o primeiro dia, mostrou ser um cão especial, com uma personalidade única e um coração enorme.',
    milestones: [
      { date: '22/08/2018', title: 'Chegada à família', description: 'O dia em que nos conhecemos' },
      { date: '15/09/2018', title: 'Primeira consulta veterinária', description: 'Tudo perfeito!' },
      { date: '10/12/2018', title: 'Primeiro Natal', description: 'O melhor presente da nossa vida' }
    ]
  },
  {
    id: '3',
    name: 'Luna',
    breed: 'Gato Persa',
    birthDate: '05/06/2020',
    deathDate: '12/11/2023',
    location: 'Coimbra, Portugal',
    image: catMimi2,
    description: 'A Luna foi uma companheira especial durante seus anos connosco...',
    isPremium: true,
    story: 'A Luna trouxe luz e alegria para nossas vidas durante seus preciosos anos connosco. Cada momento foi um presente.',
    milestones: [
      { date: '05/06/2020', title: 'Nascimento', description: 'Uma princesa chegou ao mundo' },
      { date: '20/06/2020', title: 'Adoção', description: 'O dia em que se tornou parte da família' },
      { date: '12/11/2023', title: 'Partida', description: 'Para sempre nos nossos corações' }
    ]
  }
];

const StarrySky = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStarClick = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  return (
    <div className="relative min-h-[500px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 overflow-hidden">
      {/* Background stars decoration */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">O Seu Céu Estrelado</h2>
          <p className="text-muted-foreground">Cada estrela representa um pet especial</p>
        </div>

        <div className="flex justify-center items-center space-x-12">
          {mockPets.map((pet, index) => (
            <div
              key={pet.id}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-110"
              onClick={() => handleStarClick(pet)}
            >
              {/* Star container */}
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                
                {pet.isPremium && (
                  <Crown className="absolute -top-2 -right-2 w-6 h-6 text-memorial-gold fill-memorial-gold" />
                )}
                
                {pet.deathDate && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-gray-300" />
                )}
              </div>

              {/* Pet name */}
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-foreground">{pet.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Clique numa estrela para ver a história do seu pet
          </p>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPet && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">{selectedPet.name}</DialogTitle>
                  {selectedPet.isPremium && (
                    <Badge className="bg-memorial-gold text-memorial-gold-foreground">
                      <Crown className="w-4 h-4 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Pet Image */}
                <div className="relative">
                  <img 
                    src={selectedPet.image} 
                    alt={`Foto de ${selectedPet.name}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Basic Info - Available to all */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {selectedPet.birthDate} {selectedPet.deathDate && `- ${selectedPet.deathDate}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{selectedPet.location}</span>
                  </div>
                  
                  <p className="text-sm text-foreground">{selectedPet.breed}</p>
                  <p className="text-foreground/80">{selectedPet.description}</p>
                </div>

                {/* Premium Content or Upgrade Prompt */}
                {selectedPet.isPremium ? (
                  <div className="space-y-4">
                    {selectedPet.story && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">História Completa</h3>
                        <p className="text-foreground/80">{selectedPet.story}</p>
                      </div>
                    )}

                    {selectedPet.milestones && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Marcos Importantes</h3>
                        <div className="space-y-3">
                          {selectedPet.milestones.map((milestone, index) => (
                            <div key={index} className="border-l-2 border-primary pl-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{milestone.title}</h4>
                                <span className="text-xs text-muted-foreground">{milestone.date}</span>
                              </div>
                              <p className="text-sm text-foreground/70 mt-1">{milestone.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="border border-border rounded-lg p-6 bg-muted/50 text-center">
                    <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Conteúdo Premium</h3>
                    <p className="text-muted-foreground mb-4">
                      Faça upgrade para ver a história completa, vídeos e marcos especiais do {selectedPet.name}
                    </p>
                    <Button className="w-full">
                      Fazer Upgrade para Premium
                    </Button>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={closeModal}>
                    Fechar
                  </Button>
                  <Button className="flex-1">
                    Ver Perfil Completo
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StarrySky;