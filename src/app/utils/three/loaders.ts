import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { Group } from 'three';

export type ModelSpec = {
  url: string;                         // z.B. "/models/shiba/scene.gltf"
  position?: [number, number, number]; // default [0,0,0]
  rotation?: [number, number, number]; // in Radiant
  scale?: number | [number, number, number]; // default 1
};

const loader = new GLTFLoader();

// optional: sehr simples Cache, damit derselbe Pfad nicht mehrfach geladen wird
const cache = new Map<string, Promise<Group>>();

export async function loadModel(spec: ModelSpec): Promise<Group> {
  const { url, position=[0,0,0], rotation=[0,0,0], scale=1 } = spec;

  const p = cache.get(url) ?? loader.loadAsync(url).then(g => g.scene);
  cache.set(url, p);

  const scene = await p;
  scene.position.set(...position);
  scene.rotation.set(...rotation);
  if (typeof scale === 'number') scene.scale.setScalar(scale);
  else scene.scale.set(...scale);

  return scene.clone(true); // clone: falls dasselbe Asset mehrfach platziert wird
}