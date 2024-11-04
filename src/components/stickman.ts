import { ActionName, PlayAnimation, playAnimation } from './helpers';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { PATH } from './configs';


export class Stickman {
    private path: string
    private loader: GLTFLoader;
    private stickman: THREE.Group | null;
    private animations: THREE.AnimationClip[];
    private mixer: THREE.AnimationMixer | null;

    constructor(loader: GLTFLoader) {
        this.path = PATH.sticman;
        this.loader = loader;
        this.stickman = null;
        this.animations = [];
        this.mixer = null;
    }

    public loadModel(characterGroup: THREE.Group): void {
        this.loader.load(this.path, (gltf) => {
            this.stickman = gltf.scene;
            this.stickman.rotation.y = Math.PI;
            this.animations = gltf.animations;
            this.mixer = new THREE.AnimationMixer(this.stickman);

            this.removeUnwantedElements();

            characterGroup.add(this.stickman);
            this.playAnimation('Idle');
        })
    }

    private removeUnwantedElements(): void {
        if (!this.stickman) return;

        this.stickman.children.forEach(item =>{
            const planeIndex = item.children.findIndex(el => el.name === 'Plane');
            if (planeIndex !== -1) {
                item.children.splice(planeIndex, 1)
            }
        })
    }

    public setColor(color: THREE.Color | number): void {
        if (!this.stickman) return;

        this.stickman.traverse((child: any) => {
            if (child.isMesh) {
                child.material.color.set(color)
            };
        });
    };

    public playAnimation(name: ActionName) {
        const values: PlayAnimation = {
            animations: this.animations,
            mixer: this.mixer,
            name
        }
        playAnimation(values)
    }

    public update(deltaTime: number): void {
        if (this.mixer) {
            this.mixer.update(deltaTime)
        }
    }
}