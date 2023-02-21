<script lang="ts" setup>
import {
  BoxGeometry,
  DirectionalLight,
  Material,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { onMounted, ref } from "vue";

const material = ref(new MeshStandardMaterial({ color: "red" }));
const geometry = ref(new BoxGeometry(2, 2, 2));
const camera = ref(new PerspectiveCamera());

const light = ref(new DirectionalLight());
const cube = ref(new Mesh(geometry.value, material.value));
const scene = ref(new Scene());
const renderer = ref(new WebGLRenderer());
const select = ref(document.getElementById("test"));
const init = () => {
  scene.value.add(camera.value, light.value, cube.value);
  renderer.value.setSize(800, 900);
  //   //   light.value.position.set(10, 10, 10);
  //   //   camera.value.position.set(0, 0, 10);
};
onMounted(() => {
  init();
  //   select.value?.append(renderer.value.domElement);
  renderer.value.render(scene.value, camera.value);
});
</script>
<template>
  <div id="test"></div>
</template>
