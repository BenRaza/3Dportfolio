import * as THREE from 'three';

const lights = {
    pointLight: new THREE.PointLight(0xffff00, 1.5),
    ambientLight: new THREE.AmbientLight(0xffffff, 1.5),
};

lights.pointLight.position.set(1, 1, 1);
lights.pointLight.castShadow = true;


export { lights };