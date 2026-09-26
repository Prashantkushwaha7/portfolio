import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const badgeItems = [
  { label: 'Java', pos: [-3.3, 2.3, 0.2], delay: 0, color: '#38bdf8' },
  { label: 'React', pos: [3.3, 2.4, 0.2], delay: 1.2, color: '#06b6d4' },
  { label: 'Spring Boot', pos: [-3.4, 0.8, 0.6], delay: 2.4, color: '#84cc16' },
  { label: 'Node.js', pos: [3.4, 0.9, 0.5], delay: 3.6, color: '#22c55e' },
  { label: 'AI & Neural Nets', pos: [-2.4, 3.2, -0.2], delay: 1.8, color: '#a855f7' },
  { label: 'IoT · ESP32', pos: [2.4, 3.3, -0.2], delay: 4.2, color: '#ec4899' },
  { label: 'MongoDB · MySQL', pos: [-2.9, -0.5, 0.9], delay: 0.8, color: '#10b981' },
  { label: 'Git / GitHub', pos: [2.9, -0.5, 0.9], delay: 2.8, color: '#818cf8' },
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
