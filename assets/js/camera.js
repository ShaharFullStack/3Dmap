// camera.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

 function updateWalkingCamera(camera, person, yaw, pitch, flashlight, flashlightTarget) {
  person.rotation.y = yaw;
  let cameraRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(pitch, 0, 0, 'YXZ'));
  const totalRotation = person.quaternion.clone().multiply(cameraRotation);
  const offset = new THREE.Vector3(0, 3.5, -4).applyQuaternion(totalRotation);
  camera.position.copy(person.position).add(offset);
  const targetPosition = person.position.clone();
  targetPosition.y += 1.5;
  camera.lookAt(targetPosition);

  // עדכון מיקום הפנס
  const headPosition = person.children.find(child => child.geometry.type === 'SphereGeometry').getWorldPosition(new THREE.Vector3());
  flashlight.position.copy(headPosition);
  flashlightTarget.position.copy(flashlight.position.clone().add(new THREE.Vector3(0, 0, 1).applyQuaternion(totalRotation)));
}

 function updateDrivingCamera(camera, car, yaw, pitch, zoom) {
  let cameraRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(pitch, yaw, 0, 'YXZ'));
  const totalRotation = car.quaternion.clone().multiply(cameraRotation);
  const offset = new THREE.Vector3(0, 5, -10).applyQuaternion(totalRotation);
  offset.multiplyScalar(zoom);
  camera.position.copy(car.position).add(offset);
  camera.lookAt(car.position);
}

export {updateDrivingCamera, updateWalkingCamera};