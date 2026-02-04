import { GLView } from 'expo-gl';
import React from 'react';
import { View } from 'react-native';
import * as THREE from 'three';

export default function AROverlay() {
	const onContextCreate = async (gl: any) => {
		// 1. Setup Scene Three.js
		const scene = new THREE.Scene();

		// Kamera 3D (Bukan kamera HP, tapi "mata" di dunia 3D)
		const camera = new THREE.PerspectiveCamera(
			75,
			gl.drawingBufferWidth / gl.drawingBufferHeight,
			0.1,
			1000,
		);
		camera.position.z = 5;

		// Renderer OpenGL
		const renderer = new THREE.WebGLRenderer({
			canvas: {
				width: gl.drawingBufferWidth,
				height: gl.drawingBufferHeight,
				style: {},
				addEventListener: () => {},
				removeEventListener: () => {},
				clientHeight: gl.drawingBufferHeight,
			} as unknown as HTMLCanvasElement,
			context: gl,
			alpha: true, // PENTING: Agar background transparan (kamera HP terlihat)
		});

		renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
		renderer.setClearColor(0x000000, 0); // Transparan total

		// 2. Buat Objek 3D (Contoh: Kubus Hijau)
		const geometry = new THREE.BoxGeometry(2, 2, 2);
		const material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true,
		});
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		// 3. Animasi Loop
		const render = () => {
			requestAnimationFrame(render);

			// Putar kubus biar terlihat 3D
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;

			renderer.render(scene, camera);
			gl.endFrameEXP();
		};

		render();
	};

	return (
		<View style={{ flex: 1 }}>
			<GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
		</View>
	);
}
