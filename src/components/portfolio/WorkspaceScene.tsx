import { Float, Line, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";

function Workstation({ reducedMotion, compact }: { reducedMotion: boolean; compact: boolean }) {
  const rig = useRef<Group>(null);
  const screenMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#6d41a8", emissive: "#35145f", emissiveIntensity: 0.7, metalness: 0.42, roughness: 0.3 }),
    [],
  );
  const metalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#17151d", metalness: 0.86, roughness: 0.25 }),
    [],
  );

  useFrame(({ pointer, clock }) => {
    if (!rig.current) return;
    const targetX = reducedMotion ? 0 : pointer.y * 0.12;
    const targetY = reducedMotion ? -0.2 : -0.2 + pointer.x * 0.18;
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, targetX, 0.025);
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, targetY, 0.025);
    if (!reducedMotion) rig.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 0.035;
  });

  return (
    <group ref={rig} position={compact ? [1.7, 1.45, -1.7] : [1.95, 0.05, -0.65]} scale={compact ? 0.52 : 0.78} rotation={[0, -0.2, 0]}>
      <RoundedBox args={[3.8, 2.25, 0.16]} radius={0.08} smoothness={4} position={[0, 0.35, 0]} material={metalMaterial} />
      <RoundedBox args={[3.52, 1.97, 0.05]} radius={0.05} smoothness={4} position={[0, 0.35, 0.11]} material={screenMaterial} />
      <mesh position={[0, -1.02, 0]} material={metalMaterial}><boxGeometry args={[0.22, 0.75, 0.18]} /></mesh>
      <mesh position={[0, -1.42, 0]} material={metalMaterial}><boxGeometry args={[1.45, 0.09, 0.55]} /></mesh>
      <Line points={[[-1.35, 0.76, 0.15], [-0.7, 0.76, 0.15], [-0.2, 0.2, 0.15], [0.5, 0.2, 0.15]]} color="#f4efff" lineWidth={1.1} transparent opacity={0.7} />
      <Line points={[[-1.35, 0.38, 0.15], [-0.85, 0.38, 0.15], [-0.55, -0.08, 0.15], [0.15, -0.08, 0.15], [0.65, -0.55, 0.15], [1.35, -0.55, 0.15]]} color="#d8c5ff" lineWidth={0.7} transparent opacity={0.52} />
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[-2.25, 1.35, 0.2]}><octahedronGeometry args={[0.34]} /><meshStandardMaterial color="#8d5bea" emissive="#5b21b6" emissiveIntensity={1.6} wireframe /></mesh>
      </Float>
      <Float speed={reducedMotion ? 0 : 0.9} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh position={[2.2, -0.7, 0.3]}><torusGeometry args={[0.42, 0.055, 12, 40]} /><meshStandardMaterial color="#cbb8f5" emissive="#6d3bc4" emissiveIntensity={0.9} /></mesh>
      </Float>
    </group>
  );
}

function ScrollCamera({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera } = useThree();
  useFrame(() => {
    if (reducedMotion) return;
    const progress = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -progress * 1.1, 0.035);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(progress * Math.PI * 2) * 0.32, 0.035);
    camera.lookAt(0.25, -progress * 0.45, 0);
  });
  return null;
}

export default function WorkspaceScene({ reducedMotion = false, compact = false }: { reducedMotion?: boolean; compact?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.2], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.28} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#f6f1ff" />
        <pointLight position={[1, 0, 2.8]} intensity={compact ? 7 : 11} distance={9} color="#8b5cf6" />
        <pointLight position={[-4, -2, 1]} intensity={7} distance={8} color="#c6d9ff" />
        <Workstation reducedMotion={reducedMotion} compact={compact} />
        <Sparkles count={reducedMotion ? 18 : compact ? 24 : 52} scale={[9, 6, 4]} size={1.4} speed={reducedMotion ? 0 : 0.16} opacity={0.32} color="#c9b4f4" />
        <ScrollCamera reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
