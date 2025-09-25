import {
    Scene,
    Color,
    PerspectiveCamera,
    WebGLRenderer,
} from 'three';

export function createScene() {
  const scene = new Scene();
  scene.background = new Color('black');
  return scene;
}

export function createCamera(width: number, height: number) {
  const camera = new PerspectiveCamera(75, width / height, 0.1, 100);
  camera.position.set(0, 1.5, 6);
  return camera;
}

export function createRenderer(container: HTMLElement) {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  return renderer;
}