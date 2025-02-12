import * as THREE from 'three';

export default class Torus {
    constructor() {
        this.geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
        this.material = new THREE.MeshLambertMaterial ({ color: 0x550233 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    getMesh() {
        return this.mesh;
    }

    update(elapsedTime) {
        this.mesh.rotation.y = 0.5 * elapsedTime;
    }
}

export  class Object3D{
    constructor(){

    }
}