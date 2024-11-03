import * as THREE from 'three';
import Hammer from 'hammerjs';
import camera from './components/camera';
import renderer from './components/renderer';
import { Stickman } from './components/stickman';
import { BrainManager } from './components/brainManager';
import './style.css';
import { characterGroup, clock, lanes, loader, scene, trackGroup, tuturialGroup } from './components/configs';
import { handSprite } from './components/tutorials';
import { animateCamera } from './components/helpers';


// Initial constants

let currentLaneIndex = 1;
let targetPositionX = lanes[currentLaneIndex];
let isGameStarted = false;

// Creating light
const ambientLight = new THREE.AmbientLight(0xffffff);
const directionLight = new THREE.DirectionalLight(0xffffff)
directionLight.position.set(3, 3, 3)
scene.add(ambientLight, directionLight);


// Loading character and animations
const character = new Stickman(loader);
character.loadModel(characterGroup);
characterGroup.position.z = -10


// Loading track
loader.load(
    'src/static/TrackFloor.glb',
    (gltf) => {
        const track = gltf.scene;
        track.position.set(0, 0, 0);
        track.scale.set(1, 1, 6)
        trackGroup.add(track);
    }
);


// Loading brains
const brainManager = new BrainManager(scene, loader);


const renderloop = () => {
    const delta = clock.getDelta();
    character.update(delta);
    
    const currentX = characterGroup.position.x;
    characterGroup.position.x += (targetPositionX - currentX) * 0.1;
    
    
    if (!isGameStarted) {
        const currentTime = clock.getElapsedTime();
        handSprite.position.x = 1.2 + Math.sin(currentTime * 1.5);
        handSprite.position.y = 1 + Math.sin(currentTime * 1.5) * 0.15;
    }
    if (isGameStarted) {
        animateCamera(delta);
        brainManager.update(delta);
        brainManager.brainGroup.children.forEach(brain => {
            const distance = brain.position.distanceTo(characterGroup.position);
            if (distance < 3.5) {
                character.setColor(brain.userData.color);
                brainManager.brainGroup.remove(brain);
            }
            if (brain.position.z === 0) {
                brainManager.brainGroup.remove(brain);
            }
        })
    };
    
    renderer.render(scene, camera);
    window.requestAnimationFrame(renderloop);
};

renderloop();




// Events
const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const hammer = new Hammer(canvas);

hammer.on('swipeleft', () => {
    if (currentLaneIndex > 0) {
        currentLaneIndex --;
        targetPositionX = lanes[currentLaneIndex];
    };
});

hammer.on('swiperight', () => {
    if (currentLaneIndex < lanes.length -1) {
        currentLaneIndex ++;
        targetPositionX = lanes[currentLaneIndex];
    };
});

canvas.addEventListener('pointerdown', () => {
    if (!isGameStarted) {
        isGameStarted = true;
        scene.remove(tuturialGroup);
        character.playAnimation('Run');
        brainManager.startSpawning();
    }
})

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
