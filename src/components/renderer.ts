import * as THREE from 'three';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

export default renderer;