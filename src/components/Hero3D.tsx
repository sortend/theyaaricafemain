import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// A simple placeholder 3D coffee cup model – using a public GLTF URL (replace with your own asset).
function CoffeeCup() {
  const { scene } = useGLTF('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/Flamingo.glb'); // placeholder model
  return <primitive object={scene} scale={0.8} />;
}

export default function Hero3D() {
  return (
    <div className="relative h-[500px] w-full">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <Suspense fallback={
          <Html center>
            <div className="text-gray-600">Loading 3‑D scene…</div>
          </Html>
        }>
          <CoffeeCup />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}
