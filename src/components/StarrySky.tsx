import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, MapPin, Crown, Lock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Pet } from '@/types/database';


const StarrySky = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadDeceasedPets();
  }, []);

  const loadDeceasedPets = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('is_deceased', true)
        .order('death_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error loading deceased pets:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-3xl font-bold text-foreground mb-2">O Céu dos Nossos Pets</h2>
          <p className="text-muted-foreground">Cada estrela representa um pet que vive para sempre nos nossos corações</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : pets.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-8">
            {pets.map((pet) => (
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
                  
                  {pet.is_premium && (
                    <Crown className="absolute -top-2 -right-2 w-6 h-6 text-memorial-gold fill-memorial-gold" />
                  )}
                </div>

                {/* Pet name */}
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-foreground">{pet.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ainda não há estrelas no céu</p>
          </div>
        )}

        {!loading && pets.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Clique numa estrela para ver a história
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedPet && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">{selectedPet.name}</DialogTitle>
                  {selectedPet.is_premium && (
                    <Badge className="bg-memorial-gold text-memorial-gold-foreground">
                      <Crown className="w-4 h-4 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Pet Image */}
                {selectedPet.profile_image_url && (
                  <div className="relative">
                    <img 
                      src={selectedPet.profile_image_url} 
                      alt={`Foto de ${selectedPet.name}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Basic Info */}
                <div className="space-y-3">
                  {selectedPet.birth_date && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>
                        {new Date(selectedPet.birth_date).toLocaleDateString('pt-PT')}
                        {selectedPet.death_date && ` - ${new Date(selectedPet.death_date).toLocaleDateString('pt-PT')}`}
                      </span>
                    </div>
                  )}
                  
                  {selectedPet.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{selectedPet.location}</span>
                    </div>
                  )}
                  
                  {selectedPet.breed && <p className="text-sm text-foreground">{selectedPet.breed}</p>}
                  {selectedPet.story && <p className="text-foreground/80">{selectedPet.story}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={closeModal}>
                    Fechar
                  </Button>
                  <Button className="flex-1" onClick={() => {
                    navigate(`/pet/${selectedPet.id}`);
                    closeModal();
                  }}>
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