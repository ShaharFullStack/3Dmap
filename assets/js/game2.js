// assets/js/game2.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { PersonController } from './person.js';
import { createCar3, createCar4, createCar1, createCar2 } from './cars.js';
import { updateDrivingCamera } from './camera.js';
import { createMap } from './rooms.js';  // ייבוא המפה

// הגדרת סצנה, מצלמה, רנדרר
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// טקסט הדרכה
const instructions = document.createElement('div');
instructions.style.position = 'absolute';
instructions.style.top = '10px';
instructions.style.width = '100%';
instructions.style.textAlign = 'center';
instructions.style.color = 'white';
instructions.innerHTML = 'לחץ על המסך כדי להתחיל';
document.body.appendChild(instructions);

const clock = new THREE.Clock();

// תאורות
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xfffaaf, 0x4444ff, 0.6);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 20, 57.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1.5;
directionalLight.shadow.camera.far = 500;
scene.add(directionalLight);

// פנס (למצב הליכה)
const flashlight = new THREE.SpotLight(0xffffff, 0);
flashlight.angle = Math.PI / 6;
flashlight.penumbra = 0.5;
flashlight.castShadow = true;
flashlight.distance = 50;
scene.add(flashlight);

const flashlightTarget = new THREE.Object3D();
scene.add(flashlightTarget);
flashlight.target = flashlightTarget;
let isFlashlightOn = false; // בורר מצב הפנס

// "שמיים" (Skybox)
const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
const skyUniforms = {
  minY: { value: 0 },
  maxY: { value: 500 },
  colorBottom: { value: new THREE.Color('#ADD8E6') },
  colorTop: { value: new THREE.Color('#000080') }
};
const skyMaterial = new THREE.ShaderMaterial({
  uniforms: skyUniforms,
  vertexShader: `
    varying float vY;
    void main() {
      vY = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying float vY;
    uniform float minY;
    uniform float maxY;
    uniform vec3 colorBottom;
    uniform vec3 colorTop;
    void main() {
      float t = (vY - minY) / (maxY - minY);
      t = clamp(t, 0.0, 1.0);
      vec3 color = mix(colorBottom, colorTop, t);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
  side: THREE.BackSide
});
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// רצפה
const groundGeometry = new THREE.PlaneGeometry(300, 300);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x41a1f0,
  roughness: 0.8,
  metalness: 0.2
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Grid להמחשה
const gridHelper = new THREE.GridHelper(300, 30, 0xffffff, 0xffffff);
gridHelper.position.y = 0.01;
scene.add(gridHelper);

// יצירת המפה
const fullMap = createMap();
scene.add(fullMap);

// פונקציה לאיסוף קירות (BoxGeometry)
function findWalls(rootObject) {
  const walls = [];
  rootObject.traverse((child) => {
    if (child.isMesh && child.geometry && child.geometry.type === 'BoxGeometry') {
      walls.push(child);
    }
  });
  return walls;
}
const allWalls = findWalls(fullMap);

// יצירת הדמות
const personController = new PersonController(camera);
scene.add(personController.person);
personController.init(renderer);

// יצירת רכבים
const carPositions = [
  { x: 10, z: 10 },
  { x: -10, z: -10 },
  { x: 20, z: 20 },
  { x: -20, z: -20 }
];
const cars = carPositions.map((pos, index) => {
  const carCreator = [createCar1, createCar2, createCar3, createCar4][index % 4];
  const car = carCreator();
  car.position.set(pos.x, 0, pos.z);
  scene.add(car);
  return car;
});

// משתני מצב
let isDriving = false;
let activeCar = null;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// משתני מצלמה לנהיגה
let drivingCameraYaw = 0;
let drivingCameraPitch = 0;
let drivingZoom = 1;
const minZoomCam = 0.5;
const maxZoomCam = 2;

// Pointer Lock למצב הליכה
renderer.domElement.addEventListener('click', () => {
  if (!isDriving && !personController.isLocked) {
    renderer.domElement.requestPointerLock();
    instructions.style.display = 'none';
  }
});

// אירועי עכבר למצב נהיגה
document.addEventListener('mousedown', (event) => {
  if (isDriving) {
    isDragging = true;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;
  }
});
document.addEventListener('mouseup', () => {
  isDragging = false;
});
document.addEventListener('mousemove', (event) => {
  if (isDriving && isDragging) {
    const sensitivity = 0.005;
    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;
    previousMousePosition.x = event.clientX;
    previousMousePosition.y = event.clientY;

    drivingCameraYaw += deltaX * sensitivity;
    drivingCameraPitch += deltaY * sensitivity;
    drivingCameraPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, drivingCameraPitch));
  }
});

// גלגלת זום במצב נהיגה
document.addEventListener('wheel', (event) => {
  if (isDriving) {
    const zoomSensitivity = 0.001;
    drivingZoom += event.deltaY * zoomSensitivity;
    drivingZoom = Math.max(minZoomCam, Math.min(maxZoomCam, drivingZoom));
  }
});

// משתני פיזיקה לרכב
const carPhysics = {
  acceleration: 15,
  maxSpeed: 40,
  braking: 30,
  friction: 10,
  turnSpeed: 2.5,
  turnSpeedFactor: 0.8,
  driftFactor: 0.05,
  currentSpeed: 0,
  steering: 0
};

function updateCar(delta) {
  const prevPosition = activeCar.position.clone();

  // "בלם יד" עם מקש רווח
  if (personController.keys[' ']) {
    if (carPhysics.currentSpeed > 0) {
      carPhysics.currentSpeed -= carPhysics.braking * delta;
    } else if (carPhysics.currentSpeed < 0) {
      carPhysics.currentSpeed += carPhysics.braking * delta;
    }
    if (Math.abs(carPhysics.currentSpeed) < 0.1) {
      carPhysics.currentSpeed = 0;
    }
  } else {
    // האצה/חיכוך/בלימה
    if (personController.keys.w) {
      carPhysics.currentSpeed += carPhysics.acceleration * delta;
    } else if (personController.keys.s) {
      carPhysics.currentSpeed -= carPhysics.acceleration * delta;
    } else {
      // חיכוך בסיסי
      if (carPhysics.currentSpeed > 0) {
        carPhysics.currentSpeed -= carPhysics.friction * delta;
      } else if (carPhysics.currentSpeed < 0) {
        carPhysics.currentSpeed += carPhysics.friction * delta;
      }
      if (Math.abs(carPhysics.currentSpeed) < 0.1) {
        carPhysics.currentSpeed = 0;
      }
    }
  }

  // הגבלת מהירות
  carPhysics.currentSpeed = Math.max(
    -carPhysics.maxSpeed / 2,
    Math.min(carPhysics.maxSpeed, carPhysics.currentSpeed)
  );

  // תזוזה
  const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(activeCar.quaternion);
  const velocity = forward.multiplyScalar(carPhysics.currentSpeed);
  activeCar.position.add(velocity.clone().multiplyScalar(delta));

  // פנייה
  const turnFactor =
    1 - (Math.abs(carPhysics.currentSpeed) / carPhysics.maxSpeed) * carPhysics.turnSpeedFactor;
  const effectiveTurnSpeed = carPhysics.turnSpeed * turnFactor;
  if (personController.keys.a) {
    activeCar.rotation.y += effectiveTurnSpeed * delta * (carPhysics.currentSpeed > 0 ? 1 : -1);
  }
  if (personController.keys.d) {
    activeCar.rotation.y -= effectiveTurnSpeed * delta * (carPhysics.currentSpeed > 0 ? 1 : -1);
  }

  // בדיקת התנגשות עם קירות
  activeCar.updateWorldMatrix(true, false);
  const carBB = new THREE.Box3().setFromObject(activeCar);
  for (const wall of allWalls) {
    wall.updateWorldMatrix(true, false);
    const wallBB = new THREE.Box3().setFromObject(wall);
    if (carBB.intersectsBox(wallBB)) {
      activeCar.position.copy(prevPosition);
      carPhysics.currentSpeed *= -0.6;
      break;
    }
  }
}

function switchMode() {
  if (isDriving) {
    // יציאה ממצב נהיגה
    isDriving = false;
    personController.person.visible = true;
    const offset = new THREE.Vector3(2, 0, 0).applyQuaternion(activeCar.quaternion);
    personController.person.position.copy(activeCar.position).add(offset);
    activeCar = null;
  } else {
    // כניסה למצב נהיגה אם רכב קרוב מספיק
    const nearCar = cars.find((car) => personController.person.position.distanceTo(car.position) < 5);
    if (nearCar && personController.keys.e) {
      isDriving = true;
      personController.person.visible = false;
      activeCar = nearCar;
      carPhysics.currentSpeed = 0;
    }
  }
}

// לולאת אנימציה
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (isDriving) {
    // מצב נהיגה
    updateCar(delta);
    updateDrivingCamera(camera, activeCar, drivingCameraYaw, drivingCameraPitch, drivingZoom);
  } else {
    // מצב הליכה
    personController.updatePerson(delta, allWalls);
    personController.updateCamera();

    // עדכון מיקום הפנס ו-Target
    flashlight.position.copy(camera.position);
    flashlightTarget.position.copy(personController.person.position);
    flashlightTarget.position.y += personController.personHeight * 0.8;

    // בדיקה אם המשתמש לחץ על 'f' -> הדלקה/כיבוי של הפנס
    if (personController.keys.f) {
      isFlashlightOn = !isFlashlightOn;
      flashlight.intensity = isFlashlightOn ? 1 : 0;
      personController.keys.f = false; // איפוס
    }
  }

  // בדיקה אם המשתמש לחץ e (מעבר/יציאה ממצב נהיגה)
  if (personController.keys.e) {
    switchMode();
    personController.keys.e = false;
  }

  renderer.render(scene, camera);
}
animate();

// התאמת מסך
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
