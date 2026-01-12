import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

export default function ThreeBackground() {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Position - spread particles in a sphere
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 50;

      // Colors - white/gray tones
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i3] = brightness;
      colors[i3 + 1] = brightness;
      colors[i3 + 2] = brightness;

      // Sizes
      sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Particle material
    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Add connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(300 * 6); // 300 lines, 2 points each
    
    for (let i = 0; i < 300; i++) {
      const i6 = i * 6;
      const radius1 = 30 + Math.random() * 40;
      const radius2 = 30 + Math.random() * 40;
      const theta1 = Math.random() * Math.PI * 2;
      const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
      const phi1 = Math.acos(2 * Math.random() - 1);
      const phi2 = phi1 + (Math.random() - 0.5) * 0.3;

      linePositions[i6] = radius1 * Math.sin(phi1) * Math.cos(theta1);
      linePositions[i6 + 1] = radius1 * Math.sin(phi1) * Math.sin(theta1);
      linePositions[i6 + 2] = radius1 * Math.cos(phi1) - 50;
      
      linePositions[i6 + 3] = radius2 * Math.sin(phi2) * Math.cos(theta2);
      linePositions[i6 + 4] = radius2 * Math.sin(phi2) * Math.sin(theta2);
      linePositions[i6 + 5] = radius2 * Math.cos(phi2) - 50;
    }

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xfafafa,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
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
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate particles slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
        
        // React to mouse
        particlesRef.current.rotation.y += mouseRef.current.x * 0.0005;
        particlesRef.current.rotation.x += mouseRef.current.y * 0.0005;
      }

      // Rotate lines
      lines.rotation.y += 0.0003;
      lines.rotation.x += 0.0001;
      lines.rotation.y += mouseRef.current.x * 0.0003;
      lines.rotation.x += mouseRef.current.y * 0.0003;

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
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-background" />;
}
