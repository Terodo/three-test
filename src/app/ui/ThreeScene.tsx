'use client'
import React, { useRef, useCallback } from 'react';
import {
    Scene,
    BoxGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    WebGLRenderer,
} from "three";

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    let animationId: number | null = null;
    if (node) {
      const scene = new Scene();
      const camera = new PerspectiveCamera(75, node.clientWidth / node.clientHeight, 0.1, 1000);
      const renderer = new WebGLRenderer();
      scene.background = new Color('skyblue');
      renderer.setSize(node.clientWidth, node.clientHeight);
      node.appendChild(renderer.domElement);
      camera.position.z = 5;

      const geometry = new BoxGeometry();
      const material = new MeshBasicMaterial({ color: new Color('white'), wireframe: true });
      const cube = new Mesh(geometry, material);
      scene.add(cube);

      // Animationsfunktion
      const animate = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };
      animate();

      cleanupRef.current = () => {
        if (animationId !== null) {
          cancelAnimationFrame(animationId);
        }
        renderer.dispose();
        node.removeChild(renderer.domElement);
      };
    } else if (mountRef.current && cleanupRef.current) {
      cleanupRef.current();
    }
    mountRef.current = node;
  }, []);

  return <div ref={setRef} className="w-3xl h-[48rem] absolute" />;
}
