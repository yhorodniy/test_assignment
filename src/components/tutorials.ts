import * as THREE from 'three';
import { PATH, tuturialGroup } from './configs';


const textureLoader = new THREE.TextureLoader();

const handTexture = textureLoader.load(PATH.tutorialHand);
const handMaterial = new THREE.SpriteMaterial({ map: handTexture });
const handSprite = new THREE.Sprite(handMaterial);
handSprite.position.set(3, 1, -5);


const textTexture = textureLoader.load(PATH.tutorialText);
const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
const textSprite = new THREE.Sprite(textMaterial);
textSprite.position.set(1.25, 2, -5);
textSprite.scale.set(4, 0.5, 1);

tuturialGroup.add(handSprite);
tuturialGroup.add(textSprite);


export { handSprite };