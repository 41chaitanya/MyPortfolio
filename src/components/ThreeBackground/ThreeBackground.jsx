import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

export default function ThreeBackground() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread particles in a large area
      positions[i3] = (Math.random() - 0.5) * 100;     // x
      positions[i3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i3 + 2] = (Math.random() - 0.5) * 100; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material
    const material = new THREE.PointsMaterial({
      color: 0xfafafa,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Second layer - smaller, dimmer particles
    const geometry2 = new THREE.BufferGeometry();
    const positions2 = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions2[i3] = (Math.random() - 0.5) * 150;
      positions2[i3 + 1] = (Math.random() - 0.5) * 150;
      positions2[i3 + 2] = (Math.random() - 0.5) * 150;
    }

    geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));

    const material2 = new THREE.PointsMaterial({
      color: 0x71717a,
      size: 0.08,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const particles2 = new THREE.Points(geometry2, material2);
    scene.add(particles2);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.001;

      // Rotate particles slowly
      particles.rotation.y = time * 0.1;
      particles.rotation.x = time * 0.05;
      
      particles2.rotation.y = time * 0.08;
      particles2.rotation.x = time * 0.03;

      // React to mouse
      particles.rotation.y += mouseX * 0.01;
      particles.rotation.x += mouseY * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      geometry2.dispose();
      material2.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-background" />;
}
