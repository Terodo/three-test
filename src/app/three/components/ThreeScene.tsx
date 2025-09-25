'use client';
import React, { useRef, useCallback } from 'react';
import { createScene, createCamera, createRenderer } from '@/app/three/core/scene';
import { addOrbitControls } from '@/app/three/core/controls';
import { addDefaultLight } from '@/app/three/core/lights';
import { addResizeHandler } from '@/app/three/core/resize';
import { startAnimationLoop } from '@/app/three/core/animation';
import { createCube } from '@/app/three/objects/cube';
import { loadModels } from '@/app/three/loaders/gltf';

export default function ThreeScene() {
  const cleanupRef = useRef<() => void | null>(null);

  const setRef = useCallback((container: HTMLDivElement | null) => {
    if (!container) { cleanupRef.current?.(); return; }

    const scene = createScene();
    const camera = createCamera(container.clientWidth, container.clientHeight);
    const renderer = createRenderer(container);
    const controls = addOrbitControls(camera, renderer);
    addDefaultLight(scene);

    const cube = createCube();
    scene.add(cube);

    // Mehrere Modelle definieren und laden
    loadModels(scene, [
      { url: '/models/Test.glb', position: [4, 0, -2], scale: 0.3 },
    ]);

    const stopAnim = startAnimationLoop(() => {
      cube.rotation.y += 0.01;
      controls.update();
    }, scene, camera, renderer);

    const removeResize = addResizeHandler(container, camera, renderer);

    cleanupRef.current = () => {
      stopAnim();
      removeResize();
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={setRef} className="size-1/2 absolute" />;
}
