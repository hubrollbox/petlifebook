import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useNavigate } from 'react-router-dom';
import type { Pet } from '@/types/database';

interface StarProps {
  pet: Pet;
  position: [number, number, number];
}

const Star = ({ pet, position }: StarProps) => {
  const meshRef = useRef<Mesh>(null);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Calcular brilho baseado em updated_at
  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(pet.updated_at).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const brightness = daysSinceUpdate < 7 
    ? 1.0 
    : Math.max(0.3, 1 - Math.log(daysSinceUpdate) / Math.log(90));

  // Cor por espécie
  const getColor = () => {
    const species = pet.species?.toLowerCase();
    if (species?.includes('cão') || species?.includes('dog')) return '#00FFFF'; // Light Cyan
    if (species?.includes('gato') || species?.includes('cat')) return '#98FB98'; // Pale Green
    return '#FFFFFF'; // Branco para outros
  };

  // Animação de flutuação suave
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      if (hovered) {
        meshRef.current.scale.setScalar(1.3);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    navigate(`/pet/${pet.id}`);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={getColor()}
        emissive={getColor()}
        emissiveIntensity={brightness * 2}
        transparent
        opacity={0.9}
      />
      {hovered && (
        <pointLight color={getColor()} intensity={2} distance={2} />
      )}
    </mesh>
  );
};

export default Star;
