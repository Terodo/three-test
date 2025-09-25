import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { Group, Scene } from 'three';

export type ModelSpec = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
};

const loader = new GLTFLoader();
const cache = new Map<string, Promise<Group>>();

export async function loadModel(spec: ModelSpec): Promise<Group> {
  const { url, position=[0,0,0], rotation=[0,0,0], scale=1 } = spec;
  const promise = cache.get(url) ?? loader.loadAsync(url).then(g => g.scene);
  cache.set(url, promise);
  const model = await promise;
  model.position.set(...position);
  model.rotation.set(...rotation);
  typeof scale === 'number' ? model.scale.setScalar(scale) : model.scale.set(...scale);
  return model.clone(true);
}

export async function loadModels(scene: Scene, specs: ModelSpec[]) {
  const models = await Promise.all(specs.map(loadModel));
  models.forEach(m => scene.add(m));
}