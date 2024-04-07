import * as THREE from "three";
import { WEBGL } from "./webgl";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

if (WEBGL.isWebGLAvailable()) {
  // 여기에 코드 작성하면 됨

  // 장면
  const scene = new THREE.Scene();
  //scene.background = new THREE.Color(0xeeeeee);

  // 카메라
  const fov = 75;   시야각
  const aspect = window.innerWidth/window.innerHeight;
  const near = 0.1;
  const far = 10000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   camera.position.set(0, 0, 5);

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

  const geometry = new THREE.BoxGeometry(3, 3, 3);
  const material = new THREE.MeshStandardMaterial({ color: 0xFF7F00 }); // Corrected typo
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.5;
  scene.add(cube);

  renderer.render(scene, camera);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * window.devicePixelRatio);
  fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * window.devicePixelRatio);
  composer.addPass(fxaaPass);

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * window.devicePixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * window.devicePixelRatio);
  }
  window.addEventListener("resize", onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
