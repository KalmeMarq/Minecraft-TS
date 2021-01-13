import * as THREE from '../panorama_scripts/three.module.js';
import { CSS3DRenderer, CSS3DObject } from '../panorama_scripts/CSS3DRenderer.js';

/* Panoramas */
let camera, scene, renderer;
const target = new THREE.Vector3();

let lon = 90, lat = 0;
let phi = 0, theta = 0;

const panoramas = [
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_0.png',
    position: [0, 0, 512],
    rotation: [0, Math.PI, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_1.png',
    position: [- 512, 0, 0],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_2.png',
    position: [0, 0, - 512],
    rotation: [0, 0, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_3.png',
    position: [512, 0, 0],
    rotation: [0, - Math.PI / 2, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_4.png',
    position: [0, 512, 0],
    rotation: [Math.PI / 2, 0, Math.PI]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_5.png',
    position: [0, - 512, 0],
    rotation: [- Math.PI / 2, 0, Math.PI]
  }
];

initPanorama();
animatePanorama();

export function initPanorama() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  scene = new THREE.Scene();

  for (let i = 0; i < panoramas.length; i++) {
    const panorama = panoramas[i];

    const element = document.createElement('img');
    element.draggable = false;
    element.width = 1026; 
    element.src = panorama.url;

    const object = new CSS3DObject( element );
    object.position.fromArray( panorama.position );
    object.rotation.fromArray( panorama.rotation );
    scene.add(object);
  }

  renderer = new CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight);
  if(document.getElementById('panoramas')) document.getElementById('panoramas').appendChild( renderer.domElement );
  if(document.getElementById('panoramas')) document.getElementById('panoramas').touchAction = 'none';
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


function animatePanorama() {
  lon += 0.075;
  lat = Math.max(-85, Math.min(85, lat ));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  target.x = Math.sin(phi) * Math.cos( theta);
  target.y = Math.cos(phi) * 2;
  target.z = Math.sin(phi) * Math.sin( theta);

  camera.lookAt(target);
  renderer.render(scene, camera);
}

setInterval(() => {
  if(document.getElementById('panoramas') && true) {
    animatePanorama();
  }
}, (1000 / 60))