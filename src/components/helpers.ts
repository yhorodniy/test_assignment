import * as THREE from 'three';
import camera from './camera';

export const ACTIONS = [
    'Idle',
    'Run',
    'Header',
    'T',
    'Death',
    'Victory'
] as const;

export type ActionName = typeof ACTIONS[number];

export interface PlayAnimation {
    animations: THREE.AnimationClip[],
    mixer: THREE.AnimationMixer | null,
    name: ActionName,
};

export const playAnimation = ({animations, mixer, name}: PlayAnimation): void => {
    if (animations.length === 0) return;

    const clip = THREE.AnimationClip.findByName(animations, name);
    if(clip && mixer !== null) {
        const action = mixer.clipAction(clip);
        action.reset();
        action.play();
    };
};

export const animateCamera = (delta: number) => {
    const targetPosition = new THREE.Vector3(0, 10, camera.position.z);
    camera.position.lerp(targetPosition, delta * 2)
    camera.rotation.y += (0 - camera.rotation.y) * delta * 2;
    camera.rotation.x += (Math.PI * -0.1 - camera.rotation.x) * delta * 2;
    return
}