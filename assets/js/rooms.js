// assets/js/rooms.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// -----------------------------------------
// חומרים לרצפות/קירות
// -----------------------------------------
const floorMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x41a1f0,
  roughness: 0.8,
  metalness: 0.2,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1
});

const room1FloorMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x8B4513, // חום עץ
  roughness: 0.9,
  metalness: 0.1,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1
});

const room2FloorMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x808080, // אפור אבן
  roughness: 0.8,
  metalness: 0.3,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1
});

const room3FloorMaterial = new THREE.MeshStandardMaterial({ 
  color: 0x228B22, // ירוק יער
  roughness: 0.7,
  metalness: 0.1,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1
});

const wallMaterial = new THREE.MeshStandardMaterial({
  color: 0x9978bb,
  roughness: 0.7,
  metalness: 0.1
});

// -----------------------------------------
// טקסטורות עץ/אבן/יער פרוצדורליות
// -----------------------------------------
function createWoodTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // רקע בסיסי
  ctx.fillStyle = '#cd853f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // "עיניים" של עץ
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(101, 67, 33, ${Math.random() * 0.4})`;
    ctx.lineWidth = Math.random() * 10 + 5;
    const x = Math.random() * canvas.width;
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(
      x + Math.random() * 100 - 50, canvas.height / 3,
      x + Math.random() * 100 - 50, canvas.height * 2/3,
      x + Math.random() * 200 - 100, canvas.height
    );
    ctx.stroke();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createStoneTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#708090';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // כתמי אבן
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 50 + 10;
    ctx.beginPath();
    ctx.fillStyle = `rgba(50, 50, 50, ${Math.random() * 0.5})`;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

function createForestTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = '#556b2f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // אזוב/טחב
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 8 + 2;
    ctx.beginPath();
    ctx.fillStyle = `rgba(50, 205, 50, ${Math.random() * 0.3})`;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // כתמים כהים
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 15 + 5;
    ctx.beginPath();
    ctx.fillStyle = `rgba(0, 100, 0, ${Math.random() * 0.4})`;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

// -----------------------------------------
// חומרים לקירות החדרים עם הטקסטורות
// -----------------------------------------
const room1WallMaterial = new THREE.MeshStandardMaterial({
  color: 0xcd853f,
  roughness: 0.7,
  metalness: 0.1,
  map: createWoodTexture()
});

const room2WallMaterial = new THREE.MeshStandardMaterial({
  color: 0x708090,
  roughness: 0.8,
  metalness: 0.2,
  map: createStoneTexture()
});

const room3WallMaterial = new THREE.MeshStandardMaterial({
  color: 0x556b2f,
  roughness: 0.6,
  metalness: 0.1,
  map: createForestTexture()
});

// -----------------------------------------
// פונקציית createMap - מחזירה Group עם המפה
// -----------------------------------------
function createMap() {
  const map = new THREE.Group();
  
  const roomSize = 100;
  const corridorWidth = 20;
  
  // חדר ראשי (מרכז)
  const mainRoom = createRoom(
    new THREE.Vector3(0, 0, 0),
    roomSize,
    wallMaterial,
    floorMaterial,
    true
  );
  map.add(mainRoom);
  
  // חדר 1 (צפון)
  const room1 = createRoom(
    new THREE.Vector3(0, 0, -roomSize - corridorWidth),
    roomSize,
    room1WallMaterial,
    room1FloorMaterial,
    false
  );
  map.add(room1);
  
  // חדר 2 (מזרח)
  const room2 = createRoom(
    new THREE.Vector3(roomSize + corridorWidth, 0, 0),
    roomSize,
    room2WallMaterial,
    room2FloorMaterial,
    false
  );
  map.add(room2);
  
  // חדר 3 (מערב)
  const room3 = createRoom(
    new THREE.Vector3(-roomSize - corridorWidth, 0, 0),
    room3WallMaterial,
    room3FloorMaterial,
    false
  );
  map.add(room3);
  
  // מסדרון צפוני
  createCorridor(
    new THREE.Vector3(0, 0, -roomSize / 2),
    new THREE.Vector3(0, 0, -roomSize / 2 - corridorWidth),
    corridorWidth,
    wallMaterial
  ).forEach(elem => map.add(elem));
  
  // מסדרון מזרחי
  createCorridor(
    new THREE.Vector3(roomSize / 2, 0, 0),
    new THREE.Vector3(roomSize / 2 + corridorWidth, 0, 0),
    corridorWidth,
    wallMaterial
  ).forEach(elem => map.add(elem));
  
  // מסדרון מערבי
  createCorridor(
    new THREE.Vector3(-roomSize / 2, 0, 0),
    new THREE.Vector3(-roomSize / 2 - corridorWidth, 0, 0),
    corridorWidth,
    wallMaterial
  ).forEach(elem => map.add(elem));

  // רהיטים/קישוטים בכל חדר
  addFurniture(map, new THREE.Vector3(0, 0, 0), "main");
  addFurniture(map, new THREE.Vector3(0, 0, -roomSize - corridorWidth), "room1");
  addFurniture(map, new THREE.Vector3(roomSize + corridorWidth, 0, 0), "room2");
  addFurniture(map, new THREE.Vector3(-roomSize - corridorWidth, 0, 0), "room3");

  return map;
}

// -----------------------------------------
// פונקציות עזר: createRoom, createCorridor...
// -----------------------------------------
function createRoom(position, size, wallMat, floorMat, isMainRoom) {
  const room = new THREE.Group();
  
  // רצפה
  const floorGeometry = new THREE.PlaneGeometry(size, size);
  const floor = new THREE.Mesh(floorGeometry, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.copy(position);
  floor.receiveShadow = true;
  room.add(floor);
  
  // grid להמחשה
  const gridHelper = new THREE.GridHelper(size, 20, 0xffffff, 0xffffff);
  gridHelper.position.copy(position);
  gridHelper.position.y = 0.01;
  room.add(gridHelper);
  
  const wallHeight = 10;
  const wallThickness = 2;
  
  const createWallWithOpening = (width, height, depth, openingWidth, openingPosition, axis) => {
    const wallGroup = new THREE.Group();
    if (openingWidth > 0) {
      // פתח בקיר
      const section1Geometry = new THREE.BoxGeometry(
        axis === 'x' ? (openingPosition - openingWidth / 2) : width,
        height,
        axis === 'z' ? (openingPosition - openingWidth / 2) : depth
      );
      const section1 = new THREE.Mesh(section1Geometry, wallMat);
      section1.castShadow = true;
      section1.receiveShadow = true;
      section1.position[axis] =
        axis === 'x'
          ? -(width / 2 - (openingPosition - openingWidth / 2) / 2)
          : -(depth / 2 - (openingPosition - openingWidth / 2) / 2);
      wallGroup.add(section1);
      
      const remainingLength = axis === 'x' ? width : depth;
      const section2Size = remainingLength - (openingPosition + openingWidth / 2);
      if (section2Size > 0) {
        const section2Geometry = new THREE.BoxGeometry(
          axis === 'x' ? section2Size : width,
          height,
          axis === 'z' ? section2Size : depth
        );
        const section2 = new THREE.Mesh(section2Geometry, wallMat);
        section2.castShadow = true;
        section2.receiveShadow = true;
        section2.position[axis] =
          axis === 'x'
            ? (width / 2 - section2Size / 2)
            : (depth / 2 - section2Size / 2);
        wallGroup.add(section2);
      }
    } else {
      // קיר מלא
      const wallGeometry = new THREE.BoxGeometry(width, height, depth);
      const wallMesh = new THREE.Mesh(wallGeometry, wallMat);
      wallMesh.castShadow = true;
      wallMesh.receiveShadow = true;
      wallGroup.add(wallMesh);
    }
    return wallGroup;
  };
  
  // קירות (צפון, דרום, מזרח, מערב)
  const northWall = createWallWithOpening(size, wallHeight, wallThickness, isMainRoom ? 20 : 0, 0, 'x');
  northWall.position.set(position.x, wallHeight / 2, position.z - size / 2);
  room.add(northWall);
  
  const southWall = createWallWithOpening(size, wallHeight, wallThickness, 0, 0, 'x');
  southWall.position.set(position.x, wallHeight / 2 +10, position.z + size / 2);
  room.add(southWall);
  
  const eastWall = createWallWithOpening(wallThickness, wallHeight, size, isMainRoom ? 20 : 0, 0, 'z');
  eastWall.position.set(position.x + size / 2 , wallHeight / 2, position.z);
  room.add(eastWall);
  
  const westWall = createWallWithOpening(wallThickness, wallHeight, size, isMainRoom ? 20 : 0, 0, 'z');
  westWall.position.set(position.x - size / 2, wallHeight / 2, position.z);
  room.add(westWall);
  
  // תקרה
  const ceilingGeometry = new THREE.PlaneGeometry(size, size);
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.9,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.copy(position);
  ceiling.position.y = wallHeight;
  ceiling.receiveShadow = true;
  room.add(ceiling);
  
  return room;
}

function createCorridor(start, end, width, material) {
  const corridorElements = [];
  const direction = new THREE.Vector3().subVectors(end, start).normalize();
  const perp = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
  const length = start.distanceTo(end);
  const wallHeight = 10;
  const wallThickness = 2;
  
  // רצפה
  const floorGeometry = new THREE.PlaneGeometry(width, length);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xdadada,
    roughness: 0.8,
    metalness: 0.1,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  floor.position.copy(midpoint);
  const angle = Math.atan2(direction.x, direction.z);
  floor.rotation.y = angle;
  floor.receiveShadow = true;
  corridorElements.push(floor);
  
  // קירות שמאל/ימין
  const halfWidth = width / 2;
  
  const leftWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, length);
  const leftWall = new THREE.Mesh(leftWallGeometry, material);
  leftWall.position.copy(midpoint.clone().add(perp.clone().multiplyScalar(halfWidth)));
  leftWall.position.y = wallHeight / 2;
  leftWall.rotation.y = angle;
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  corridorElements.push(leftWall);
  
  const rightWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, length);
  const rightWall = new THREE.Mesh(rightWallGeometry, material);
  rightWall.position.copy(midpoint.clone().add(perp.clone().multiplyScalar(-halfWidth)));
  rightWall.position.y = wallHeight / 2;
  rightWall.rotation.y = angle;
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;
  corridorElements.push(rightWall);
  
  // תקרה
  const ceilingGeometry = new THREE.PlaneGeometry(width, length);
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.9,
    metalness: 0.1,
    side: THREE.DoubleSide
  });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.copy(midpoint);
  ceiling.position.y = wallHeight;
  ceiling.rotation.y = angle;
  ceiling.receiveShadow = true;
  corridorElements.push(ceiling);
  
  return corridorElements;
}

// -----------------------------------------
// רהיטים וקישוטים
// -----------------------------------------
function addFurniture(map, roomPosition, roomType) {
  const furnitureGroup = new THREE.Group();
  
  if (roomType === "main") {
    // מזרקה
    const fountainBase = new THREE.Mesh(
      new THREE.CylinderGeometry(8, 10, 2, 32),
      new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 })
    );
    fountainBase.position.set(roomPosition.x, 1, roomPosition.z);
    fountainBase.castShadow = true;
    fountainBase.receiveShadow = true;
    furnitureGroup.add(fountainBase);
    
    const fountainInner = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6, 0.5, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0x41a1f0, 
        roughness: 0.2, 
        metalness: 0.8,
        transparent: true,
        opacity: 0.8
      })
    );
    fountainInner.position.set(roomPosition.x, 2, roomPosition.z);
    furnitureGroup.add(fountainInner);
    
    // חלקיקי מים
    createWaterParticles(furnitureGroup, new THREE.Vector3(roomPosition.x, 2, roomPosition.z));
    
    // ספסלים
    const benchCount = 4;
    for (let i = 0; i < benchCount; i++) {
      const angle = (i / benchCount) * Math.PI * 2;
      const radius = 15;
      const benchPos = new THREE.Vector3(
        roomPosition.x + Math.sin(angle) * radius,
        0.5,
        roomPosition.z + Math.cos(angle) * radius
      );
      
      const bench = createBench();
      bench.position.copy(benchPos);
      bench.lookAt(roomPosition.x, benchPos.y, roomPosition.z);
      furnitureGroup.add(bench);
    }
  }
  else if (roomType === "room1") {
    // חדר ספרייה (מדפי ספרים, שולחן קריאה, כיסאות, נברשת...)
    // יצירת מדפים
    for (let i = -3; i <= 3; i += 2) {
      const bookshelf = createBookshelf();
      bookshelf.position.set(roomPosition.x + i * 12, 0, roomPosition.z - 40);
      bookshelf.rotation.y = Math.PI;
      furnitureGroup.add(bookshelf);
      
      if (i !== 0) {
        const bookshelf2 = createBookshelf();
        bookshelf2.position.set(roomPosition.x + i * 12, 0, roomPosition.z + 40);
        furnitureGroup.add(bookshelf2);
      }
    }
    
    // שולחן
    const tableGeo = new THREE.BoxGeometry(20, 1, 10);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x5c3c12,
      roughness: 0.8,
      metalness: 0.2
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(roomPosition.x, 1.5, roomPosition.z);
    table.castShadow = true;
    table.receiveShadow = true;
    furnitureGroup.add(table);
    
    // כיסאות
    const chairPositions = [
      new THREE.Vector3(roomPosition.x - 6, 0, roomPosition.z),
      new THREE.Vector3(roomPosition.x + 6, 0, roomPosition.z),
      new THREE.Vector3(roomPosition.x, 0, roomPosition.z - 6),
      new THREE.Vector3(roomPosition.x, 0, roomPosition.z + 6)
    ];
    chairPositions.forEach((pos, i) => {
      const chair = createChair();
      chair.position.copy(pos);
      chair.rotation.y = Math.PI / 2 * i;
      furnitureGroup.add(chair);
    });
    
    // ספרים על השולחן
    for (let i = 0; i < 3; i++) {
      const book = createBook();
      book.position.set(
        roomPosition.x - 5 + i * 5,
        2,
        roomPosition.z - 2 + Math.random() * 4
      );
      book.rotation.y = Math.random() * Math.PI * 2;
      furnitureGroup.add(book);
    }
    
    // נברשת
    const chandelier = createChandelier();
    chandelier.position.set(roomPosition.x, 7.5, roomPosition.z);
    furnitureGroup.add(chandelier);
  }
  else if (roomType === "room2") {
    // חדר אימונים: בובת אימונים, מתלה נשק, משטח, לפידים...
    const dummy = createTrainingDummy();
    dummy.position.set(roomPosition.x, 0, roomPosition.z);
    furnitureGroup.add(dummy);
    
    const rack = createWeaponRack();
    rack.position.set(roomPosition.x + 35, 0, roomPosition.z);
    rack.rotation.y = -Math.PI / 2;
    furnitureGroup.add(rack);
    
    const matGeo = new THREE.CircleGeometry(25, 32);
    const matMat = new THREE.MeshStandardMaterial({
      color: 0xCC0000,
      roughness: 0.9,
      metalness: 0.1
    });
    const mat = new THREE.Mesh(matGeo, matMat);
    mat.rotation.x = -Math.PI / 2;
    mat.position.set(roomPosition.x, 0.1, roomPosition.z);
    furnitureGroup.add(mat);
    
    // לפידים על הקירות
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const radius = 48;
      const torchPos = new THREE.Vector3(
        roomPosition.x + Math.sin(angle) * radius,
        5,
        roomPosition.z + Math.cos(angle) * radius
      );
      const torch = createTorch();
      torch.position.copy(torchPos);
      torch.lookAt(roomPosition.x, torchPos.y, roomPosition.z);
      furnitureGroup.add(torch);
      
      // אור מהלפיד
      const torchLight = new THREE.PointLight(0xFF5500, 0.7, 30);
      torchLight.position.copy(torchPos);
      torchLight.castShadow = true;
      furnitureGroup.add(torchLight);
    }
  }
  else if (roomType === "room3") {
    // חדר גן: בריכה, עצים, שיחים, גשר...
    const pondGeo = new THREE.CircleGeometry(15, 32);
    const pondMat = new THREE.MeshStandardMaterial({
      color: 0x3a85ad,
      roughness: 0.3,
      metalness: 0.8,
      transparent: true,
      opacity: 0.8
    });
    const pond = new THREE.Mesh(pondGeo, pondMat);
    pond.rotation.x = -Math.PI / 2;
    pond.position.set(roomPosition.x, 0.2, roomPosition.z);
    furnitureGroup.add(pond);
    
    // אבנים
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 16 + Math.random() * 2;
      const rockSize = Math.random() * 1.5 + 0.5;
      const rockGeo = new THREE.DodecahedronGeometry(rockSize, 0);
      const rockMat = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.9,
        metalness: 0.1
      });
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(
        roomPosition.x + Math.sin(angle) * radius,
        rockSize / 2,
        roomPosition.z + Math.cos(angle) * radius
      );
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      rock.castShadow = true;
      rock.receiveShadow = true;
      furnitureGroup.add(rock);
    }
    
    // עצים
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 30 + Math.random() * 10;
      const tree = createTree();
      tree.position.set(
        roomPosition.x + Math.sin(angle) * radius,
        0,
        roomPosition.z + Math.cos(angle) * radius
      );
      furnitureGroup.add(tree);
    }
    
    // שיחים
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 25 + Math.random() * 15;
      const bush = createBush();
      bush.position.set(
        roomPosition.x + Math.sin(angle) * radius,
        0,
        roomPosition.z + Math.cos(angle) * radius
      );
      bush.scale.set(
        0.7 + Math.random() * 0.6, 
        0.7 + Math.random() * 0.6, 
        0.7 + Math.random() * 0.6
      );
      furnitureGroup.add(bush);
    }
    
    // גשר
    const bridge = createBridge();
    bridge.position.set(roomPosition.x, 0.1, roomPosition.z);
    furnitureGroup.add(bridge);
    
    // צלילי אווירה
    createAmbientSounds(roomPosition);
  }
  
  map.add(furnitureGroup);
}

// -----------------------------------------
// פונקציות יצירת רהיטים ועצמים דקורטיביים
// -----------------------------------------
function createBench() {
  const bench = new THREE.Group();
  const seatGeometry = new THREE.BoxGeometry(4, 0.2, 1);
  const seatMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.2
  });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.set(0, 0.5, 0);
  seat.castShadow = true;
  seat.receiveShadow = true;
  bench.add(seat);

  // 4 רגליים
  for (let i = 0; i < 4; i++) {
    const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const leg = new THREE.Mesh(legGeometry, seatMaterial);
    leg.castShadow = true;
    leg.receiveShadow = true;
    const xOffset = (i < 2) ? -1.7 : 1.7;
    const zOffset = (i % 2 === 0) ? -0.4 : 0.4;
    leg.position.set(xOffset, 0.25, zOffset);
    bench.add(leg);
  }

  // משענת
  const backGeometry = new THREE.BoxGeometry(4, 1, 0.1);
  const back = new THREE.Mesh(backGeometry, seatMaterial);
  back.castShadow = true;
  back.receiveShadow = true;
  back.position.set(0, 1, -0.45);
  bench.add(back);

  return bench;
}

function createBookshelf() {
  const group = new THREE.Group();
  const shelfMat = new THREE.MeshStandardMaterial({
    color: 0x5c3c12,
    roughness: 0.8,
    metalness: 0.2
  });
  // שלד ראשי
  const frameGeo = new THREE.BoxGeometry(3, 6, 1);
  const frame = new THREE.Mesh(frameGeo, shelfMat);
  frame.position.y = 3;
  frame.castShadow = true;
  frame.receiveShadow = true;
  group.add(frame);

  // 4 מדפים פנימיים
  for (let i = 1; i <= 4; i++) {
    const shelfGeo = new THREE.BoxGeometry(2.8, 0.1, 0.95);
    const shelf = new THREE.Mesh(shelfGeo, shelfMat);
    shelf.position.set(0, i * (6 / 5), 0);
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    group.add(shelf);

    // ספרים קטנים על המדף
    for (let j = 0; j < 5; j++) {
      const book = createBook();
      book.scale.set(0.5, 0.5, 0.5);
      book.position.set(
        -1.2 + j * 0.6,
        i * (6 / 5) + 0.2,
        (Math.random() - 0.5) * 0.3
      );
      group.add(book);
    }
  }

  return group;
}

function createChair() {
  const chair = new THREE.Group();
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.2
  });
  const seatGeo = new THREE.BoxGeometry(1.5, 0.2, 1.5);
  const seat = new THREE.Mesh(seatGeo, seatMat);
  seat.position.y = 0.5;
  seat.castShadow = true;
  seat.receiveShadow = true;
  chair.add(seat);

  // 4 רגליים
  for (let i = 0; i < 4; i++) {
    const legGeo = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    const leg = new THREE.Mesh(legGeo, seatMat);
    const xOffset = (i < 2) ? -0.6 : 0.6;
    const zOffset = (i % 2 === 0) ? -0.6 : 0.6;
    leg.position.set(xOffset, 0.25, zOffset);
    leg.castShadow = true;
    leg.receiveShadow = true;
    chair.add(leg);
  }

  // משענת
  const backGeo = new THREE.BoxGeometry(1.5, 1, 0.1);
  const back = new THREE.Mesh(backGeo, seatMat);
  back.position.set(0, 1, -0.7);
  back.castShadow = true;
  back.receiveShadow = true;
  chair.add(back);

  return chair;
}

function createBook() {
  const bookGroup = new THREE.Group();
  const coverMat = new THREE.MeshStandardMaterial({
    color: Math.random() * 0xffffff,
    roughness: 0.7,
    metalness: 0.1
  });
  const coverGeo = new THREE.BoxGeometry(0.4, 0.05, 0.6);
  const cover = new THREE.Mesh(coverGeo, coverMat);
  cover.castShadow = true;
  cover.receiveShadow = true;
  bookGroup.add(cover);

  const pagesGeo = new THREE.BoxGeometry(0.38, 0.04, 0.58);
  const pagesMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9,
    metalness: 0
  });
  const pages = new THREE.Mesh(pagesGeo, pagesMat);
  pages.position.y = 0.002;
  bookGroup.add(pages);

  return bookGroup;
}

function createChandelier() {
  const chandelier = new THREE.Group();
  const baseGeo = new THREE.SphereGeometry(0.4, 16, 16);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xCCCCCC,
    roughness: 0.5,
    metalness: 0.8
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.castShadow = true;
  base.receiveShadow = true;
  base.position.y = -0.5;
  chandelier.add(base);

  // 4 זרועות
  for (let i = 0; i < 4; i++) {
    const armGeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
    const armMat = new THREE.MeshStandardMaterial({
      color: 0xAAAAAA,
      roughness: 0.4,
      metalness: 0.7
    });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.rotation.z = Math.PI / 2;
    arm.position.y = -0.5;
    const angle = (i / 4) * Math.PI * 2;
    arm.position.x = Math.cos(angle) * 0.5;
    arm.position.z = Math.sin(angle) * 0.5;
    chandelier.add(arm);

    // נר בקצה
    const candleGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8);
    const candleMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    const candle = new THREE.Mesh(candleGeo, candleMat);
    candle.position.set(arm.position.x, arm.position.y + 0.3, arm.position.z);
    chandelier.add(candle);

    // להבה
    const flameGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(arm.position.x, arm.position.y + 0.4, arm.position.z);
    chandelier.add(flame);
  }

  // שרשרת
  const chainGeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
  const chainMat = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.8,
    metalness: 0.5
  });
  const chain = new THREE.Mesh(chainGeo, chainMat);
  chain.position.y = 0;
  chandelier.add(chain);

  return chandelier;
}

function createTrainingDummy() {
  const dummy = new THREE.Group();
  
  // בסיס
  const baseGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 16);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.2
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.castShadow = true;
  base.receiveShadow = true;
  dummy.add(base);

  // "גוף" הבובה
  const torsoGeo = new THREE.CylinderGeometry(0.25, 0.25, 1, 16);
  const torsoMat = new THREE.MeshStandardMaterial({
    color: 0xd2b48c,
    roughness: 0.7,
    metalness: 0.1
  });
  const torso = new THREE.Mesh(torsoGeo, torsoMat);
  torso.position.y = 1;
  torso.castShadow = true;
  torso.receiveShadow = true;
  dummy.add(torso);

  // ראש
  const headGeo = new THREE.SphereGeometry(0.25, 16, 16);
  const head = new THREE.Mesh(headGeo, torsoMat);
  head.position.y = 1.75;
  head.castShadow = true;
  head.receiveShadow = true;
  dummy.add(head);

  // זרועות
  const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);
  for (let i = -1; i <= 1; i += 2) {
    const arm = new THREE.Mesh(armGeo, torsoMat);
    arm.rotation.z = Math.PI / 2;
    arm.position.set(i * 0.35, 1, 0);
    arm.castShadow = true;
    arm.receiveShadow = true;
    dummy.add(arm);
  }

  return dummy;
}

function createWeaponRack() {
  const rack = new THREE.Group();
  const rackMat = new THREE.MeshStandardMaterial({
    color: 0x5c3c12,
    roughness: 0.8,
    metalness: 0.2
  });

  for (let i = -1; i <= 1; i += 2) {
    const postGeo = new THREE.BoxGeometry(0.2, 3, 0.2);
    const post = new THREE.Mesh(postGeo, rackMat);
    post.position.set(i * 0.7, 1.5, 0);
    post.castShadow = true;
    post.receiveShadow = true;
    rack.add(post);
  }

  for (let yLevel of [0.5, 1.5, 2.5]) {
    const barGeo = new THREE.BoxGeometry(1.6, 0.1, 0.2);
    const bar = new THREE.Mesh(barGeo, rackMat);
    bar.position.set(0, yLevel, 0);
    bar.castShadow = true;
    bar.receiveShadow = true;
    rack.add(bar);
  }

  // "נשקים" דמה
  for (let i = 0; i < 3; i++) {
    const swordGeo = new THREE.BoxGeometry(0.05, 1, 0.1);
    const swordMat = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      roughness: 0.6,
      metalness: 0.8
    });
    const sword = new THREE.Mesh(swordGeo, swordMat);
    sword.position.set(-0.5 + i * 0.5, 1.5 + Math.random() * 0.3, 0.2);
    sword.rotation.z = Math.random() * 0.5 - 0.25;
    rack.add(sword);
  }

  return rack;
}

function createTorch() {
  const torch = new THREE.Group();
  const handleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x3d2314,
    roughness: 0.9,
    metalness: 0.1
  });
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.position.y = 0.5;
  handle.castShadow = true;
  handle.receiveShadow = true;
  torch.add(handle);

  const flameGeo = new THREE.SphereGeometry(0.15, 8, 8);
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xff6600 });
  const flame = new THREE.Mesh(flameGeo, flameMat);
  flame.position.y = 1.1;
  torch.add(flame);

  return torch;
}

function createTree() {
  const tree = new THREE.Group();
  const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 3, 8);
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.2
  });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 1.5;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  tree.add(trunk);

  const leavesGeo = new THREE.SphereGeometry(1.5, 16, 16);
  const leavesMat = new THREE.MeshStandardMaterial({
    color: 0x228B22,
    roughness: 0.6,
    metalness: 0.1
  });
  const leaves = new THREE.Mesh(leavesGeo, leavesMat);
  leaves.position.y = 3.5;
  leaves.castShadow = true;
  leaves.receiveShadow = true;
  tree.add(leaves);

  return tree;
}

function createBush() {
  const bush = new THREE.Group();
  const bushGeo = new THREE.SphereGeometry(1, 12, 12);
  const bushMat = new THREE.MeshStandardMaterial({
    color: 0x006400,
    roughness: 0.8,
    metalness: 0.1
  });
  const sphere = new THREE.Mesh(bushGeo, bushMat);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  bush.add(sphere);

  return bush;
}

function createBridge() {
  const bridge = new THREE.Group();
  const deckGeo = new THREE.BoxGeometry(6, 0.2, 2);
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.1
  });
  const deck = new THREE.Mesh(deckGeo, deckMat);
  deck.position.y = 0.1;
  deck.castShadow = true;
  deck.receiveShadow = true;
  bridge.add(deck);

  // מעקה בצדדים
  for (let i = -1; i <= 1; i += 2) {
    const railGeo = new THREE.BoxGeometry(6, 0.1, 0.1);
    const rail = new THREE.Mesh(railGeo, deckMat);
    rail.position.set(0, 0.6, i);
    bridge.add(rail);

    // עמודים לאורך המעקה
    for (let j = -2; j <= 2; j++) {
      const postGeo = new THREE.BoxGeometry(0.1, 0.6, 0.1);
      const post = new THREE.Mesh(postGeo, deckMat);
      post.position.set(j * 1.2, 0.3, i);
      post.castShadow = true;
      post.receiveShadow = true;
      bridge.add(post);
    }
  }

  return bridge;
}

function createAmbientSounds(roomPosition) {
  // מקום להטענת סאונד אם תרצה...
}

// חלקיקי מים (אפקט מזרקה)
function createWaterParticles(parentGroup, position) {
  const particleGeo = new THREE.SphereGeometry(0.05, 4, 4);
  const particleMat = new THREE.MeshBasicMaterial({ color: 0x41a1f0 });
  
  for (let i = 0; i < 20; i++) {
    const drop = new THREE.Mesh(particleGeo, particleMat);
    drop.position.set(
      position.x + (Math.random() - 0.5) * 2,
      position.y + Math.random() * 2,
      position.z + (Math.random() - 0.5) * 2
    );
    parentGroup.add(drop);
  }
}

export { createMap };
