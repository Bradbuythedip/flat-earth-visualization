import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh, DoubleSide } from 'three';
import { useTexture } from '@react-three/drei';

export const FlatEarth = () => {
  const meshRef = useRef<Mesh>(null);
  
  // Load multiple textures for better visual quality
  const {
    map: earthTexture,
    normalMap: bumpMap,
    roughnessMap,
    aoMap
  } = useTexture({
    map: '/textures/flat-earth-map.jpg',
    normalMap: '/textures/flat-earth-normal.jpg',
    roughnessMap: '/textures/flat-earth-roughness.jpg',
    aoMap: '/textures/flat-earth-ao.jpg',
  });

  return (
    <group>
      {/* Main flat Earth disc */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[5, 128]} />
        <meshStandardMaterial 
          map={earthTexture}
          normalMap={bumpMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          side={DoubleSide}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Ice wall around the edge */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <ringGeometry args={[4.9, 5.1, 128, 4, 0, Math.PI * 2]} />
        <meshStandardMaterial 
          color="#a8d5ff" 
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};
