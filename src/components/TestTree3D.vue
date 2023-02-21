<script lang="ts" setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted, ref, render } from "vue";
const data = ref();

const failInit = () => {
  const width = 800; //宽度
  const height = 500; //高度
  // 创建3d场景
  const scene = new THREE.Scene();
  //创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  //创建一个材质对象Material 不可由光源反射
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000, //0xff0000设置材质颜色为红色
  });
  const materialLash = new THREE.MeshLambertMaterial({
    color: 0xff0000,
  });
  //点光源：两个参数分别表示光源颜色和光照强度
  // 参数1：0xffffff是纯白光,表示光源颜色
  // 参数2：1.0,表示光照强度，可以根据需要调整
  const pointLight = new THREE.PointLight(0xffffff, 1.0);
  const SpotLight = new THREE.SpotLight(0xffffff, 1.0);
  //点光源位置
  //   pointLight.position.set(400, 0, 0); //点光源放在x轴上
  //   pointLight.position.set(100, 60, 50);
  //   scene.add(pointLight);
  SpotLight.position.set(100, 60, 50);
  scene.add(SpotLight);
  // 两个参数分别为几何体geometry、材质material 网络模型
  const mesh = new THREE.Mesh(geometry, materialLash); //网格模型对象Mesh
  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 10, 0);
  scene.add(mesh);
  // 实例化一个透视投影相机对象
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  //相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(200, 200, 200);
  //相机观察目标指向Threejs 3D空间中某个位置
  // camera.lookAt(0, 10, 0); //y轴上位置10
  camera.lookAt(mesh.position); //指向mesh对应的位置

  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  // document.body.appendChild(renderer.domElement);
  console.log(renderer.domElement);
  document.getElementById("webgl")?.appendChild(renderer.domElement);

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener("change", function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件
};
const lineInit = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(200, 200);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const scene = new THREE.Scene();
  const line = new THREE.Line(geometry);
  scene.add(line);
  renderer.render(scene, camera);
  console.log(renderer.domElement);
  const doc = document.getElementById("webgl");
  console.log(doc);
  doc?.appendChild(renderer.domElement);
};
onMounted(() => {
  failInit();
});
</script>
<template>
  <!-- <div class="first"></div> -->
  <div id="webgl"></div>
</template>
<style lang="css" scoped>
#webgl {
  width: 900px;
  height: 900px;
  /* background-color: black; */
}
</style>
