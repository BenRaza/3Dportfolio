import * as THREE from 'three';
import './style.css';
import ThirdPersonCamera from './core/ThirdPersonCameraManager.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { scene, renderer, canvas } from './core/sceneManager.js';
import { cameras } from './core/camerasManager.js';
import { updateRaycast, handleHover, handleClick, interactableObjects } from './core/interactionManager.js';
import { initPostProcessing, renderScene } from './core/postProcessing.js';
import './core/lightsManager.js';
import Torus from './3Dmodels/Example3DModel.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as dat from 'dat.gui';
import { lerp, scalePercent } from './core/logicLibrary.js';

// Grid temporaire
const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
scene.add(gridHelper);

// Debug
const gui = new dat.GUI();

// STATS
const stats = Stats();
document.body.appendChild(stats.dom);

// Initialisation du post-processing
initPostProcessing(scene, cameras.main);
//Post Process
//initPostProcessing(renderer, scene, cameras.main);








// Création du torus (target character)
const torus = new Torus();
scene.add(torus.getMesh());
interactableObjects.add(torus.getMesh());



//Camera
const thirdPersonCam = new ThirdPersonCamera(cameras.main, torus.getMesh(), canvas);

//position de la caméra
/*
//NOT WORKING ANYMORE
let initialCameraPosition = new THREE.Vector3(0, 0, 2);
let initialCameraQuaternion = new THREE.Quaternion();
const targetCameraPosition = new THREE.Vector3(5, 5, 5);
*/
//SCROLL
let scrollPercent = 0;
const animationScripts = [];

//Scroll animation
window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = (scrollTop / docHeight) * 100; // Convertion -> pourcentage
});
console.log("scroll percent : " + scrollPercent);


animationScripts.push({
    start: 0,
    end: 60,
    func: () => {
        torus.getMesh().rotation.x = lerp(0, Math.PI * 2, scalePercent(0, 60, scrollPercent));
        torus.getMesh().position.z = lerp(0, -3, scalePercent(0, 50, scrollPercent));
    },
});

/*
//NOT WORKING ANYMORE
animationScripts.push({
    start: 60,
    end: 80,
    func: () => {
        //normalisation du scroll entre 0 et 1
        const t = scalePercent(60, 80, scrollPercent);


        // Interpolation de la position
        cameras.main.position.lerpVectors(initialCameraPosition, targetCameraPosition, t);
        cameras.main.quaternion.slerp(initialCameraQuaternion, 1 - t);

        
    },
});*/

const playScrollAnimations = () => {
    animationScripts.forEach((animation) => {
        if (scrollPercent >= animation.start && scrollPercent <= animation.end) {
            animation.func();
        }
    });
};



// Animation principale
const clock = new THREE.Clock();
const tick = () => {
    stats.update();
    const elapsedTime = clock.getElapsedTime();
    //scroll animation
    playScrollAnimations();

    // Mise à jour de la caméra
    //updateCamera();
    thirdPersonCam.update();

    // Mettre à jour le raycasting
    handleHover(cameras.main);

    // Post Processing
    renderScene();

    // Relancer l'animation
    window.requestAnimationFrame(tick);
};

tick();
