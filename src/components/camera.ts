import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(3, 5, 0);
camera.rotation.x = Math.PI * -0.05;
camera.rotation.y = Math.PI * 0.1;

export default camera