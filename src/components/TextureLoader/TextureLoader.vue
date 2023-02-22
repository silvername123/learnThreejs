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
import { World } from "../testThreejs/World/World";
import ThreeJs from "./index";
import TestTexture from "./index2";
onMounted(() => {
  // const container = document.getElementById("test");
  // const world = new World(container);
  // world.start();
  new TestTexture();
});
</script>
<template>
  <div id="test"></div>
</template>
