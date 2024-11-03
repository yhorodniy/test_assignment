import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


export const scene = new THREE.Scene();
export const loader = new GLTFLoader();
export const clock = new THREE.Clock();
export const lanes = [-3.5, 0, 3.5];
export const colors = [ 0x58c2da, 0xf3c27d, 0xBA68C8 ];

// Creating groups
export const trackGroup = new THREE.Group();
export const characterGroup = new THREE.Group();
export const brainGroup = new THREE.Group();
export const tuturialGroup = new THREE.Group();
scene.add(trackGroup, characterGroup, brainGroup, tuturialGroup);