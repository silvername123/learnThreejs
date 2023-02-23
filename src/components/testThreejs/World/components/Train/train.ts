import { Group, MathUtils, Mesh } from "three";
import { createMesh, type trainMod } from "./meshs";
const wheelSpeed = MathUtils.degToRad(24);

export default class Train extends Group {
  mesh: trainMod;
  constructor() {
    super();
    this.mesh = createMesh();
    this.add(
      this.mesh.cloud,
      this.mesh.cabin,
      this.mesh.bigWheel,
      this.mesh.chimney,
      this.mesh.nose,
      this.mesh.smallWheelCenter,
      this.mesh.smallWheelFront,
      this.mesh.smallWheelRear
    );
  }
  tick(delta: number) {
    this.mesh.bigWheel.rotation.y += wheelSpeed * delta;
    this.mesh.smallWheelCenter.rotation.y += wheelSpeed * delta;
    this.mesh.smallWheelFront.rotation.y += wheelSpeed * delta;
    this.mesh.smallWheelRear.rotation.y += wheelSpeed * delta;
  }
}
