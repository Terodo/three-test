import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three';

export function createCube() {
  const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({ color: 0x7f7fff })
  );
  cube.position.set(0, 0.5, 0);
  return cube;
}