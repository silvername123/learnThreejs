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
import { computed, onMounted, ref } from "vue";
import { World } from "../testThreejs/World/World";
import ThreeJs from "./index";
import TestTexture from "./index2";
const test = new TestTexture();
const length = ref();
const com = computed(() => length);
onMounted(() => {
  // const container = document.getElementById("test");
  // const world = new World(container);
  // world.start();
  test.init();
  // console.log(test.getThings());
});
</script>
<template>
  <div style="display: flex">
    <div id="test"></div>
    <div style="width: 20px">
      <button
        @click="
          () => {
            test.setControlsPosition(1);
          }
        "
      >
        1
      </button>
      <button
        @click="
          () => {
            test.setControlsPosition(2);
          }
        "
      >
        2
      </button>
      <button
        @click="
          () => {
            test.setControlsPosition(0);
          }
        "
      >
        3
      </button>
    </div>
  </div>
</template>
