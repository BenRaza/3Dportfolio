import * as THREE from 'three';
import { outlinePass } from './postProcessing.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const interactableObjects = new Set();
let hoveredObject = null;
let selectedObject = null;

//Find object with mouse
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
        if (hoveredObject) resetHighlight(hoveredObject);
        hoveredObject = newHoveredObject;
        if (hoveredObject) highlight(hoveredObject);
    }
}

//HIGHLIGHT
function highlight(object) {
    if (!object.userData.originalMaterial) {
        object.userData.originalMaterial = object.material.clone();
    }
    outlinePass.selectedObjects = [object];
}


function resetHighlight() {
    outlinePass.selectedObjects = [];
}

//CLICK
export function handleClick() {
    if (hoveredObject) {
        if (selectedObject === hoveredObject) {
            handleUnselect();
        } else {
            if (selectedObject) resetSelection(selectedObject);
            selectedObject = hoveredObject;
            selectedObject.material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        }
    } else {
        handleUnselect();
    }
}


export function handleUnselect() {
    if (selectedObject) {
        resetSelection(selectedObject);
        selectedObject = null;
    }
}


function resetSelection(object) {
    if (object.userData.originalMaterial) {
        object.material = object.userData.originalMaterial.clone();
    }
}

//MOUSE EVENTS
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
    handleClick();
});

export { interactableObjects };
