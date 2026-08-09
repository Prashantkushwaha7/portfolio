import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const badgeItems = [
  { label: 'Java', pos: [-2.8, 2.2, 0.5], delay: 0, color: '#38bdf8' },
  { label: 'React', pos: [2.9, 2.5, 0.4], delay: 1.5, color: '#60a5fa' },
  { label: 'AI · IoT', pos: [-2.5, 0.4, 1.2], delay: 3.0, color: '#c084fc' },
  { label: '</dev>', pos: [2.6, 0.5, 1.3], delay: 4.5, color: '#34d399' },
];

const FloatingBadge = ({ label, pos, delay, color }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() + delay;
    groupRef.current.position.y = pos[1] + Math.sin(t * 1.8) * 0.12;
    groupRef.current.position.x = pos[0] + Math.cos(t * 1.2) * 0.05;
  });

  return (
    <group ref={groupRef} position={pos}>
      <Html
        transform
        distanceFactor={4}
        style={{
          background: 'rgba(15, 17, 35, 0.85)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${color}66`,
          boxShadow: `0 0 15px ${color}33`,
          borderRadius: '20px',
          padding: '6px 16px',
          color: '#ffffff',
          fontFamily: "'Space Grotesk', monospace",
          fontSize: '13px',
          fontWeight: '600',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <span style={{ color }}>●</span> {label}
      </Html>
    </group>
  );
};

const FloatingObjects = () => {
  return (
    <group>
      {badgeItems.map((badge, idx) => (
        <FloatingBadge key={idx} {...badge} />
      ))}
    </group>
  );
};

export default FloatingObjects;
