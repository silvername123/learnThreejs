import { BoxGeometry, CylinderGeometry, SphereGeometry } from "three";
// 创建几何体
const createGeometry = () => {
  const testBox = new BoxGeometry(1, 1, 1);
  const cabin = new BoxGeometry(2, 2.25, 1.5);
  const nose = new CylinderGeometry(0.75, 0.75, 3, 12);
  const cloud = new SphereGeometry();
  // we can reuse a single cylinder geometry for all 4 wheels
  const wheel = new CylinderGeometry(0.4, 0.4, 1.75, 16);

  // different values for the top and bottom radius creates a cone shape
  const chimney = new CylinderGeometry(0.3, 0.1, 0.5);
  return {
    cloud,
    testBox,
    cabin,
    nose,
    wheel,
    chimney,
  };
};

export { createGeometry };
