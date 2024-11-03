import * as THREE from 'three';
import { tuturialGroup } from './configs';


const textureLoader = new THREE.TextureLoader();

const handTexture = textureLoader.load('src/static/tutorial_hand.png');
const handMaterial = new THREE.SpriteMaterial({ map: handTexture });
const handSprite = new THREE.Sprite(handMaterial);
handSprite.position.set(3, 1, -5);


const textTexture = textureLoader.load('src/static/tutorial_swipe_to_start.png');
const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
const textSprite = new THREE.Sprite(textMaterial);
textSprite.position.set(1.25, 2, -5);
textSprite.scale.set(4, 0.5, 1);

tuturialGroup.add(handSprite);
tuturialGroup.add(textSprite);


export { handSprite };