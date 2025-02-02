import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { renderer } from './sceneManager.js';

let composer, outlinePass;

//POST PROCESS EFFECT
export function initPostProcessing(scene, camera) {
    const renderPass = new RenderPass(scene, camera);
    outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    
    //OUTLINE
    outlinePass.edgeStrength = 4;
    outlinePass.edgeGlow = 0.5;
    outlinePass.edgeThickness = 2;
    outlinePass.pulsePeriod = 1;
    outlinePass.visibleEdgeColor.set(0xffffff);
    outlinePass.hiddenEdgeColor.set(0x000000);

    //COMPOSER INITIATION
    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(outlinePass);

    //ANTI ALIASING SMAA
    const smaaPass = new SMAAPass(window.innerWidth, window.innerHeight);
    composer.addPass(smaaPass);
}

//RENDER
export function renderScene() {
    composer.render();
}

export { outlinePass };