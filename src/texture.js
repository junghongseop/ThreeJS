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
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 렌터러를 어느 태그에 노출 시킬지
  document.body.appendChild(renderer.domElement);

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);  // x, y, z의 위치값 주는 방법
  // scene에 빛 추가 
  scene.add(pointLight);

  // 매쉬
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
  
  const material01 = new THREE.MeshBasicMaterial({color: 0xFF7F00,});
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x = -2;
  scene.add(obj01);

  const material02 = new THREE.MeshStandardMaterial({
    color: 0xFF7F00,
    // 메탈 느낌을 줄지 말지
    // 0에 가까워 질 수록 메탈 느낌, 1에 가까워 질 수록 나무 느낌
    metalness: 0.9,
    // 거칠기
    roughness: 0.5,
    // 형태를 보여 줄 지 설정
    transparent: true,
    // 투명도 설정
    opacity: 0.5,
    // wireframe: true,
  });
  // 변수로 지정해서 추가해도 정상 작동함

  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x = -1;
  scene.add(obj02);

  // 깊이감이 있는 도형을 만들때 사용
  // const material03 = new THREE.MeshDepthMaterial({color: 0xFF7F00,});

  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xFF7F00,
    // 연한 막이 생긴 듯한 느낌을 줌
    clearcoat: 10,
    // clearcoat에 거칠기를 더함
    clearcoatRoughness: 0.5,
  });
  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x = 0;
  scene.add(obj03);

  const material04 = new THREE.MeshNormalMaterial({color: 0xFF7F00,});
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 1;
  scene.add(obj04);

  const material05 = new THREE.MeshPhongMaterial({
    color: 0xFF7F00,
    // 빛을 얼마나 줄지
    shininess: 60,
    // 빛에 어떤 색상을 줄지
    specular: 0x004fff
  });
  const obj05 = new THREE.Mesh(geometry, material05);
  obj05.position.x = 2;
  scene.add(obj05);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * window.devicePixelRatio);
  fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * window.devicePixelRatio);
  composer.addPass(fxaaPass);

  function render(time) {
    time *= 0.001;

    obj01.rotation.y = time;

    obj02.rotation.x = time;

    obj03.rotation.y = time;

    obj04.rotation.x = time;

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
    fxaaPass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * window.devicePixelRatio);
    fxaaPass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * window.devicePixelRatio);
  }
  window.addEventListener("resize", onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
