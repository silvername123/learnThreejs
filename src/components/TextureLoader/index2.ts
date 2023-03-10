import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Clock,
  Color,
  DirectionalLight,
  GridHelper,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadBirds } from "../testThreejs/World/components/birds/birds";
import Train from "../testThreejs/World/components/Train/train";

export default class TestTexture {
  scene: Scene | null = null;
  camera: PerspectiveCamera | null = null;
  renderer: WebGLRenderer | null = null;
  mesh: Mesh | null = null;
  controls: OrbitControls | null = null;
  update: any[] | undefined;
  group: Group | null = null;
  radiansPerSecond = MathUtils.degToRad(30);
  train: Train | undefined;
  things: Object3D[] | null = null;
  constructor() {
    this.things = [];
    // this.init();
    // this.getThings();
  }
  getThings(): any {
    return this.things;
  }
  setThings(data: any) {
    this.things?.push(data);
  }
  setCamera(): void {
    this.camera = new PerspectiveCamera(35, 1, 0.1, 100);
    this.camera.position.set(0, 0, 10);
  }
  setGroup(): void {
    this.group = new Group();
    // const group = new Group();
    const geometry = new SphereGeometry(0.25, 16, 16);
    const material = new MeshStandardMaterial({ color: "indigo" });
    // const mesh = new Mesh(geometry, material);
    this.mesh = new Mesh(geometry, material);

    this.group.add(this.mesh);
    for (let i = 0; i < 1; i += 0.05) {
      const temp = this.mesh.clone();
      temp.position.x = Math.cos(2 * Math.PI * i);
      temp.position.y = Math.sin(2 * Math.PI * i);
      temp.scale.multiplyScalar(0.01 + i);
      this.group.add(temp);
    }
    this.group.scale.multiplyScalar(2);
    this.scene?.add(this.group);
    // this.render();
  }
  setMesh(): void {
    const material = new MeshStandardMaterial();
    const geometry = new BoxGeometry(2, 2, 2);
    const texture = new TextureLoader();
    material.map = texture.load("/src/assets/wenli.png");
    this.mesh = new Mesh(geometry, material);
    // this.mesh.rotation.set(-0.5, -0.1, 0.9);
    // this.render();
  }
  setTrainGroup(): void {
    this.train = new Train();
    const trainGroup = new Group();
    trainGroup.add(this.train);
    for (let i = 0.1; i <= 1; i += 0.1) {
      const cloneTrain = this.train.clone();
      cloneTrain.position.x = i * 20;
      trainGroup.add(cloneTrain);
    }
    this.scene?.add(trainGroup);
  }
  setTrain(): void {
    this.train = new Train();
    // const cloneTrain = this.train.clone();
    // cloneTrain.position.set(0, 0, 5);
    // this.scene?.add(this.train, cloneTrain);
    this.scene?.add(this.train);
  }
  setRenderer(): void {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(1000, 900);
    this.renderer.physicallyCorrectLights = true;
    document.getElementById("test")?.append(this.renderer.domElement);
  }
  render(): void {
    if (this.scene && this.camera)
      this.renderer?.render(this.scene, this.camera);
  }
  setScene(): void {
    const environmentLight = new AmbientLight("red", 2);
    const hemisphereLight = new HemisphereLight("pick", "darkslategrey", 5);
    const light = new DirectionalLight("white", 8);
    light.position.set(10, 10, 10);
    this.scene = new Scene();
    // this.scene.add(environmentLight);
    this.scene.add(hemisphereLight);
    this.scene.add(light);
    this.scene.background = new Color("skyblue");
  }
  setControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement): void {
    this.controls = new OrbitControls(camera, canvas);
    // ??????????????????
    // this.controls.target.set(1, 2, 3);
    // this.controls.autoRotate = true;
    // this.controls.autoRotateSpeed = 1;
    this.controls.enableDamping = true;
    // this.controls.addEventListener("change", () => {
    //   this.render();
    // });
  }
  renderControls(): void {
    if (this.camera && this.renderer) {
      this.setControls(this.camera, this.renderer?.domElement);
    }
  }
  setNet(): void {
    const helper = new AxesHelper(3);
    helper.position.set(-3.5, 0, -3.5);
    this.scene?.add(helper);
    const ghelper = new GridHelper(6, 20);
    this.scene?.add(ghelper);
  }
  async setBirds(): Promise<void> {
    const data = await loadBirds();
    const parrotData = data.parrotDataMesh;
    const flamingoData = data.flamingoDataMesh;
    const storkData = data.storkDataMesh;
    // this.setThings(parrotData);
    this.things?.push(parrotData, flamingoData, storkData);
    this.controls?.target.copy(flamingoData.position);

    this.scene?.add(parrotData, flamingoData, storkData);
  }
  setControlsPosition = (index: number) => {
    if (this.things) {
      if (index >= this.things?.length) {
        const temp = new Vector3(10, 10, 10);
        this.controls?.target.copy(temp);
      } else {
        if (this.things.length > 0)
          this.controls?.target.copy(this.things[index].position);
      }
    }
  };
  init(): void {
    this.setCamera();
    this.setScene();
    this.setRenderer();
    this.setNet();
    // this.setTrain();
    this.setBirds();
    // this.setTrainGroup();
    // this.setMesh();
    this.renderControls();
    // this.setGroup();
    this.animate();
    // this.setMesh()
  }
  tick(clock: Clock): void {
    const delta = clock.getDelta();
    // console.log("delta", delta * 1000);
    if (this.group) this.group.rotation.z -= this.radiansPerSecond * delta;
    this.train?.tick(delta);
  }
  animate() {
    const clock = new Clock();

    this.renderer?.setAnimationLoop(() => {
      //   if (this.mesh) this.mesh.rotation.y = this.mesh.rotation.y + 0.01;
      this.tick(clock);

      this.controls?.update();
      this.render();
    });
  }
}
