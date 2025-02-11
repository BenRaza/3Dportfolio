import * as THREE from 'three';
import './style.css';
import ThirdPersonCamera from './core/ThirdPersonCameraManager.js';
import { scene, canvas } from './core/sceneManager.js';
import { cameras } from './core/camerasManager.js';
import { handleHover,  interactableObjects } from './core/interactionManager.js';
import { initPostProcessing, renderScene } from './core/postProcessing.js';
import { lights } from './core/lightsManager.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Torus from './3Dmodels/Example3DModel.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as dat from 'dat.gui';
import { lerp, scalePercent } from './core/logicLibrary.js';
import { playScrollAnimations, addAnimationScript, scrollPercent } from './core/animationsManager.js';

// #region Helpers
// Grid temporaire
const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf);
scene.add(gridHelper);

// Debug
const gui = new dat.GUI();

// STATS
const stats = Stats();
document.body.appendChild(stats.dom);

// #endregion

// #region Scene Setup
// Initialisation du post-processing
initPostProcessing(scene, cameras.main);
//Post Process
//initPostProcessing(renderer, scene, cameras.main);

//Background
scene.background = new THREE.Color(0x111);

//lights
scene.add(lights.pointLight);
scene.add(lights.ambientLight);

// #endregion

// #region 3D objects
// Instantiate a loader
const loader = new GLTFLoader();


loader.load( '/tree1.glb', function ( gltf )
    {
        const tree = gltf.scene;
        tree.position.set(0, 0, 0); 
        tree.scale.set(1, 1, 1);
        scene.add(tree);
    },
    // function (error) {
    //     console.error('Il y a eu une erreur pendant le chargement : ', error);
    // }
);


// Création du torus (target character)
const torus = new Torus();
scene.add(torus.getMesh());
interactableObjects.add(torus.getMesh());

// #endregion

// #region Animations at Scroll

// Add animation at scroll
addAnimationScript(0, 60, () => {
    torus.getMesh().rotation.x = lerp(0, Math.PI * 2, scalePercent(0, 60, scrollPercent));
    torus.getMesh().position.z = lerp(0, -3, scalePercent(0, 50, scrollPercent));
});

// #endregion

//Camera
const thirdPersonCam = new ThirdPersonCamera(cameras.main, torus.getMesh(), canvas);

//Clock
const clock = new THREE.Clock();

// #region TICK
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

    // Render
    //renderer.render(scene, cameras.main);
    //Post Processing
    renderScene();

    // Relancer l'animation
    window.requestAnimationFrame(tick);
};

tick();

// #endregion 