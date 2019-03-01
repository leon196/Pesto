
import * as THREE from 'three.js';
import { OrbitControls } from '../libs/OrbitControls';
import renderer from '../engine/renderer';
import FrameBuffer from '../engine/framebuffer';
import assets from '../engine/assets';
import Bloom from '../libs/bloom/bloom';
import { uniforms } from './uniform';
import { clamp, lerp, lerpArray, lerpVector, lerpArray2, lerpVectorArray, saturate } from '../engine/misc';

export var engine = {
	camera: new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 2000),
	target: new THREE.Vector3(),
	scene: null,
	controls: null,
	framebuffer: null,
	bloom: null,
}

export function initEngine () {

	engine.camera.position.x = -1;
	engine.camera.position.y = 1;
	engine.camera.position.z = 3;

	engine.controls = new OrbitControls(engine.camera, renderer.domElement);
	engine.controls.enableDamping = true;
	engine.controls.dampingFactor = 0.1;
	engine.controls.rotateSpeed = 0.1;

	assets.shaders.raymarching.uniforms = uniforms;
	assets.shaders.render.uniforms = uniforms;

	engine.scene = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), assets.shaders.render);
	engine.scene.frustumCulled = false;

	engine.framebuffer = new FrameBuffer({
		material: assets.shaders.raymarching
	});

	// engine.bloom = new Bloom(engine.frametarget.texture);
}

export function updateEngine (elapsed) {
	engine.controls.update();

	engine.framebuffer.update();
	uniforms.framebuffer.value = engine.framebuffer.getTexture();
	
	// array = assets.animations.getPosition('camera', elapsed);
	// arrayCamera = lerpArray(arrayCamera, array, .1);
	// engine.camera.position.set(arrayCamera[0], arrayCamera[1], arrayCamera[2]);

	// array = assets.animations.getPosition('fov', elapsed);
	// arrayFOV = lerpArray(arrayFOV, array, .1);
	// if (arrayFOV[1] != engine.camera.fov) {
	// 	engine.camera.fov = arrayFOV[1];
	// 	engine.camera.updateProjectionMatrix();
	// }
	
	// array = assets.animations.getPosition('target', elapsed);
	// arrayTarget = lerpArray(arrayTarget, array, .1);
	// engine.target.set(arrayTarget[0], arrayTarget[1], arrayTarget[2]);
	// engine.camera.lookAt(engine.target);
}