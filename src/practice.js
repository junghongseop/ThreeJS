import * as THREE from "three";
import { WEBGL } from "./webgl";

if (WEBGL.isWebGLAvailable()) {
  // 여기에 코드 작성하면 됨

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x004fff);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerWidth, 0.1, 1000); 
  // 화각, 가까운, 먼 등의 속성을 넣을 수 있음
  camera.position.z = 3;

  // 렌더러
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight, window.innerWidth);

  // 렌터러를 어느 태그에 노출 시킬지
  document.body.appendChild(renderer.domElement);

  // 매쉬
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material01 = new THREE.MeshStandardMaterial({ color: 0x999999 });
  const obj01 = new THREE.Mesh(geometry01, material01);
  obj01.position.x = 0.5;
  scene.add(obj01);

  const geometry02 = new THREE.IcosahedronGeometry(0.3, 0);
  const material02 = new THREE.MeshStandardMaterial({ color: 0x999999 });
  const obj02 = new THREE.Mesh(geometry02, material02);
  obj02.position.x = -0.5;
  scene.add(obj02);

  // renderer.render(scene, camera);

  // 애니메이션 적용
  function render(time) {
    time *= 0.0005;  // 회전 시간 속도

    // 도형이 회전하도록
    // cube.rotation.x = time;
    obj01.rotation.y = time;

    obj02.rotation.x = time;
    obj02.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
