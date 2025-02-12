import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { scene } from './core/sceneManager.js';
import { interactableObjects } from './core/interactionManager.js';

const modules = new Set();

class Module{
    constructor(modelPath, moduleName, ancre, position = {x:0,y:0,z:0}, scale = {x:1,y:1,z:1}) {
        this.name = moduleName;
        this.position = position;
        this.ancre = ancre;
        this.modelPath = modelPath;
        this.model = null;
        this.scale = scale;

        this.loadModel();

        if(this.modelPath){
            this.loadGLBModel();
        }else{
            this.createBasicMesh(color);
        }
    }
    createBasicMesh(color) {
        const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
        const material = new THREE.MeshLambertMaterial({ color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.scale.set(this.scale.x, this.scale.y, this.scale.z);

        scene.add(this.mesh);
        interactableObjects.add(this.mesh);
        modules.add(this.mesh);

        //sort d'id mais plus complexe, de référence à un objet complet
        this.mesh.userData.module = this;
    }
    loadGLBModel() {
        const loader = new GLTFLoader();
        loader.load(
            this.modelPath,
            (gltf) => {
                this.mesh = gltf.scene;
                this.position.set(this.position.x, this.position.y, this.position.z); 
                this.scale.set(this.scale.x, this.scale.y, this.scale.z);
                this.add(tree);
            });
    }
    getMesh() {
        return this.mesh;
    }
    update(elapsedTime) {
        if (this.mesh) {
            //this.mesh.rotation.y = 0.5 * elapsedTime;
        }
    }
    onClick() {
        console.log(`Vous avez cliqué sur le module : ${this.name}`);
        
    }

}

export { modules, Module };