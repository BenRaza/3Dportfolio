
import * as THREE from 'three'



// Scene
const scene = new THREE.Scene()


//Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Scroll
let scrollPercent = 0;
const animationScripts = [];




// Canvas
const canvas = document.querySelector('canvas.webgl')


// Renderer with native MSAA
//WARNING NOT CURRENTLY USED BECAUSE OF POST PROCESS
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias : true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.setClearColor(0x000000, 1); // black bg


window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

export { scene, renderer, sizes, canvas };