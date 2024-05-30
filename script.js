import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Configuración básica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Añadir luz
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Cargar el modelo GLTF
const loader = new GLTFLoader();
loader.load('jose_onega_room.gltf', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});

// Posicionar cámara
camera.position.z = 5;

// Añadir interactividad
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Calcula la posición del mouse en el espacio del clip
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Configurar raycaster
    raycaster.setFromCamera(mouse, camera);

    // Calcular intersecciones
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        // Redirigir a google.com al hacer clic en el objeto
        if (object.name === 'Walls') { // Reemplaza 'NombreDelObjeto' con el nombre real del objeto en tu modelo
            window.location.href = 'https://www.google.com';
        }
    }
}

window.addEventListener('click', onMouseClick);

// Animación
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();