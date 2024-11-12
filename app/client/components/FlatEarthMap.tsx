 useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RootState } from '../store';
import { setCenter, setZoom, setRotation, setTilt } from '../slices/mapSlice';
import { MapTile } from '../../shared/types';

const FlatEarthMap: React.FC = () => {
  const mapState = useSelector((state: RootState) => state.map);
  const dispatch = useDispatch();
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Flat Earth disc
    const geometry = new THREE.CircleGeometry(5, 64);
    const material = new THREE.MeshBasicMaterial({ color: 0x1e90ff });
    const earthDisc = new THREE.Mesh(geometry, material);
    scene.add(earthDisc);

    // Antarctic ice wall
    const iceWallGeometry = new THREE.CylinderGeometry(5, 5, 0.2, 64, 1, true);
    const iceWallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const iceWall = new THREE.Mesh(iceWallGeometry, iceWallMaterial);
    iceWall.position.y = 0.1;
    scene.add(iceWall);

    // Camera position
    camera.position.z = 10;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.maxPolarAngle = Math.PI / 2;

    // Update state on control change
    controls.addEventListener('change', () => {
      dispatch(setCenter({ x: controls.target.x, y: controls.target.y }));
      dispatch(setZoom(camera.position.distanceTo(controls.target)));
      dispatch(setRotation(controls.getAzimuthalAngle()));
      dispatch(setTilt(controls.getPolarAngle()));
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      scene.remove(earthDisc);
      scene.remove(iceWall);
    };
  }, [dispatch]);

  useEffect(() => {
    // Update map based on mapState changes
    // This would involve updating the texture, position, etc.
  }, [mapState]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default FlatEarthMap;

