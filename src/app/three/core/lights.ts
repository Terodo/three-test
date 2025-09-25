import { DirectionalLight, Scene } from 'three';

export function addDefaultLight(scene: Scene) {
  const light = new DirectionalLight(0xffffff, 2);
  light.position.set(3, 5, 8);
  scene.add(light);
  return light;
}