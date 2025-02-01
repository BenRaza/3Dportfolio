import * as THREE from 'three';
import { sizes } from './sceneManager.js';

const cameras = {
    main: new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100),
};

cameras.main.position.set(0, 0, 2);

window.addEventListener('resize', () => {
    cameras.main.aspect = sizes.width / sizes.height;
    cameras.main.updateProjectionMatrix();
});

export { cameras };