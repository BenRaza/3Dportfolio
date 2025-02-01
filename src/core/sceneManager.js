
import * as THREE from 'three'



// Scene
const scene = new THREE.Scene()


//Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}




// Canvas
const canvas = document.querySelector('canvas.webgl')


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})




// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

export { scene, renderer, sizes };