import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

function createPerson() {
  const person = new THREE.Group();

  // Torso
  const torsoGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 32);
  const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0x1895cd, roughness: 0.7, metalness: 0.1 });
  const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
  torso.position.y = 1.0;
  torso.castShadow = true;
  person.add(torso);

  // Hips
  const hipGeometry = new THREE.CylinderGeometry(0.2, 0.21, 0.35, 32);
  const hipMaterial = new THREE.MeshStandardMaterial({ color: 0x1895cd, roughness: 0.8, metalness: 0.1 });
  const hip = new THREE.Mesh(hipGeometry, hipMaterial);
  hip.position.y = 0.6;
  hip.castShadow = true;
  person.add(hip);

  // Head
  const headGeometry = new THREE.SphereGeometry(0.165, 32, 32);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.7, metalness: 0.1 });
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 1.5;
  head.castShadow = true;
  person.add(head);

  // Neck
  const neckGeometry = new THREE.CylinderGeometry(0.06, 0.08, 0.15, 32);
  const neckMaterial = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.7, metalness: 0.1 });
  const neck = new THREE.Mesh(neckGeometry, neckMaterial);
  neck.position.y = 1.35;
  neck.castShadow = true;
  person.add(neck);

  // Hair
  const hairGeometry = new THREE.SphereGeometry(0.17, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const hairMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.9, metalness: 0.1 });
  const hair = new THREE.Mesh(hairGeometry, hairMaterial);
  hair.position.y = 1.5;
  hair.rotation.x = -Math.PI / 5;
  hair.castShadow = true;
  person.add(hair);

  // Eyes
  function createEye(x) {
    const eyeGroup = new THREE.Group();
    const eyeGeometry = new THREE.SphereGeometry(0.035, 16, 16);
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 });
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeGroup.add(eye);

    const irisGeometry = new THREE.SphereGeometry(0.025, 16, 16);
    const irisMaterial = new THREE.MeshStandardMaterial({ color: 0x3366ff, roughness: 0.3, metalness: 0.5 });
    const iris = new THREE.Mesh(irisGeometry, irisMaterial);
    iris.position.z = 0.025;
    eyeGroup.add(iris);

    const pupilGeometry = new THREE.SphereGeometry(0.015, 16, 16);
    const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.1, metalness: 0.1 });
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.z = 0.035;
    eyeGroup.add(pupil);

    eyeGroup.position.set(x, 1.52, 0.12);
    return eyeGroup;
  }
  const leftEye = createEye(0.06);
  const rightEye = createEye(-0.06);
  person.add(leftEye, rightEye);

  // Mouth
  const mouthGeometry = new THREE.BoxGeometry(0.07, 0.02, 0.01);
  const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xcc6666, roughness: 0.6, metalness: 0.1 });
  const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
  mouth.position.set(0, 1.44, 0.14);
  person.add(mouth);

  // Ears
  function createEar(x) {
    const earGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const earMaterial = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.7, metalness: 0.1 });
    const ear = new THREE.Mesh(earGeometry, earMaterial);
    ear.position.set(x, 1.5, 0);
    ear.scale.set(0.5, 1, 0.7);
    ear.castShadow = true;
    return ear;
  }
  const leftEar = createEar(0.15);
  const rightEar = createEar(-0.15);
  person.add(leftEar, rightEar);

  // Nose
  const noseGeometry = new THREE.SphereGeometry(0.02, 16, 16);
  const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.7, metalness: 0.1 });
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(0, 1.48, 0.14);
  nose.castShadow = true;
  person.add(nose);

  // Eyebrows
  const eyebrowGeometry = new THREE.BoxGeometry(0.05, 0.01, 0.01);
  const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.9, metalness: 0.1 });
  const leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
  leftEyebrow.position.set(0.06, 1.54, 0.12);
  leftEyebrow.rotation.z = -Math.PI / 18;
  leftEyebrow.castShadow = true;
  person.add(leftEyebrow);
  const rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial);
  rightEyebrow.position.set(-0.06, 1.54, 0.12);
  rightEyebrow.rotation.z = Math.PI / 18;
  rightEyebrow.castShadow = true;
  person.add(rightEyebrow);

  // Shoulders
  const shoulderGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const shoulderMaterial = torsoMaterial;
  const leftShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
  leftShoulder.position.set(0.25, 1.2, 0);
  leftShoulder.castShadow = true;
  person.add(leftShoulder);
  const rightShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
  rightShoulder.position.set(-0.25, 1.2, 0);
  rightShoulder.castShadow = true;
  person.add(rightShoulder);

  // Arms
  function createArm(x) {
    const armGroup = new THREE.Group();
    const upperArmGeometry = new THREE.CylinderGeometry(0.05, 0.045, 0.3, 16);
    const upperArm = new THREE.Mesh(upperArmGeometry, torsoMaterial);
    upperArm.position.y = -0.15;
    upperArm.castShadow = true;
    armGroup.add(upperArm);

    const elbowGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const elbow = new THREE.Mesh(elbowGeometry, torsoMaterial);
    elbow.position.y = -0.3;
    elbow.castShadow = true;
    armGroup.add(elbow);

    const forearmGeometry = new THREE.CylinderGeometry(0.045, 0.04, 0.3, 16);
    const forearmMaterial = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.7, metalness: 0.1 });
    const forearm = new THREE.Mesh(forearmGeometry, forearmMaterial);
    forearm.position.y = -0.45;
    forearm.castShadow = true;
    armGroup.add(forearm);

    const handGeometry = new THREE.SphereGeometry(0.045, 16, 16);
    const handMaterial = forearmMaterial;
    const hand = new THREE.Mesh(handGeometry, handMaterial);
    hand.position.y = -0.6;
    hand.scale.set(1, 0.8, 0.5);
    hand.castShadow = true;
    armGroup.add(hand);

    for (let i = 0; i < 5; i++) {
      const fingerGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.07, 8);
      const finger = new THREE.Mesh(fingerGeometry, handMaterial);
      const angle = (i - 2) * 0.2;
      finger.position.set(Math.sin(angle) * 0.03, -0.65, Math.cos(angle) * 0.03);
      finger.rotation.x = Math.PI / 2.5;
      finger.rotation.z = angle;
      finger.castShadow = true;
      armGroup.add(finger);
    }

    armGroup.position.set(x, 1.2, 0);
    return armGroup;
  }
  const leftArm = createArm(0.25);
  const rightArm = createArm(-0.25);
  person.add(leftArm, rightArm);

  // Legs
  function createLeg(x) {
    const legGroup = new THREE.Group();
    const thighGeometry = new THREE.CylinderGeometry(0.08, 0.07, 0.4, 16);
    const thighMaterial = new THREE.MeshStandardMaterial({ color: 0x0a5780, roughness: 0.8, metalness: 0.1 });
    const thigh = new THREE.Mesh(thighGeometry, thighMaterial);
    thigh.position.y = -0.2;
    thigh.castShadow = true;
    legGroup.add(thigh);

    const kneeGeometry = new THREE.SphereGeometry(0.07, 16, 16);
    const knee = new THREE.Mesh(kneeGeometry, thighMaterial);
    knee.position.y = -0.4;
    knee.castShadow = true;
    legGroup.add(knee);

    const calfGeometry = new THREE.CylinderGeometry(0.07, 0.05, 0.4, 16);
    const calf = new THREE.Mesh(calfGeometry, thighMaterial);
    calf.position.y = -0.6;
    calf.castShadow = true;
    legGroup.add(calf);

    const ankleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const ankle = new THREE.Mesh(ankleGeometry, thighMaterial);
    ankle.position.y = -0.8;
    ankle.scale.set(1, 0.6, 1);
    ankle.castShadow = true;
    legGroup.add(ankle);

    const footGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.15);
    const footMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9, metalness: 0.2 });
    const foot = new THREE.Mesh(footGeometry, footMaterial);
    foot.position.set(0, -0.85, 0.05);
    foot.castShadow = true;
    legGroup.add(foot);

    legGroup.position.set(x, 0.6, 0);
    return legGroup;
  }
  const leftLeg = createLeg(0.1);
  const rightLeg = createLeg(-0.1);
  person.add(leftLeg, rightLeg);

  return { person, torso, leftLeg, rightLeg, leftArm, rightArm };
}

class PersonController {
  constructor(externalCamera) {
    const { person, torso, leftLeg, rightLeg, leftArm, rightArm } = createPerson();
    this.person = person;
    this.torso = torso;
    this.leftLeg = leftLeg;
    this.rightLeg = rightLeg;
    this.leftArm = leftArm;
    this.rightArm = rightArm;
    // שימוש במצלמה שמגיעה מבחוץ במקום ליצור חדשה
    this.camera = externalCamera;

    this.keys = { w: false, a: false, s: false, d: false, " ": false, z: false, e: false, f: false };
    this.isLocked = false;
    this.cameraYaw = 0;
    this.cameraPitch = 0;
    this.zoomFactor = 1;
    this.minZoom = 0.5;
    this.maxZoom = 2;
    this.defaultOffset = new THREE.Vector3(0, 1.5, -3);
    this.moveSpeed = 4;
    this.walking = false;
    this.walkTime = 0;
    this.verticalVelocity = 10;
    this.isOnGround = true;
    this.jumpStrength = 16;
    this.gravity = 15;
    this.personHeight = 1.8;
    this.crouchHeight = 1.2;
    this.baseY = 0.275;
  }

  init(renderer) {
    renderer.domElement.addEventListener('click', () => {
      renderer.domElement.requestPointerLock();
    });
    document.addEventListener('pointerlockchange', () => {
      this.isLocked = document.pointerLockElement === renderer.domElement;
    });
    document.addEventListener('mousemove', (event) => {
      if (this.isLocked) {
        const deltaX = event.movementX || 0;
        const deltaY = event.movementY || 0;
        const sensitivity = 0.005;
        this.cameraYaw -= deltaX * sensitivity;
        this.cameraPitch += deltaY * sensitivity;
        const maxPitch = Math.PI / 3;
        this.cameraPitch = Math.max(-maxPitch, Math.min(maxPitch, this.cameraPitch));
      }
    });
    document.addEventListener('wheel', (event) => {
      const zoomSensitivity = 0.001;
      this.zoomFactor += event.deltaY * zoomSensitivity;
      this.zoomFactor = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoomFactor));
    });
    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if (key in this.keys) this.keys[key] = true;
    });
    window.addEventListener("keyup", (event) => {
      const key = event.key.toLowerCase();
      if (key in this.keys) this.keys[key] = false;
    });
  }

  updatePerson(delta, walls) {
    this.walking = false;
    const prevPosition = this.person.position.clone();

    // Movement
    if (this.keys.w) {
      const forward = new THREE.Vector3(0, 0, 5).applyQuaternion(this.person.quaternion);
      this.person.position.add(forward.multiplyScalar(this.moveSpeed * delta));
      this.walking = true;
    }
    if (this.keys.s) {
      const backward = new THREE.Vector3(0, 0, -5).applyQuaternion(this.person.quaternion);
      this.person.position.add(backward.multiplyScalar(this.moveSpeed * delta));
      this.walking = true;
    }
    if (this.keys.a) {
      const left = new THREE.Vector3(5, 1, 0).applyQuaternion(this.person.quaternion);
      this.person.position.add(left.multiplyScalar(this.moveSpeed * delta));
      this.walking = true;
    }
    if (this.keys.d) {
      const right = new THREE.Vector3(-5, 1, 0).applyQuaternion(this.person.quaternion);
      this.person.position.add(right.multiplyScalar(this.moveSpeed * delta));
      this.walking = true;
    }

    // Jumping (רק אם על הקרקע)
    if (this.keys[" "] && this.isOnGround) {
      this.verticalVelocity = this.jumpStrength;
      this.isOnGround = false;
    }

    // Crouching
    if (this.keys.z) {
      this.personHeight = this.crouchHeight;
    } else {
      this.personHeight = 1.5;
    }

    // Apply gravity
    this.verticalVelocity -= this.gravity * delta;
    this.person.position.y += this.verticalVelocity * delta;
    if (this.person.position.y <= this.baseY) {
      this.person.position.y = this.baseY;
      this.verticalVelocity = 0;
      this.isOnGround = true;
    }

    // Collision detection
    const personRadius = 0.4;
    const personBB = new THREE.Box3().setFromCenterAndSize(
      new THREE.Vector3(this.person.position.x, this.person.position.y + this.personHeight / 2, this.person.position.z),
      new THREE.Vector3(personRadius * 2, this.personHeight, personRadius * 2)
    );

    let collision = false;
    for (const wall of walls) {
      wall.updateWorldMatrix(true, false);
      const wallBB = new THREE.Box3().setFromObject(wall);
      if (personBB.intersectsBox(wallBB)) {
        collision = true;
        break;
      }
    }
    if (collision) {
      this.person.position.copy(prevPosition);
      this.walking = false;
    }

    // Walking animation
    if (this.walking) {
      this.walkTime += delta * 5;
      const legAngle = Math.sin(this.walkTime) * 0.4;
      const armAngle = Math.sin(this.walkTime) * 0.3;
      this.leftLeg.rotation.x = legAngle;
      this.rightLeg.rotation.x = -legAngle;
      this.leftArm.rotation.x = -armAngle;
      this.rightArm.rotation.x = armAngle;
      this.torso.rotation.z = Math.sin(this.walkTime) * 0.03;
      this.person.position.y = this.baseY + Math.abs(Math.sin(this.walkTime * 2)) * 0.03;
    } else {
      const breathingTime = Date.now() * 0.001;
      const breathingAmount = Math.sin(breathingTime) * 0.01;
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
      this.torso.position.y = 1.0 + breathingAmount;
      this.torso.rotation.z = 0;
      this.person.position.y = this.baseY;
    }
  }

  updateCamera() {
    // מסתובב לפי העכבר
    const cameraRotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(this.cameraPitch, this.cameraYaw, 0, 'YXZ')
    );
    const offset = this.defaultOffset.clone().applyQuaternion(cameraRotation);
    offset.multiplyScalar(this.zoomFactor);
    this.camera.position.copy(this.person.position).add(offset);

    // המצלמה מסתכלת לכיוון הדמות
    const targetPosition = this.person.position.clone();
    targetPosition.y += this.personHeight * 0.8;
    this.camera.lookAt(targetPosition);

    // מסובב את הדמות (רק סביב ציר Y)
    this.person.rotation.y = this.cameraYaw;
  }
}

export { PersonController };
