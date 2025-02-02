import * as THREE from 'three'
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { scene, renderer, canvas } from './core/sceneManager.js';
import { cameras } from './core/camerasManager.js';
import { handleHover, interactableObjects,initPostProcessing, renderScene  } from './core/raycaster';
import './core/lightsManager.js';
import Torus from './3Dmodels/Example3DModel.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import * as dat from 'dat.gui'




//Post Process
initPostProcessing(renderer, scene, cameras.main);

// Debug
const gui = new dat.GUI();

// STATS
const stats = Stats();
document.body.appendChild(stats.dom);

// Controls
const controls = new OrbitControls(cameras.main, canvas);
controls.enableDamping = true;

// Create 3D objects
const torus = new Torus();
scene.add(torus.getMesh());
interactableObjects.add(torus.getMesh());
interactableObjects.add(torus.getMesh());
interactableObjects.add(torus.getMesh());
console.log("Interactable objects:", interactableObjects);

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () =>
{
    stats.update();

    const elapsedTime = clock.getElapsedTime();


    //Update 3D objects
    torus.update(elapsedTime);

    // Mettre à jour le raycasting
    handleHover(cameras.main);

    // Update Orbital Controls
    controls.update();

    // Render
    //renderer.render(scene, cameras.main);
    //Post Processing
    renderScene();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick()