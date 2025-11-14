import * as THREE from "three";

export function centerModelToOrigin(object: THREE.Object3D, desiredSize = 2.5) {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  box.getCenter(center);
  box.getSize(size);

  object.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = desiredSize / maxDim;
  object.scale.setScalar(scale);

  return { center, size, scale };
}
