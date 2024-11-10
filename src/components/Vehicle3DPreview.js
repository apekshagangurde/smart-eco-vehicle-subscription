import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Vehicle3DPreview = ({ modelPath }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mountNode = mountRef.current;

        // Initialize scene, camera, and renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mountNode.clientWidth / mountNode.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
        mountNode.appendChild(renderer.domElement);

        // Add ambient and directional lighting
        scene.add(new THREE.AmbientLight(0x404040));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // Load vehicle model
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            model.scale.set(0.5, 0.5, 0.5);
            model.position.set(0, 0, 0);

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                model.rotation.y += 0.01;
                renderer.render(scene, camera);
            };
            animate();
        });

        camera.position.z = 5;

        // Handle cleanup
        return () => {
            if (mountNode) {
                mountNode.removeChild(renderer.domElement);
            }
        };
    }, [modelPath]);

    return (
        <div className="navbar">
            <div ref={mountRef} style={{ width: '100%', height: '500px', marginTop: '60px' }}></div>
        </div>
    );
};

export default Vehicle3DPreview;
