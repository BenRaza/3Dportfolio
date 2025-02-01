import * as THREE from 'three';
import { scene } from './sceneManager.js';

const lights = {
    pointLight: new THREE.PointLight(0xffffff, 0.1),
    ambientLight: new THREE.AmbientLight(0xffffff, 0.2),
};

lights.pointLight.position.set(2, 3, 4);

scene.add(lights.pointLight);
scene.add(lights.ambientLight);

export { lights };