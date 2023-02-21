<script lang="ts" setup>
import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  Scene,
  WebGLRenderer,
} from "three";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { onMounted, render } from "vue";
const setSize = (container: any, camera: any, renderer: any) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};
const initRender = () => {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial({ color: "red" });
  const mesh = new Mesh(geometry, material);
  //   mesh.rotation.set(-0.5, -0.1, 0.9);

  const light = new DirectionalLight("white", 8);
  light.position.set(10, 10, 10);

  const scene = new Scene();
  scene.background = new Color("skyblue");
  scene.add(light, mesh);

  const renderer = new WebGLRenderer();
  renderer.physicallyCorrectLights = true;

  const container = document.getElementById("cube");
  //   setSize(container, camera, renderer);
  renderer.setSize(800, 900);
  renderer.render(scene, camera);

  console.log(container);
  container?.append(renderer.domElement);
  renderer.setAnimationLoop(() => {
    // mesh.rotation.z = mesh.rotation.z + 0.01;
    mesh.rotation.y = mesh.rotation.y + 0.01;
    renderer.render(scene, camera);
  });
};
onMounted(() => {
  initRender();
});
</script>
<template>
  <div :style="{ width: '800px', height: '900px' }">
    <div id="cube" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>
