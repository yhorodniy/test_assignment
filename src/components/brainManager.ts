import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { colors, lanes, PATH } from './configs';

export class BrainManager {
    private scene: THREE.Scene;
    private loader: GLTFLoader;
    private brainModel: THREE.Group | null = null;
    public brainGroup: THREE.Group;

    constructor(scene: THREE.Scene, loader: GLTFLoader) {
        this.scene = scene;
        this.loader = loader;
        this.brainGroup = new THREE.Group();
        this.scene.add(this.brainGroup);
        
        this.loader.load(PATH.brain, (gltf) => {
            this.brainModel = gltf.scene;
        });
    }

    private spawnBrain(): void {
        if (!this.brainModel) return;

        const brainClone = this.brainModel.clone();
        const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        brainClone.position.set(randomLane, 1, -80);
        brainClone.scale.set(2, 2, 2)
        brainClone.userData.color = randomColor;

        brainClone.traverse((child: any) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ color: randomColor })
            }
        })

        this.brainGroup.add(brainClone);

        setTimeout(() => this.spawnBrain(), Math.max(500, Math.random() * 1000));
    }

    public startSpawning(): void {
        this.spawnBrain();
    }

    public update(delta: number, speed: number): void {
        this.brainGroup.children.forEach((brain) => {
            brain.position.z += delta * speed;
            if (brain.position.z > 10) {
                this.brainGroup.remove(brain);
            }
        });
    }
}