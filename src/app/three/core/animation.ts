import { Clock, Scene, PerspectiveCamera, WebGLRenderer } from 'three';

export function startAnimationLoop(
  renderFn: (delta: number) => void,
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) {
  const clock = new Clock();
  let stopped = false;

  function loop() {
    if (stopped) return;
    const delta = clock.getDelta();
    renderFn(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  loop();

  return () => { stopped = true; };
}