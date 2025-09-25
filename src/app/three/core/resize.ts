import { PerspectiveCamera, WebGLRenderer } from 'three';

export function addResizeHandler(
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) {
  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}