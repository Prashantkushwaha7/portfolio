import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const Computer = () => {
  const fan1Ref = useRef();
  const fan2Ref = useRef();
  const screenGlowRef = useRef();

  useFrame((state, delta) => {
    if (fan1Ref.current) fan1Ref.current.rotation.z += delta * 4;
    if (fan2Ref.current) fan2Ref.current.rotation.z += delta * 4;
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity = 1.4 + Math.sin(state.clock.elapsedTime * 2) * 0.25;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ==================================================
          1. WIDESCREEN MONITOR & STAND (SITTING ON DESK)
          ================================================== */}
      <group position={[0, 1.45, -0.6]}>
        {/* Monitor Bezel Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.8, 2.7, 0.12]} />
          <meshStandardMaterial color="#0c0e1b" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Back Frame Purple Neon Glow Strip */}
        <mesh position={[0, 0, -0.07]}>
          <boxGeometry args={[4.86, 2.76, 0.02]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.7} />
        </mesh>

        {/* Monitor Glass Display Surface */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[4.6, 2.5]} />
          <meshBasicMaterial color="#050712" />
        </mesh>

        {/* Code Editor HTML Screen Content */}
        <Html
          transform
          wrapperClass="code-screen-wrapper"
          distanceFactor={3.2}
          position={[0, 0, 0.08]}
          style={{
            width: '680px',
            height: '375px',
            background: 'rgba(6, 8, 20, 0.96)',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '10px',
            padding: '18px',
            fontFamily: "'Space Grotesk', monospace",
            fontSize: '13px',
            color: '#e2e8f0',
            boxShadow: 'inset 0 0 30px rgba(139, 92, 246, 0.2)',
            overflow: 'hidden',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
            <span style={{ marginLeft: '12px', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
              developer.js — Prashant Workspace
            </span>
          </div>

          <pre style={{ margin: 0, lineHeight: '1.6', fontFamily: 'monospace', fontSize: '13px' }}>
            <span style={{ color: '#c084fc' }}>const</span> <span style={{ color: '#60a5fa' }}>developer</span> = &#123;{'\n'}
            {'  '}<span style={{ color: '#f472b6' }}>name</span>: <span style={{ color: '#34d399' }}>"Prashant"</span>,{'\n'}
            {'  '}<span style={{ color: '#f472b6' }}>role</span>: <span style={{ color: '#34d399' }}>"Full Stack Developer"</span>,{'\n'}
            {'  '}<span style={{ color: '#f472b6' }}>skills</span>: [<span style={{ color: '#38bdf8' }}>"Java"</span>, <span style={{ color: '#38bdf8' }}>"React"</span>, <span style={{ color: '#38bdf8' }}>"AI"</span>, <span style={{ color: '#38bdf8' }}>"IoT"</span>]{'\n'}
            &#125;;{'\n\n'}
            <span style={{ color: '#60a5fa' }}>console</span>.<span style={{ color: '#facc15' }}>log</span>(<span style={{ color: '#38bdf8' }}>"Welcome to Prashant's portfolio"</span>);
          </pre>
        </Html>

        {/* Screen Emitted Ambient Point Light */}
        <pointLight
          ref={screenGlowRef}
          position={[0, 0, 0.6]}
          color="#38bdf8"
          intensity={1.4}
          distance={4.5}
        />

        {/* Monitor Stand Vertical Arm */}
        <mesh position={[0, -1.45, -0.1]}>
          <boxGeometry args={[0.35, 0.9, 0.16]} />
          <meshStandardMaterial color="#16182a" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Monitor Stand Heavy Metal Base (Sitting on Desk) */}
        <mesh position={[0, -1.88, 0]}>
          <boxGeometry args={[1.8, 0.06, 0.95]} />
          <meshStandardMaterial color="#0c0e1b" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* ==================================================
          2. LEFT STUDIO SPEAKER (WITH CYAN RGB DRIVER RING)
          ================================================== */}
      <group position={[-3.2, 0.6, -0.4]}>
        {/* Speaker Enclosure Cabinet */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.65, 1.2, 0.65]} />
          <meshStandardMaterial color="#0c0e1b" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Speaker Top Tweeter */}
        <mesh position={[0, 0.28, 0.33]}>
          <ringGeometry args={[0.04, 0.08, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Speaker Main Woofer Cyan RGB Ring */}
        <mesh position={[0, -0.15, 0.33]}>
          <ringGeometry args={[0.09, 0.18, 20]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        <pointLight position={[0, -0.15, 0.4]} color="#06b6d4" intensity={1.2} distance={1.5} />
      </group>

      {/* ==================================================
          3. RIGHT STUDIO SPEAKER (WITH PURPLE RGB DRIVER RING)
          ================================================== */}
      <group position={[1.85, 0.6, -0.9]}>
        {/* Speaker Enclosure Cabinet */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.65, 1.2, 0.65]} />
          <meshStandardMaterial color="#0c0e1b" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Speaker Top Tweeter */}
        <mesh position={[0, 0.28, 0.33]}>
          <ringGeometry args={[0.04, 0.08, 16]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
        {/* Speaker Main Woofer Purple RGB Ring */}
        <mesh position={[0, -0.15, 0.33]}>
          <ringGeometry args={[0.09, 0.18, 20]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
        <pointLight position={[0, -0.15, 0.4]} color="#8b5cf6" intensity={1.2} distance={1.5} />
      </group>

      {/* ==================================================
          4. DESKTOP PC TOWER (WITH 2 ROTATING RGB FANS)
          ================================================== */}
      <group position={[3.3, 1.05, -0.2]}>
        {/* PC Main Chassis */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 2.1, 1.85]} />
          <meshStandardMaterial color="#0a0c18" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Dark Tempered Glass Side Window Panel */}
        <mesh position={[-0.61, 0, 0]}>
          <boxGeometry args={[0.02, 2.0, 1.75]} />
          <meshStandardMaterial color="#1e1b4b" transparent opacity={0.35} metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Top Front Cyan RGB Cooling Fan */}
        <group position={[-0.58, 0.48, 0.45]}>
          <mesh ref={fan1Ref}>
            <ringGeometry args={[0.12, 0.32, 8]} />
            <meshBasicMaterial color="#06b6d4" wireframe />
          </mesh>
          <pointLight color="#06b6d4" intensity={1.6} distance={2.0} />
        </group>

        {/* Bottom Front Purple RGB Cooling Fan */}
        <group position={[-0.58, -0.48, 0.45]}>
          <mesh ref={fan2Ref}>
            <ringGeometry args={[0.12, 0.32, 8]} />
            <meshBasicMaterial color="#8b5cf6" wireframe />
          </mesh>
          <pointLight color="#8b5cf6" intensity={1.6} distance={2.0} />
        </group>
      </group>

      {/* ==================================================
          5. MECHANICAL RGB KEYBOARD (SITTING ON DESK)
          ================================================== */}
      <group position={[-0.3, -0.45, 0.8]} rotation={[-0.04, 0, 0]}>
        {/* Keyboard Chassis */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.7, 0.08, 0.88]} />
          <meshStandardMaterial color="#121426" roughness={0.4} />
        </mesh>

        {/* Keyboard Keycap Surface */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[2.6, 0.03, 0.78]} />
          <meshStandardMaterial color="#1c1f36" roughness={0.5} />
        </mesh>

        {/* RGB Underglow LED Strip */}
        <mesh position={[0, -0.03, 0]}>
          <boxGeometry args={[2.75, 0.02, 0.93]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.85} />
        </mesh>
        <pointLight position={[0, 0.1, 0]} color="#8b5cf6" intensity={1.0} distance={2.2} />
      </group>

      {/* ==================================================
          6. ERGONOMIC MOUSE (SITTING BESIDE KEYBOARD)
          ================================================== */}
      <group position={[1.65, -0.45, 0.88]}>
        {/* Mouse Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.1, 0.52]} />
          <meshStandardMaterial color="#14172a" roughness={0.3} />
        </mesh>

        {/* Mouse Scroll Wheel Cyan Stripe */}
        <mesh position={[0, 0.055, -0.05]}>
          <boxGeometry args={[0.05, 0.015, 0.22]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        <pointLight position={[0, 0.1, 0]} color="#06b6d4" intensity={0.8} distance={1.2} />
      </group>
    </group>
  );
};

export default Computer;
