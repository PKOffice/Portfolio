
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const InstancedMesh = 'instancedMesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const Bubbles = ({ count = 40 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const { viewport, mouse } = useThree();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.004 + Math.random() * 0.008;
      const xFactor = -15 + Math.random() * 30;
      const yFactor = -15 + Math.random() * 30;
      const zFactor = -8 + Math.random() * 16;
      const baseScale = 0.03 + Math.random() * 0.05;
      temp.push({ t, speed, xFactor, yFactor, zFactor, baseScale });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Slight performance throttle for frame calculation
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      let { t, speed, xFactor, yFactor, zFactor, baseScale } = particle;
      particle.t += speed;
      const pTime = particle.t;
      
      let y = ((yFactor + pTime * 1.5) % 30) - 15;
      const x = xFactor + Math.sin(pTime) * 1.2;
      const z = zFactor + Math.cos(pTime * 0.4) * 1.2;
      
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      const dx = x - mouseX;
      const dy = y - mouseY;
      const dist = dx * dx + dy * dy; 
      
      if (dist < 12) { 
        const force = (12 - dist) / 12;
        const d = Math.sqrt(dist) || 0.001;
        dummy.position.set(x + (dx / d) * force * 1.2, y + (dy / d) * force * 1.2, z);
      } else {
        dummy.position.set(x, y, z);
      }
      
      const s = baseScale * (1 + Math.sin(pTime * 1.5) * 0.15);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <InstancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <SphereGeometry args={[1, 12, 12]} />
      <MeshStandardMaterial 
        transparent
        opacity={0.12}
        roughness={0.1}
        metalness={0.1}
        color="#ffffff"
        emissive="#6366f1"
        emissiveIntensity={0.05}
      />
    </InstancedMesh>
  );
};

const Scene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#02010a]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 60 }} 
        dpr={[1, 1.2]}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "high-performance",
          precision: "lowp"
        }}
      >
        <AmbientLight intensity={0.4} />
        <PointLight position={[8, 8, 8]} intensity={1} color="#6366f1" />
        <PointLight position={[-8, -8, -8]} intensity={0.5} color="#22d3ee" />
        <Bubbles count={40} />
      </Canvas>
    </div>
  );
};

export default Scene;
