import * as THREE from 'three'
import './style.css';
import { scene, renderer } from './core/sceneManager.js';
import { cameras } from './core/camerasManager.js';
import './core/lightsManager.js';
import Torus from './3Dmodels/Example3DModel.js';
import Stats from 'three/examples/jsm/libs/stats.module'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// STATS
const stats = Stats()
document.body.appendChild(stats.dom)


// Create 3D objects
const torus = new Torus();
scene.add(torus.getMesh());

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{
    stats.update();

    const elapsedTime = clock.getElapsedTime()


    //Update 3D objects
    torus.update(elapsedTime);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, cameras.main)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()