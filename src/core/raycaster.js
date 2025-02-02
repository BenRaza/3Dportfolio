import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const interactableObjects = new Set();

let hoveredObject = null;
let selectedObject = null;
let composer, outlinePass;


//Post Process at hover
export function initPostProcessing(renderer, scene, camera) {
    const renderPass = new RenderPass(scene, camera);
    outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    
    outlinePass.edgeStrength = 4;  
    outlinePass.edgeGlow = 0.5;    
    outlinePass.edgeThickness = 2; 
    outlinePass.pulsePeriod = 1;   
    outlinePass.visibleEdgeColor.set(0xffffff); 
    outlinePass.hiddenEdgeColor.set(0x000000);  

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(outlinePass);
}



//RAYCAST
export function updateRaycast(camera) {
    raycaster.setFromCamera(mouse, camera);
    const interactableArray = Array.from(interactableObjects);
    const intersects = raycaster.intersectObjects(interactableArray, true);

    return intersects.length > 0 ? intersects[0].object : null;
}

//HOVER
export function handleHover(camera) {
    const newHoveredObject = updateRaycast(camera);

    if (newHoveredObject !== hoveredObject) {
        console.log("hovered");
        if (hoveredObject) resetHighlight(hoveredObject);
        hoveredObject = newHoveredObject;
        if (hoveredObject) highlight(hoveredObject);
    }
}

//Highlight at hover

function highlight(object) {
    /*object.userData.originalMaterial = object.material; 
    object.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
    });*/
    outlinePass.selectedObjects = [object]; 
}

function resetHighlight(object) {
    //object.material = object.userData.originalMaterial;
    outlinePass.selectedObjects = [];
}


//CLICK
export function handleClick(scene) {
    if (hoveredObject) {

        if (selectedObject) resetHighlight(selectedObject); 
        selectedObject = hoveredObject;
        selectedObject.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    }
}

//mouse events
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
    handleClick();
});


export function renderScene() {
    composer.render();
}

export {interactableObjects};