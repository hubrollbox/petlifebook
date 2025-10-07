import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import type { Pet } from '@/types/database';

interface StarProps {
  pet: Pet;
  position: [number, number, number];
}

const Star = ({ pet, position }: StarProps) => {
  const meshRef = useRef<THREE.Group>(null);
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

  const handleClick = (e: any) => {
    e.stopPropagation();
    navigate(`/pet/${pet.id}`);
  };

  // Star shape vertices
  const starShape = () => {
    const points = [];
    const outerRadius = 0.15;
    const innerRadius = 0.06;
    
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / 5;
      points.push(
        radius * Math.cos(angle),
        radius * Math.sin(angle),
        0
      );
    }
    return points;
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <mesh>
        <extrudeGeometry
          args={[
            (() => {
              const shape = new THREE.Shape();
              const outerRadius = 0.15;
              const innerRadius = 0.06;
              
              for (let i = 0; i < 10; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (i * Math.PI) / 5 - Math.PI / 2;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                if (i === 0) {
                  shape.moveTo(x, y);
                } else {
                  shape.lineTo(x, y);
                }
              }
              shape.closePath();
              return shape;
            })(),
            { depth: 0.05, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01 }
          ]}
        />
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={brightness * 2}
          transparent
          opacity={0.9}
        />
      </mesh>
      {hovered && (
        <pointLight color={getColor()} intensity={3} distance={3} />
      )}
    </group>
  );
};

export default Star;
