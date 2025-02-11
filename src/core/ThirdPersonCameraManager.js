import * as THREE from 'three';

class ThirdPersonCamera {
    constructor(camera, target, canvas) {
        this.camera = camera;
        this.target = target;
        this.canvas = canvas;
        this.angleX = Math.PI / 4;
        this.angleY = Math.PI / 6;
        this.distance = 10;
        this.minDistance = 1;
        this.maxDistance = 20;
        
        this.init();
        document.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
    }

    init() {
        if (this.canvas) {
            this.canvas.addEventListener('wheel', (event) => this.onMouseWheel(event), { passive: false });
        }
        
        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
        window.addEventListener('mousedown', () => this.onMouseDown());
        window.addEventListener('mouseup', () => this.onMouseUp());
    }

    onMouseWheel(event) {
        event.preventDefault();
        //TO DO -> ralentir quand on s'approche de la target 
        this.distance += event.deltaY * 0.01;
        this.distance = Math.max(this.minDistance, Math.min(this.maxDistance, this.distance));
    }

    onMouseMove(event) {
        if (this.isDragging) {
            this.angleX -= event.movementX * 0.005;
            this.angleY += event.movementY * 0.005;
            this.angleY = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.angleY));
        }
    }

    onMouseDown() {

            this.isDragging = true;
        
        
    }

    onMouseUp() {

            this.isDragging = false;
        
        
    }

    update() {
        if (!this.target) return;

        const offsetX = this.distance * Math.cos(this.angleY) * Math.sin(this.angleX);
        const offsetY = this.distance * Math.sin(this.angleY);
        const offsetZ = this.distance * Math.cos(this.angleY) * Math.cos(this.angleX);

        this.camera.position.set(
            this.target.position.x + offsetX,
            this.target.position.y + offsetY,
            this.target.position.z + offsetZ
        );
        this.camera.lookAt(this.target.position);
    }

}

export default ThirdPersonCamera;
