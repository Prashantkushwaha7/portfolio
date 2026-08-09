import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Computer from './Computer';

const DeveloperDesk = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Organic subtle floating motion
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.03;

    // Strict sub-2 degree mouse parallax follow (max ~0.035 rad)
    const targetRotX = -state.pointer.y * 0.03;
    const targetRotY = state.pointer.x * 0.035;

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * (delta * 2.5);
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * (delta * 2.5);
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Studio Lighting Rig */}
      <ambientLight intensity={0.65} color="#1e1b4b" />
      <directionalLight position={[6, 9, 7]} intensity={1.2} color="#ffffff" castShadow />
      
      {/* Cinematic Studio Point Lights */}
      <pointLight position={[-5, 4, 3]} color="#8b5cf6" intensity={2.2} distance={10} />
      <pointLight position={[5, 3, 4]} color="#06b6d4" intensity={2.0} distance={10} />
      <pointLight position={[0, 5, -3]} color="#3b82f6" intensity={1.6} distance={8} />

      {/* ==================================================
          PHYSICAL DESK STRUCTURE (EXTENDS UNDER ALL HARDWARE)
          ================================================== */}
      <group position={[0, -0.52, 0]}>
        {/* Wide Physical Desk Top Surface */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[9.2, 0.16, 4.2]} />
          <meshStandardMaterial color="#0a0c18" roughness={0.35} metalness={0.65} />
        </mesh>

        {/* Desk Front Edge Highlight */}
        <mesh position={[0, 0, 2.11]}>
          <boxGeometry args={[9.22, 0.14, 0.02]} />
          <meshStandardMaterial color="#1a1d33" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Underside Purple LED Glow Strip */}
        <mesh position={[0, -0.09, 0]}>
          <boxGeometry args={[9.25, 0.02, 4.25]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.75} />
        </mesh>

        {/* Left Desk Leg */}
        <mesh position={[-4.2, -1.5, 0]} castShadow>
          <boxGeometry args={[0.2, 2.9, 3.8]} />
          <meshStandardMaterial color="#070914" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* Right Desk Leg */}
        <mesh position={[4.2, -1.5, 0]} castShadow>
          <boxGeometry args={[0.2, 2.9, 3.8]} />
          <meshStandardMaterial color="#070914" roughness={0.5} metalness={0.7} />
        </mesh>
      </group>

      {/* Complete Hardware Setup Sitting On Desk */}
      <Computer />
    </group>
  );
};

export default DeveloperDesk;
