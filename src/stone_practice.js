import * as THREE from "three";
import { WEBGL } from "./webgl";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

if (WEBGL.isWebGLAvailable()) {
  // 여기에 코드 작성하면 됨

  // 장면
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x004fff);

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // 화각, 가까운, 먼 등의 속성을 넣을 수 있음
  camera.position.z = 3;

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 렌터러를 어느 태그에 노출 시킬지
  document.body.appendChild(renderer.domElement);

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12); // x, y, z의 위치값 주는 방법
  // scene에 빛 추가
  scene.add(pointLight);

  // 텍스쳐
  const textureLoader = new THREE.TextureLoader();
  const textureBaseColor01 = textureLoader.load(
    "../static/img/Stone_basecolor.jpg"
  );
  const textureBaseColor02 = textureLoader.load(
    "../static/img/Stone_height.png"
  );
  const textureBaseColor03 = textureLoader.load(
    "../static/img/Stone_normal.jpg"
  );
  const textureBaseColor04 = textureLoader.load(
    "../static/img/Stone_roughness.png"
  );

  // 도형 추가
  const geometry = new THREE.SphereGeometry(0.3, 32, 16);

  const material01 = new THREE.MeshStandardMaterial({
    map: textureBaseColor01,
  });
  const obj01 = new THREE.Mesh(geometry, material01);
  scene.add(obj01);
  obj01.position.x = -2;

  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor01,
    normalMap: textureBaseColor02,
  });
  const obj02 = new THREE.Mesh(geometry, material02);
  scene.add(obj02);
  obj02.position.x = -1;

  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor01,
    normalMap: textureBaseColor02,
    displacementMap: textureBaseColor03,
    displacementScale: 0.05,
  });
  const obj03 = new THREE.Mesh(geometry, material03);
  scene.add(obj03);
  obj03.position.x = 0;

  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor01,
    normalMap: textureBaseColor02,
    displacementMap: textureBaseColor03,
    displacementScale: 0.005,
    roughnessMap: textureBaseColor02,
    displacementScale: 0.05,
  });
  const obj04 = new THREE.Mesh(geometry, material04);
  scene.add(obj04);
  obj04.position.x = 1;

  const material05 = new THREE.MeshStandardMaterial({
    map: textureBaseColor01,
    normalMap: textureBaseColor02,
    displacementMap: textureBaseColor03,
    displacementScale: 0.005,
    roughnessMap: textureBaseColor02,
    displacementScale: 0.05,
    roughness: 0.5,
  });
  const obj05 = new THREE.Mesh(geometry, material05);
  scene.add(obj05);
  obj05.position.x = 2;

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.material.uniforms["resolution"].value.x =
    1 / (window.innerWidth * window.devicePixelRatio);
  fxaaPass.material.uniforms["resolution"].value.y =
    1 / (window.innerHeight * window.devicePixelRatio);
  composer.addPass(fxaaPass);

  function render(time) {
    time *= 0.001;

    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    obj05.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    fxaaPass.material.uniforms["resolution"].value.x =
      1 / (window.innerWidth * window.devicePixelRatio);
    fxaaPass.material.uniforms["resolution"].value.y =
      1 / (window.innerHeight * window.devicePixelRatio);
  }
  window.addEventListener("resize", onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
