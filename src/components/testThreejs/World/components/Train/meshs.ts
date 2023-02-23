import { Mesh, SphereGeometry } from "three";
import { createGeometry } from "./geometry";
import { createMaterial } from "./material";

export interface trainMod {
  cabin: Mesh;
  chimney: Mesh;
  nose: Mesh;
  smallWheelRear: Mesh;
  smallWheelCenter: Mesh;
  smallWheelFront: Mesh;
  bigWheel: Mesh;
  [key: string]: Mesh;
}
const createMesh = (): trainMod => {
  const geometries = createGeometry();
  const materials = createMaterial();
  const cloud = new Mesh(geometries.cloud, materials.body);
  cloud.position.set(0, 4, 0);
  const cabin = new Mesh(geometries.cabin, materials.body);
  cabin.position.set(1.5, 1.4, 0);

  const chimney = new Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 1.9, 0);

  const nose = new Mesh(geometries.nose, materials.body);
  nose.position.set(-1, 1, 0);
  nose.rotation.z = Math.PI / 2;

  const smallWheelRear = new Mesh(geometries.wheel, materials.detail);
  smallWheelRear.position.y = 0.5;
  smallWheelRear.rotation.x = Math.PI / 2;

  const smallWheelCenter = smallWheelRear.clone();
  smallWheelCenter.position.x = -1;

  const smallWheelFront = smallWheelRear.clone();
  smallWheelFront.position.x = -2;

  const bigWheel = smallWheelRear.clone();
  bigWheel.position.set(1.5, 0.9, 0);
  bigWheel.scale.set(2, 1.25, 2);
  return {
    cloud,
    cabin,
    chimney,
    nose,
    smallWheelRear,
    smallWheelCenter,
    smallWheelFront,
    bigWheel,
  };
};
export { createMesh };
