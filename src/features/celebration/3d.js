import {
  Mesh,
  MeshBasicMaterial,
  Scene,
  WebGLRenderer,
  PerspectiveCamera as pCam,
} from "three";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const textGeometryOptions = {
  font: undefined,
  size: 80,
  height: 5,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 10,
  bevelSize: 8,
  bevelOffset: 0,
  bevelSegments: 5,
};
var renderer;
var textGeometry;
var mesh;
var scene;
// if local assign debug, otherwise dont
var debug; // import GUI from "lil-gui";const debug = new GUI();
const camera = new pCam(60, window.innerWidth / window.innerHeight); // debugCamera(camera);
const material = new MeshBasicMaterial({ color: 0x002654 });
const fontLoader = new FontLoader();
export const render3dText = (text) => {
  if (!scene) scene = new Scene();
  if (renderer === undefined) {
    let canvas = document.querySelector("canvas.webgl");
    if (!canvas) return;
    renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      pixelRatio: Math.min(window.devicePixelRatio, 2),
    });
    renderer.setSize(visualViewport.width, visualViewport.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor("grey", 0);
  }
  if (mesh) {
    scene.remove(mesh);
  }
  fontLoader.load("/Consolas_Regular.json", function (font) {
    textGeometry = new TextGeometry(text.toLocaleLowerCase(), {
      textGeometryOptions,
      font,
    });
    mesh = new Mesh(textGeometry, material);
    mesh.position.set(-400, 450, -900);
    camera.position.set(100, 100, 100);
    camera.lookAt(mesh.position);
    scene.add(mesh);
  });

  const animate = function () {
    if (mesh) {
      // mesh.rotation.x += 0.01;
      // mesh.rotation.y -= 0.003;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };
  animate();
};

const debugCamera = (camera) => {
  const cameraFolder = debug.addFolder("Camera");
  cameraFolder.add(camera.position, "x", 0, 20, 0.25);
  cameraFolder.add(camera.position, "y", 0, 20, 0.25);
  cameraFolder.add(camera.position, "z", -20, 20, 0.25);
  cameraFolder.add(camera.rotation, "x", -Math.PI, Math.PI, 0.25);
  cameraFolder.add(camera.rotation, "y", -Math.PI, Math.PI, 0.25);
  cameraFolder.add(camera.rotation, "z", -Math.PI, Math.PI, 0.25);
};

const debugMesh = (mesh) => {
  const meshFolder = debug.addFolder("Mesh");
  meshFolder.add(mesh.position, "x", -1000, 1000, 15);
  meshFolder.add(mesh.position, "y", -1000, 1000, 15);
  meshFolder.add(mesh.position, "z", -1000, 1000, 15);
};

if ("env.debugging") {
  debugCamera(camera);
  debugMesh(mesh);
}
