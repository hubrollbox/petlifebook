import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { supabase } from '@/integrations/supabase/client';
import type { Pet } from '@/types/database';
import Star from './Star';
import { Loader2 } from 'lucide-react';

const StarrySkyHome = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('is_deceased', true)
        .order('updated_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error loading pets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gerar posições aleatórias para as estrelas
  const generatePosition = (index: number): [number, number, number] => {
    const radius = 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta) - 5,
      radius * Math.cos(phi),
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-sky-100">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Overlay com informação */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 text-center bg-gradient-to-b from-black/30 to-transparent">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          O Céu dos Nossos Pets
        </h1>
        <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
          Cada estrela representa um pet que vive para sempre nos nossos corações
        </p>
        <p className="text-sm text-white/80 mt-4">
          Clique numa estrela para ver a história
        </p>
      </div>

      {/* Canvas 3D */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' }}
      >
        <Suspense fallback={null}>
          {/* Iluminação */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* Estrelas de fundo */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Estrelas dos pets */}
          {pets.map((pet, index) => (
            <Star
              key={pet.id}
              pet={pet}
              position={generatePosition(index)}
            />
          ))}

          {/* Controles de órbita */}
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.3}
            minDistance={10}
            maxDistance={40}
          />
        </Suspense>
      </Canvas>

      {/* Footer overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 text-center bg-gradient-to-t from-black/30 to-transparent">
        <p className="text-white/80 text-sm">
          {pets.length} {pets.length === 1 ? 'estrela' : 'estrelas'} brilhando no céu
        </p>
      </div>
    </div>
  );
};

export default StarrySkyHome;
