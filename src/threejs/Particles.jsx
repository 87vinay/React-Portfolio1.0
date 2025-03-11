import { useEffect, useRef } from "react";
import * as THREE from "three";

const Particles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio * 0.6);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    renderer.setClearColor(0x000000);

    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const particleCount = window.innerWidth > 768 ? 300 : 150;
    const geometry = new THREE.SphereGeometry(0.04, 12, 12);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const instancedMesh = new THREE.InstancedMesh(
      geometry,
      material,
      particleCount
    );
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      matrix.setPosition(x, y, z);
      instancedMesh.setMatrixAt(i, matrix);
    }

    particleGroup.add(instancedMesh);

    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameTime = 1000 / targetFPS;

    const animate = (time) => {
      if (time - lastFrameTime < frameTime) {
        requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = time;
      particleGroup.rotation.y += 0.002;
      particleGroup.rotation.x += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const handleResize = () => {
      if (!containerRef.current) return; 
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={containerRef} className="particle-container" />;
};

export default Particles;
