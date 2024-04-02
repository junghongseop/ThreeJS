import * as THREE from "three";
import { WEBGL } from "./webgl";

if (WEBGL.isWebGLAvailable()) {
  // 여기에 코드 작성하면 됨

  // 장면
  const scene = new THREE.Scene();

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerWidth, 0.1, 1000); 
  // 화각, 가까운, 먼 등의 속성을 넣을 수 있음

  // 캔버스
  const canvas = document.querySelector('#ex01');

  // 렌더러
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerHeight, window.innerWidth);

  // 렌터러를 어느 태그에 노출 시킬지
  document.body.appendChild(renderer.domElement);

  // renderer.render(scene, camera);

  // 애니메이션 적용
  function render(time) {
    time *= 0.001;

    // cube.rotation.x = time;
    // cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
