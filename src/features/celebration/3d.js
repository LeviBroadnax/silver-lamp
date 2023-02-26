import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const loader = new FontLoader();
export const render3dText = (text) => {
  let scene, camera, renderer, textGeometry, material, mesh;
  scene = new Scene();
  camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight);
  const canvas = document.querySelector("canvas.webgl");
  if (canvas === null) return;
  renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  material = new MeshBasicMaterial({ color: 0x002654 });

  renderer.shadowMap.enabled = true;
  renderer.setSize(visualViewport.width, visualViewport.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor("grey", 0);

  loader.load("/helvetiker_regular.typeface.json", function (font) {
    textGeometry = new TextGeometry(text.toLocaleLowerCase(), {
      font: font,
      size: 3,
      height: 1,
      curveSegments: 12,
      bevelThickness: 4,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5,
    });
    mesh = new Mesh(textGeometry, material);
    camera.lookAt(mesh.position);
    mesh.position.x = 100;
    scene.add(mesh);
  });
  camera.position.z = 100;
  const animate = function () {
    if (mesh) {
      mesh.rotation.x += 0.01;
      mesh.rotation.y -= 0.003;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
};
