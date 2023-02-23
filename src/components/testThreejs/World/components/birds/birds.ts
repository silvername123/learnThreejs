import type { Mesh, Object3D } from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
const loadBirds = async () => {
  const loader = new GLTFLoader();
  //   const parrotData = await loader.loadAsync("/src/assets/Parrot.glb");
  //   console.log(parrotData);
  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync("/src/assets/Parrot.glb"),
    loader.loadAsync("/src/assets/Flamingo.glb"),
    loader.loadAsync("/src/assets/Stork.glb"),
  ]);
  const parrotDataMesh = getModel(parrotData);
  const flamingoDataMesh = getModel(flamingoData);
  const storkDataMesh = getModel(storkData);
  parrotDataMesh.position.set(0, 5, -5);
  flamingoDataMesh.position.set(-2, 5, 0);
  storkDataMesh.position.set(2, 5, 0);
  //   parrotDataMesh.position.set()
  return {
    parrotDataMesh,
    flamingoDataMesh,
    storkDataMesh,
  };
};
const getModel = (data: GLTF): Object3D => {
  return data.scene.children[0];
};
export { loadBirds };
