import * as THREE from "three";

export function centerModelToOrigin(
  root: THREE.Object3D,
  targetHeight = 2.5,
  gridY = 0
) {
  const box = new THREE.Box3().setFromObject(root);

  if (!isFinite(box.min.x)) return;

  const size = new THREE.Vector3();
  box.getSize(size);

  // height to targetHeight
  let scale = 1;
  if (targetHeight > 0 && size.y > 0) {
    scale = targetHeight / size.y;
    root.scale.setScalar(scale);

    // re-calculate
    box.setFromObject(root);
  }

  const center = new THREE.Vector3();
  box.getCenter(center);

  // XZ to center, Y is on the gridY (min.y)
  const offset = new THREE.Vector3(
    -center.x,
    gridY - box.min.y,
    -center.z
  );

  root.position.add(offset);
}
