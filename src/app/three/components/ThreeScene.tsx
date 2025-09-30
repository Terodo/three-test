'use client';
import React, { useRef, useCallback } from 'react';
import { AnimationMixer, Clock } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { createScene, createCamera, createRenderer } from '@/app/three/core/scene';
import { addOrbitControls } from '@/app/three/core/controls';
import { addDefaultLight } from '@/app/three/core/lights';
import { addResizeHandler } from '@/app/three/core/resize';
import { startAnimationLoop } from '@/app/three/core/animation';

export default function ThreeScene() {
  const cleanupRef = useRef<() => void | null>(null);

  const setRef = useCallback((container: HTMLDivElement | null) => {
    if (!container) { cleanupRef.current?.(); return; }

    const scene = createScene();
    const camera = createCamera(container.clientWidth, container.clientHeight);
    const renderer = createRenderer(container);
    const controls = addOrbitControls(camera, renderer);
    addDefaultLight(scene);

    const loader = new GLTFLoader();
    let mixer: AnimationMixer;
    const clock = new Clock();

    // refactor loadModels function so I can pass in a custom function that is called in the onLoad callback
    loader.load('/models/machine.glb', (gltf) => {
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.scale.set(1, 1, 1);
      mixer = new AnimationMixer(gltf.scene);
      mixer.clipAction(gltf.animations[0]).play();

      scene.add(gltf.scene);
    })

    const stopAnim = startAnimationLoop(() => {
      controls.update();
      const delta = clock.getDelta();
      mixer?.update(delta);
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
