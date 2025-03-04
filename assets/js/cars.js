import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

function createCar1() {
    const car = new THREE.Group();
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return (r << 16) | (g << 8) | b;
    }
    const colors = {
        car: {
            body: getRandomColor(), // צבע הרכב הראשי
            wheels: getRandomColor(), // צבע הגלגלים
            cabin: getRandomColor(), // צבע התא הנוסעים
            windows: getRandomColor(), // צבע החלונות
            headlights: getRandomColor(), // צבע הכיוונים
            exhaust: getRandomColor(), // צבע המפלס
            spoiler: getRandomColor(), // צבע הספולר
            grill: getRandomColor(), // צבע הגריל
            roof: getRandomColor(), // צבע הרוב
            wheels: getRandomColor(), // צבע הגלגלים
        }
    }
    // Car body - main chassis
    const bodyGeometry = new THREE.BoxGeometry(2, 0.4, 5);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.body,
        metalness: 0.5,
        roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    body.castShadow = true;
    car.add(body);
    
    // Cabin
    const cabinGeometry = new THREE.BoxGeometry(1.8, 0.5, 2.5);
    const cabinMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.body,
        metalness: 0.5,
        roughness: 0.2
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(0, 1.05, 0);
    cabin.castShadow = true;
    car.add(cabin);
    
    // Hood
    const hoodGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.position.set(0, 0.65, 1.75);
    car.add(hood);
    
    // Trunk
    const trunkGeometry = new THREE.BoxGeometry(2, 0.1, 1.5);
    const trunk = new THREE.Mesh(trunkGeometry, bodyMaterial);
    trunk.position.set(0, 0.65, -1.75);
    car.add(trunk);
    
    // Windows
    const windshieldGeometry = new THREE.PlaneGeometry(1.7, 0.5);
    const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.windows,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7
    });
    
    const frontWindshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
    frontWindshield.position.set(0, 1.0, 1.25);
    frontWindshield.rotation.x = Math.PI * 0.1;
    car.add(frontWindshield);
    
    const rearWindshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
    rearWindshield.position.set(0, 1.0, -1.25);
    rearWindshield.rotation.x = -Math.PI * 0.1;
    car.add(rearWindshield);
    
    const sideWindowGeometry = new THREE.PlaneGeometry(0.8, 0.3);
    
    const leftWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow1.position.set(-0.9, 1.0, 0.5);
    leftWindow1.rotation.y = Math.PI * 0.5;
    car.add(leftWindow1);
    
    const rightWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow1.position.set(0.9, 1.0, 0.5);
    rightWindow1.rotation.y = -Math.PI * 0.5;
    car.add(rightWindow1);
    
    const leftWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow2.position.set(-0.9, 1.0, -0.5);
    leftWindow2.rotation.y = Math.PI * 0.5;
    car.add(leftWindow2);
    
    const rightWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow2.position.set(0.9, 1.0, -0.5);
    rightWindow2.rotation.y = -Math.PI * 0.5;
    car.add(rightWindow2);
    
    // Wheels (unchanged)
    function createWheel() {
        const wheelGroup = new THREE.Group();
        
        const tireGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
        tireGeometry.rotateZ(Math.PI / 2);
        const tireMaterial = new THREE.MeshStandardMaterial({ 
            color: colors.car.wheels,
            roughness: 0.9
        });
        const tire = new THREE.Mesh(tireGeometry, tireMaterial);
        tire.castShadow = true;
        wheelGroup.add(tire);
        
        const rimGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.22, 8);
        rimGeometry.rotateZ(Math.PI / 2);
        const rimMaterial = new THREE.MeshStandardMaterial({ 
            color: getRandomColor(),
            metalness: 0.8,
            roughness: 0.2
        });
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        wheelGroup.add(rim);
        
        for (let i = 0; i < 5; i++) {
            const spokeGeometry = new THREE.BoxGeometry(0.05, 0.22, 0.05);
            const spoke = new THREE.Mesh(spokeGeometry, rimMaterial);
            spoke.rotation.z = (i / 5) * Math.PI * 2;
            spoke.position.x = Math.cos(spoke.rotation.z) * 0.1;
            spoke.position.y = Math.sin(spoke.rotation.z) * 0.1;
            rim.add(spoke);
        }
        
        return wheelGroup;
    }
    
    const wheelPositions = [
        { x: -0.9, y: 0.4, z: 1.2 },
        { x: 0.9, y: 0.4, z: 1.2 },
        { x: -0.9, y: 0.4, z: -1.2 },
        { x: 0.9, y: 0.4, z: -1.2 }
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = createWheel();
        wheel.position.set(pos.x, pos.y, pos.z);
        car.add(wheel);
    });
    
    // Headlights with housing
    const headlightHousingGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.1);
    const headlightHousingMaterial = new THREE.MeshStandardMaterial({ color: getRandomColor() });
    
    const leftHeadlightHousing = new THREE.Mesh(headlightHousingGeometry, headlightHousingMaterial);
    leftHeadlightHousing.position.set(-0.8, 0.5, 2.45);
    car.add(leftHeadlightHousing);
    
    const rightHeadlightHousing = new THREE.Mesh(headlightHousingGeometry, headlightHousingMaterial);
    rightHeadlightHousing.position.set(0.8, 0.5, 2.45);
    car.add(rightHeadlightHousing);
    
    const headlightGeometry = new THREE.PlaneGeometry(0.25, 0.15);
    const headlightMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.lights,
        emissive: colors.car.lights,
        emissiveIntensity: 0.5
    });
    
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-0.8, 0.5, 2.46);
    leftHeadlight.rotation.y = Math.PI;
    car.add(leftHeadlight);
    
    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(0.8, 0.5, 2.46);
    rightHeadlight.rotation.y = Math.PI;
    car.add(rightHeadlight);
    
    // Taillights (unchanged)
    const taillightMaterial = new THREE.MeshStandardMaterial({ 
        color: getRandomColor(),
        emissive: getRandomColor(),
        emissiveIntensity: 0.5
    });
    
    const leftTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial);
    leftTaillight.position.set(-0.6, 0.5, -2);
    car.add(leftTaillight);
    
    const rightTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial);
    rightTaillight.position.set(0.6, 0.5, -2);
    car.add(rightTaillight);
    
    // Exhaust pipes
    const exhaustGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8);
    const exhaustMaterial = new THREE.MeshStandardMaterial({ color: getRandomColor() });
    
    const leftExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    leftExhaust.position.set(-0.5, 0.3, -2.4);
    leftExhaust.rotation.x = Math.PI / 2;
    car.add(leftExhaust);
    
    const rightExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    rightExhaust.position.set(0.5, 0.3, -2.4);
    rightExhaust.rotation.x = Math.PI / 2;
    car.add(rightExhaust);
    
    // Spoiler (unchanged)
    const spoilerStandGeometry = new THREE.BoxGeometry(1.4, 0.1, 0.1);
    const spoilerMaterial = new THREE.MeshStandardMaterial({ 
        color: getRandomColor(),
        metalness: 0.5,
        roughness: 0.5
    });
    
    const leftSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    leftSpoilerStand.position.set(-0.6, 0.8, -1.9);
    leftSpoilerStand.scale.set(0.1, 1, 1);
    car.add(leftSpoilerStand);
    
    const rightSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    rightSpoilerStand.position.set(0.6, 0.8, -1.9);
    rightSpoilerStand.scale.set(0.1, 1, 1);
    car.add(rightSpoilerStand);
    
    const spoilerWingGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.3);
    const spoilerWing = new THREE.Mesh(spoilerWingGeometry, spoilerMaterial);
    spoilerWing.position.set(0, 1.1, -1.9);
    car.add(spoilerWing);
    
    car.castShadow = true;
    car.receiveShadow = true;
    
    return car;
}

function createCar2() {
    const car = new THREE.Group();
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return (r << 16) | (g << 8) | b;
    }
    const colors = {
        car: {
            body: getRandomColor(), // צבע הרכב הראשי
            wheels: getRandomColor(), // צבע הגלגלים
            cabin: getRandomColor(), // צבע התא הנוסעים
            windows: getRandomColor(), // צבע החלונות
            headlights: getRandomColor(), // צבע הכיוונים
            exhaust: getRandomColor(), // צבע המפלס
            spoiler: getRandomColor(), // צבע הספולר
            grill: getRandomColor(), // צבע הגריל
            roof: getRandomColor(), // צבע הרוב
            wheels: getRandomColor(), // צבע הגלגלים
        }
    }
    // Car body - main chassis
    const bodyGeometry = new THREE.BoxGeometry(2, 0.6, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.body,
        metalness: 0.5,
        roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.7;
    body.castShadow = true;
    car.add(body);
    
    // Car top/roof
    const roofGeometry = new THREE.BoxGeometry(1.6, 0.3, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.body,
        metalness: 0.5,
        roughness: 0.2
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.1;
    roof.position.z = -0.2;
    roof.castShadow = true;
    car.add(roof);
    
    // Windows
    const windshieldGeometry = new THREE.PlaneGeometry(1.7, 0.5);
    const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.windows,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7
    });
    
    // Front windshield
    const frontWindshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
    frontWindshield.position.set(0, 0.9, 0.8);
    frontWindshield.rotation.x = Math.PI * 0.1;
    car.add(frontWindshield);
    
    // Rear windshield
    const rearWindshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
    rearWindshield.position.set(0, 0.2, -1.2);
    rearWindshield.rotation.x = -Math.PI * 0.1;
    car.add(rearWindshield);
    
    // Side windows
    const sideWindowGeometry = new THREE.PlaneGeometry(0.8, 0.3);
    
    const leftWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow1.position.set(-0.95, 0.9, 0.2);
    leftWindow1.rotation.y = Math.PI * 0.5;
    car.add(leftWindow1);
    
    const rightWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow1.position.set(0.95, 0.9, 0.2);
    rightWindow1.rotation.y = -Math.PI * 0.5;
    car.add(rightWindow1);
    
    const leftWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow2.position.set(-0.95, 0.9, -0.5);
    leftWindow2.rotation.y = Math.PI * 0.5;
    car.add(leftWindow2);
    
    const rightWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow2.position.set(0.95, 0.9, -0.5);
    rightWindow2.rotation.y = -Math.PI * 0.5;
    car.add(rightWindow2);
    
    // Create wheels
    function createWheel() {
        const wheelGroup = new THREE.Group();
        
        // Tire
        const tireGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 16);
        tireGeometry.rotateZ(Math.PI / 2);
        const tireMaterial = new THREE.MeshStandardMaterial({ 
            color: colors.car.wheels,
            roughness: 0.9
        });
        const tire = new THREE.Mesh(tireGeometry, tireMaterial);
        tire.castShadow = true;
        wheelGroup.add(tire);
        
        // Rim
        const rimGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.22, 8);
        rimGeometry.rotateZ(Math.PI / 2);
        const rimMaterial = new THREE.MeshStandardMaterial({ 
            color: getRandomColor(),
            metalness: 0.8,
            roughness: 0.2
        });
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        wheelGroup.add(rim);
        
        // Spokes
        for (let i = 0; i < 5; i++) {
            const spokeGeometry = new THREE.BoxGeometry(0.05, 0.22, 0.05);
            const spoke = new THREE.Mesh(spokeGeometry, rimMaterial);
            spoke.rotation.z = (i / 5) * Math.PI * 2;
            spoke.position.x = Math.cos(spoke.rotation.z) * 0.1;
            spoke.position.y = Math.sin(spoke.rotation.z) * 0.1;
            rim.add(spoke);
        }
        
        return wheelGroup;
    }
    
    // Add wheels to the car
    const wheelPositions = [
        { x: -0.9, y: 0.4, z: 1.2 },   // Front Left
        { x: 0.9, y: 0.4, z: 1.2 },    // Front Right
        { x: -0.9, y: 0.4, z: -1.2 },  // Rear Left
        { x: 0.9, y: 0.4, z: -1.2 }    // Rear Right
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = createWheel();
        wheel.position.set(pos.x, pos.y, pos.z);
        car.add(wheel);
    });
    
    // Headlights
    const headlightGeometry = new THREE.CircleGeometry(0.15, 16);
    const headlightMaterial = new THREE.MeshStandardMaterial({ 
        color: colors.car.lights,
        emissive: colors.car.lights,
        emissiveIntensity: 0.5
    });
    
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-0.6, 0.5, 2);
    leftHeadlight.rotation.y = Math.PI;
    car.add(leftHeadlight);
    
    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(0.6, 0.5, 2);
    rightHeadlight.rotation.y = Math.PI;
    car.add(rightHeadlight);
    
    // Taillights
    const taillightMaterial = new THREE.MeshStandardMaterial({ 
        color: getRandomColor(),
        emissive: getRandomColor(),
        emissiveIntensity: 0.5
    });
    
    const leftTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial);
    leftTaillight.position.set(-0.6, 0.5, -2);
    car.add(leftTaillight);
    
    const rightTaillight = new THREE.Mesh(headlightGeometry, taillightMaterial);
    rightTaillight.position.set(0.6, 0.5, -2);
    car.add(rightTaillight);
    
    // Add a small spoiler at the back
    const spoilerStandGeometry = new THREE.BoxGeometry(1.4, 0.1, 0.1);
    const spoilerMaterial = new THREE.MeshStandardMaterial({ 
        color: getRandomColor(),
        metalness: 0.5, 
        roughness: 0.5
    });
    
    // Spoiler stands
    const leftSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    leftSpoilerStand.position.set(-0.6, 0.8, -1.9);
    leftSpoilerStand.scale.set(0.1, 1, 1);
    car.add(leftSpoilerStand);
    
    const rightSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    rightSpoilerStand.position.set(0.6, 0.8, -1.9);
    rightSpoilerStand.scale.set(0.1, 1, 1);
    car.add(rightSpoilerStand);
    
    // Spoiler wing
    const spoilerWingGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.3);
    const spoilerWing = new THREE.Mesh(spoilerWingGeometry, spoilerMaterial);
    spoilerWing.position.set(0, 1.1, -1.9);
    car.add(spoilerWing);
    
    car.position.y = 0.4; // Adjust to sit properly on ground
    car.castShadow = true;
    car.receiveShadow = true;
    
    return car;
}

function createCar3() {
    const car = new THREE.Group();
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return (r << 16) | (g << 8) | b;
    }
    const colors = {
        car: {
            body: getRandomColor(), // צבע הרכב הראשי
            wheels: getRandomColor(), // צבע הגלגלים
            cabin: getRandomColor(), // צבע התא הנוסעים
            windows: getRandomColor(), // צבע החלונות
            headlights: getRandomColor(), // צבע הכיוונים
            exhaust: getRandomColor(), // צבע המפלס
            spoiler: getRandomColor(), // צבע הספולר
            grill: getRandomColor(), // צבע הגריל
            roof: getRandomColor(), // צבע הרוב
            wheels: getRandomColor(), // צבע הגלגלים
        }
    }
    // **גוף הרכב הראשי - חלק תחתון**
    const bodyGeometry = new THREE.BoxGeometry(1.5, 0.8, 4); // רוחב: 2, גובה: 0.5, אורך: 4
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.body,
        metalness: 0.7,
        roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.7; // מרכז הגוף בגובה 0.25 (חצי מהגובה 0.5)
    body.castShadow = true;
    car.add(body);

    // **תא הנוסעים (Cabin) - חלק עליון**
    const cabinGeometry = new THREE.BoxGeometry(1.7, 1, 2); // רוחב: 1.8, גובה: 0.4, אורך: 2.5
    const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial);
    cabin.position.set(0, 0.9, -1); // ממוקם מעל הגוף, במרכז לאורך ה-z
    car.add(cabin);

    // **חומר לחלונות**
    const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: colors.car.windows,
        metalness: 0.2,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
        envMapIntensity: 1.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });

    // **שמשה קדמית**
    const windshieldGeometry = new THREE.PlaneGeometry(1.6, 0.4); // רוחב: 1.6, גובה: 0.4
    const frontWindshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
    frontWindshield.position.set(0, 0.65, 1.25); // בקצה הקדמי של תא הנוסעים
    frontWindshield.rotation.x = -Math.PI / 4; // הטיה קדמית
    car.add(frontWindshield);

    // **שמשה אחורית**
    const rearWindshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
    rearWindshield.position.set(0, 0.65, -1.25); // בקצה האחורי של תא הנוסעים
    rearWindshield.rotation.x = Math.PI / 4; // הטיה אחורית
    car.add(rearWindshield);

    // **חלונות צדיים**
    const sideWindowGeometry = new THREE.PlaneGeometry(1.2, 0.3); // אורך: 1.2, גובה: 0.3
    const leftWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow1.position.set(-0.9, 0.65, 0.4); // חלון קדמי שמאלי
    leftWindow1.rotation.y = Math.PI / 2;
    car.add(leftWindow1);

    const rightWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow1.position.set(0.9, 0.65, 0.4); // חלון קדמי ימני
    rightWindow1.rotation.y = -Math.PI / 2;
    car.add(rightWindow1);

    const leftWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow2.position.set(-0.9, 0.65, -0.4); // חלון אחורי שמאלי
    leftWindow2.rotation.y = Math.PI / 2;
    car.add(leftWindow2);

    const rightWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow2.position.set(0.9, 0.65, -0.4); // חלון אחורי ימני
    rightWindow2.rotation.y = -Math.PI / 2;
    car.add(rightWindow2);

    // **מכסה מנוע (Hood)**
    const hoodShape = new THREE.Shape();
    hoodShape.moveTo(-1, -1.5);
    hoodShape.lineTo(1, -1.5);
    hoodShape.lineTo(0.8, 1.5);
    hoodShape.lineTo(-0.8, 1.5);
    hoodShape.lineTo(-1, -1.5);

    const hoodGeometry = new THREE.ExtrudeGeometry(hoodShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 3
    });
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.rotation.x = Math.PI / 2;
    hood.rotation.z = -Math.PI * 2;
    hood.position.set(0, 0.8, 0.5); // מיקום מעל הגוף, קרוב לקצה הקדמי
    car.add(hood);

    // **תא מטען (Trunk)**
    const trunkShape = new THREE.Shape();
    trunkShape.moveTo(-0.6, -1.5);
    trunkShape.lineTo(0.6, -1.5);
    trunkShape.lineTo(0.9, 0.5);
    trunkShape.lineTo(-0.9, 0.5);
    trunkShape.lineTo(-0.6, -1.5);

    const trunkGeometry = new THREE.ExtrudeGeometry(trunkShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 3
    });
    const trunk = new THREE.Mesh(trunkGeometry, bodyMaterial);
    trunk.rotation.x = Math.PI / 2;
    trunk.rotation.z = -Math.PI * 2;
    trunk.position.set(0, 0.3, -0.4); // מיקום מעל הגוף, קרוב לקצה האחורי
    car.add(trunk);

    // **גלגלים**
    function createWheel() {
        const wheelGroup = new THREE.Group();

        const tireGeometry = new THREE.CylinderGeometry(0.65, 0.65, 0.25, 24);
        tireGeometry.rotateZ(-Math.PI / 2);
        const tireMaterial = new THREE.MeshStandardMaterial({
            color: colors.car.wheels,
            roughness: 0.9,
            metalness: 0.1,
            bumpScale: 0.06
        });
        const tire = new THREE.Mesh(tireGeometry, tireMaterial);
        tire.castShadow = true;
        wheelGroup.add(tire);

        const rimGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.27, 16);
        rimGeometry.rotateZ(Math.PI / 2);
        const rimMaterial = new THREE.MeshStandardMaterial({
            color: getRandomColor(),
            metalness: 0.9,
            roughness: 0.2
        });
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        wheelGroup.add(rim);

        const hubCapGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.28, 16);
        hubCapGeometry.rotateZ(Math.PI / 2);
        const hubCapMaterial = new THREE.MeshStandardMaterial({
            color: getRandomColor(),
            metalness: 0.95,
            roughness: 0.1
        });
        const hubCap = new THREE.Mesh(hubCapGeometry, hubCapMaterial);
        wheelGroup.add(hubCap);

        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const spokeShape = new THREE.Shape();
            spokeShape.moveTo(0, -0.02);
            spokeShape.quadraticCurveTo(0.1, -0.01, 0.2, -0.02);
            spokeShape.lineTo(0.2, 0.02);
            spokeShape.quadraticCurveTo(0.1, 0.01, 0, 0.02);
            spokeShape.lineTo(0, -0.02);
            const extrudeSettings = {
                steps: 1,
                depth: 0.04,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 1
            };
            const spokeGeometry = new THREE.ExtrudeGeometry(spokeShape, extrudeSettings);
            const spoke = new THREE.Mesh(spokeGeometry, rimMaterial);
            spoke.rotation.set(0, 0, angle);
            rim.add(spoke);
        }

        return wheelGroup;
    }

    const wheelPositions = [
        { x: -1, y: 0.65, z: 1.2 },  // קדמי שמאלי
        { x: 1, y: 0.65, z: 1.2 },   // קדמי ימני
        { x: -1, y: 0.65, z: -1.2 }, // אחורי שמאלי
        { x: 1, y: 0.65, z: -1.2 }   // אחורי ימני
    ];

    wheelPositions.forEach(pos => {
        const wheel = createWheel();
        wheel.position.set(pos.x, pos.y, pos.z);
        car.add(wheel);
    });

    // **קשתות גלגלים**
    const archGeometry = new THREE.TorusGeometry(0.8, 0.3, 4, 12, Math.PI);
    const archMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.body,
        metalness: 0.7,
        roughness: 0.3
    });

    const frontLeftArch = new THREE.Mesh(archGeometry, archMaterial);
    frontLeftArch.position.set(-0.95, 0.39, 1.2);
    frontLeftArch.rotation.y = Math.PI / 2;
    car.add(frontLeftArch);

    const frontRightArch = new THREE.Mesh(archGeometry, archMaterial);
    frontRightArch.position.set(0.95, 0.39, 1.2);
    frontRightArch.rotation.y = -Math.PI / 2;
    car.add(frontRightArch);

    const rearLeftArch = new THREE.Mesh(archGeometry, archMaterial);
    rearLeftArch.position.set(-0.95, 0.39, -1.2);
    rearLeftArch.rotation.y = Math.PI / 2;
    car.add(rearLeftArch);

    const rearRightArch = new THREE.Mesh(archGeometry, archMaterial);
    rearRightArch.position.set(0.95, 0.39, -1.2);
    rearRightArch.rotation.y = -Math.PI / 2;
    car.add(rearRightArch);

    // **פנסים קדמיים**
    const headlightShape = new THREE.Shape();
    headlightShape.ellipse(0, 0, 0.15, 0.1, 0, Math.PI * 2);
    const headlightGeometry = new THREE.ExtrudeGeometry(headlightShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3
    });
    const headlightMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.lights,
        emissive: colors.car.lights,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.9
    });
    const headlightMaterialColor = getRandomColor();
    const headlightGlassMaterial = new THREE.MeshPhysicalMaterial({
        color: headlightMaterialColor,
        transparent: true,
        opacity: 0.7,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });

    const leftHeadlightGroup = new THREE.Group();
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.rotation.y = Math.PI;
    leftHeadlightGroup.add(leftHeadlight);
    const leftHeadlightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        headlightGlassMaterial
    );
    leftHeadlightGlass.rotation.y = Math.PI;
    leftHeadlightGlass.position.z = 0.05;
    leftHeadlightGroup.add(leftHeadlightGlass);
    leftHeadlightGroup.position.set(-0.6, 0.6, 2);
    car.add(leftHeadlightGroup);

    const rightHeadlightGroup = new THREE.Group();
    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.rotation.y = Math.PI;
    rightHeadlightGroup.add(rightHeadlight);
    const rightHeadlightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        headlightGlassMaterial
    );
    rightHeadlightGlass.rotation.y = Math.PI;
    rightHeadlightGlass.position.z = 0.05;
    rightHeadlightGroup.add(rightHeadlightGlass);
    rightHeadlightGroup.position.set(0.6, 0.6, 2);
    car.add(rightHeadlightGroup);

    // **פנסים אחוריים**
    const taillightShape = new THREE.Shape();
    taillightShape.ellipse(0, 0, 0.15, 0.08, 0, Math.PI * 2);
    const taillightGeometry = new THREE.ExtrudeGeometry(taillightShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3
    });
    const taillightMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        emissive: getRandomColor(),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.9
    });

    const leftTaillightGroup = new THREE.Group();
    const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    leftTaillightGroup.add(leftTaillight);
    const leftTaillightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        new THREE.MeshPhysicalMaterial({
            color: getRandomColor(),
            transparent: true,
            opacity: 0.7,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        })
    );
    leftTaillightGlass.position.z = 0.05;
    leftTaillightGroup.add(leftTaillightGlass);
    leftTaillightGroup.position.set(-1, 0.5, -2);
    car.add(leftTaillightGroup);

    const rightTaillightGroup = new THREE.Group();
    const rightTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    rightTaillightGroup.add(rightTaillight);
    const rightTaillightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        new THREE.MeshPhysicalMaterial({
            color:getRandomColor(),
            transparent: true,
            opacity: 0.7,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        })
    );
    rightTaillightGlass.position.z = 0.05;
    rightTaillightGroup.add(rightTaillightGlass);
    rightTaillightGroup.position.set(1, 0.5, -2);
    car.add(rightTaillightGroup);

    // **ספוילר**
    const spoilerWingShape = new THREE.Shape();
    spoilerWingShape.moveTo(-0.75, 0);
    spoilerWingShape.lineTo(0.75, 0);
    spoilerWingShape.quadraticCurveTo(0.7, 0.1, 0.65, 0.15);
    spoilerWingShape.lineTo(-0.65, 0.15);
    spoilerWingShape.quadraticCurveTo(-0.7, 0.1, -0.75, 0);

    const spoilerWingGeometry = new THREE.ExtrudeGeometry(spoilerWingShape, {
        steps: 1,
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 2
    });
    const spoilerMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.6,
        roughness: 0.4
    });
    const spoilerWing = new THREE.Mesh(spoilerWingGeometry, spoilerMaterial);
    spoilerWing.position.set(0, 1.3, 0);
    spoilerWing.rotation.y = Math.PI;
    spoilerWing.rotation.x = -Math.PI / 2;
    car.add(spoilerWing);

    const spoilerStandShape = new THREE.Shape();
    spoilerStandShape.moveTo(0, 0);
    spoilerStandShape.lineTo(0.3, 0);
    spoilerStandShape.quadraticCurveTo(0.2, 0.2, 0.1, 0.4);
    spoilerStandShape.lineTo(0, 0.4);
    spoilerStandShape.lineTo(0, 0);

    const spoilerStandGeometry = new THREE.ExtrudeGeometry(spoilerStandShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 1
    });
    const leftSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    leftSpoilerStand.position.set(-0.65, 0.8, -1.95);
    leftSpoilerStand.rotation.y = Math.PI / 2;
    car.add(leftSpoilerStand);

    const rightSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    rightSpoilerStand.position.set(0.65, 0.8, -1.95);
    rightSpoilerStand.rotation.y = Math.PI / 2;
    car.add(rightSpoilerStand);

    // **גריל קדמי**
    const grilleShape = new THREE.Shape();
    grilleShape.moveTo(-0.6, -0.15);
    grilleShape.lineTo(0.6, -0.15);
    grilleShape.lineTo(0.5, 0.15);
    grilleShape.lineTo(-0.5, 0.15);
    grilleShape.lineTo(-0.6, -0.15);

    const grilleGeometry = new THREE.ExtrudeGeometry(grilleShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 1
    });
    const grilleMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.8,
        roughness: 0.2
    });
    const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
    grille.position.set(0, 0.5, 2);
    car.add(grille);

    for (let i = 0; i < 5; i++) {
        const barGeometry = new THREE.BoxGeometry(1.1, 0.02, 0.02);
        const bar = new THREE.Mesh(barGeometry, grilleMaterial);
        bar.position.set(0, 0.5 - 0.15 + i * 0.06, 2.03);
        car.add(bar);
    }

    // **ידיות דלת**
    const handleShape = new THREE.Shape();
    handleShape.moveTo(0, 0);
    handleShape.lineTo(0.15, 0);
    handleShape.lineTo(0.15, 0.03);
    handleShape.lineTo(0, 0.03);

    const handleGeometry = new THREE.ExtrudeGeometry(handleShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 2
    });
    const handleMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.9,
        roughness: 0.1
    });

    const leftFrontHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    leftFrontHandle.rotation.y = -Math.PI / 2;
    leftFrontHandle.position.set(-1.01, 0.8, 0.2);
    car.add(leftFrontHandle);

    const rightFrontHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    rightFrontHandle.rotation.y = Math.PI / 2;
    rightFrontHandle.position.set(1.01, 0.8, 0.2);
    car.add(rightFrontHandle);

    const leftRearHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    leftRearHandle.rotation.y = -Math.PI / 2;
    leftRearHandle.position.set(-1.01, 0.8, -0.5);
    car.add(leftRearHandle);

    const rightRearHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    rightRearHandle.rotation.y = Math.PI / 2;
    rightRearHandle.position.set(1.01, 0.8, -0.5);
    car.add(rightRearHandle);

    // **פגושים**
    const frontBumperShape = new THREE.Shape();
    frontBumperShape.moveTo(-1, -0.2);
    frontBumperShape.lineTo(1, -0.2);
    frontBumperShape.quadraticCurveTo(0.8, 0, 0.8, 0.2);
    frontBumperShape.lineTo(-0.8, 0.2);
    frontBumperShape.quadraticCurveTo(-0.8, 0, -1, -0.2);

    const frontBumperGeometry = new THREE.ExtrudeGeometry(frontBumperShape, {
        steps: 1,
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 3
    });
    const bumperMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.body,
        metalness: 0.7,
        roughness: 0.3
    });
    const frontBumper = new THREE.Mesh(frontBumperGeometry, bumperMaterial);
    frontBumper.position.set(0, 0.4, 1.9);
    frontBumper.rotation.x = Math.PI / 2;
    car.add(frontBumper);

    const rearBumperShape = new THREE.Shape();
    rearBumperShape.moveTo(-1, -0.2);
    rearBumperShape.lineTo(1, -0.2);
    rearBumperShape.quadraticCurveTo(0.8, 0, 0.8, 0.2);
    rearBumperShape.lineTo(-0.8, 0.2);
    rearBumperShape.quadraticCurveTo(-0.8, 0, -1, -0.2);

    const rearBumperGeometry = new THREE.ExtrudeGeometry(rearBumperShape, {
        steps: 1,
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 3
    });
    const rearBumper = new THREE.Mesh(rearBumperGeometry, bumperMaterial);
    rearBumper.position.set(0, 0.4, -2.2);
    rearBumper.rotation.x = -Math.PI / 2;
    car.add(rearBumper);

    // **צינורות פליטה**
    const exhaustGeometry = new THREE.CylinderGeometry(0.05, 0.06, 0.15, 8);
    exhaustGeometry.rotateX(Math.PI / 2);
    const exhaustMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.8,
        roughness: 0.2
    });
    const leftExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    leftExhaust.position.set(-0.6, 0.3, -2.3);
    car.add(leftExhaust);

    const rightExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    rightExhaust.position.set(0.6, 0.3, -2.3);
    car.add(rightExhaust);

    return car;
}

function createCar4() {
    const car = new THREE.Group();
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return (r << 16) | (g << 8) | b;
    }
    const colors = {
        car: {
            body: getRandomColor(), // צבע הרכב הראשי
            wheels: getRandomColor(), // צבע הגלגלים
            cabin: getRandomColor(), // צבע התא הנוסעים
            windows: getRandomColor(), // צבע החלונות
            headlights: getRandomColor(), // צבע הכיוונים
            exhaust: getRandomColor(), // צבע המפלס
            spoiler: getRandomColor(), // צבע הספולר
            grill: getRandomColor(), // צבע הגריל
            roof: getRandomColor(), // צבע הרוב
            wheels: getRandomColor(), // צבע הגלגלים
        }
    }
    // Main body - lower part with curvature
    const bodyGeometry = new THREE.BoxGeometry(1.9, 0.75, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.body,
        metalness: 0.7,
        roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    car.add(body);

    // Add rounded edges to the top of the body
    const edgeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 4); // צילינדר דק לאורך הקצוות
    edgeGeometry.rotateZ(Math.PI * 2); // סיבוב כדי שיהיה אופקי
    const leftEdge = new THREE.Mesh(edgeGeometry, bodyMaterial);
    leftEdge.position.set(-0.8, 2, 0); // מיקום בקצה השמאלי העליון
    car.add(leftEdge);

    const rightEdge = new THREE.Mesh(edgeGeometry, bodyMaterial);
    rightEdge.position.set(0.8, 2, 0); // מיקום בקצה הימני העליון
    car.add(rightEdge);

    // Create a more aerodynamic hood using a shape
    const hoodShape = new THREE.Shape();
    hoodShape.moveTo(-1, -0.9);
    hoodShape.lineTo(1, -1.5);
    hoodShape.lineTo(0.8, 1.5);
    hoodShape.lineTo(-0.8, 1.5);
    hoodShape.lineTo(-1, -1.5);

    const hoodGeometry = new THREE.ExtrudeGeometry(hoodShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.rotation.x = -Math.PI / 2;
    hood.rotation.z = -Math.PI / 1;
    hood.position.set(0, 0.9, 0.95);
    hood.scale.set( 0.95, 0.6, 1);
    car.add(hood);

    // Create a more curved roof with sloping design
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-0.8, 1);
    roofShape.lineTo(0.8, -2);
    roofShape.lineTo(0.2, 0.5);
    roofShape.quadraticCurveTo(0.5, 1.5, 0.4, 1.7);
    roofShape.lineTo(-0.4, 1.7);
    roofShape.quadraticCurveTo(-0.5, 1.5, -0.7, 1);
    roofShape.lineTo(-0.8, -1);

    const roofGeometry = new THREE.ExtrudeGeometry(roofShape, {
        steps: 1,
        depth: 0.9,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0.05,
        bevelSegments: 0.5
    });

    const roof = new THREE.Mesh(roofGeometry, bodyMaterial);
    roof.rotation.y = -Math.PI / 2;
    roof.position.set(0.8, 1.55, 0.5);
    roof.scale.set(1, 0.3, 1.8);
    car.add(roof);

    // Create a sleek trunk
    const trunkShape = new THREE.Shape();
    trunkShape.moveTo(-0.8, -1.5);
    trunkShape.lineTo(0.8, -1.5);
    trunkShape.lineTo(0.9, 0.5);
    trunkShape.lineTo(-0.9, 0.5);
    trunkShape.lineTo(-0.8, -1.5);

    const trunkGeometry = new THREE.ExtrudeGeometry(trunkShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const trunk = new THREE.Mesh(trunkGeometry, bodyMaterial);
    trunk.rotation.x = Math.PI / 2;
    trunk.rotation.z = Math.PI;
    trunk.position.set(0, 1.2, -1.1);
    trunk.scale.set(1, 1.2, 4.9);
    car.add(trunk);

    // Create more realistic windows with curvature
    const windowMaterial = new THREE.MeshPhysicalMaterial({
        color: colors.car.windows,
        metalness: 0.3,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
        envMapIntensity: 1.0,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });

    // Front windshield - use a curved shape
    const windshieldShape = new THREE.Shape();
    windshieldShape.moveTo(-0.8, 0);
    windshieldShape.lineTo(0.8, 0);
    windshieldShape.quadraticCurveTo(0.75, 0.7, 0.7, 0.8);
    windshieldShape.lineTo(-0.7, 0.8);
    windshieldShape.quadraticCurveTo(-0.75, 0.7, -0.8, 0);

    const windshieldGeometry = new THREE.ExtrudeGeometry(windshieldShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 2
    });

    const frontWindshield = new THREE.Mesh(windshieldGeometry, windowMaterial);
    frontWindshield.rotation.x = Math.PI * 2 - Math.PI * 0.2;
    frontWindshield.position.set(0, 1, 1.25);
    car.add(frontWindshield);

    // Rear windshield
    const rearWindshieldGeometry = windshieldGeometry.clone();
    const rearWindshield = new THREE.Mesh(rearWindshieldGeometry, windowMaterial);
    rearWindshield.rotation.x = Math.PI / 2 + Math.PI * 0.15;
    rearWindshield.position.set(0, 1.0, -1.4);
    car.add(rearWindshield);

    // Side windows with better curvature
    const sideWindowShape = new THREE.Shape();
    sideWindowShape.moveTo(0, 0);
    sideWindowShape.lineTo(1.2, 0);
    sideWindowShape.quadraticCurveTo(1.1, 0.3, 1.0, 0.4);
    sideWindowShape.lineTo(0.2, 0.4);
    sideWindowShape.quadraticCurveTo(0.1, 0.3, 0, 0);

    const sideWindowGeometry = new THREE.ExtrudeGeometry(sideWindowShape, {
        steps: 1,
        depth: 0.005,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 2
    });

    // Front side windows
    const leftWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow1.rotation.y = -Math.PI * 0.51;
    leftWindow1.rotation.z =  0;
    leftWindow1.position.set(-0.89, 1.1, -0.23);
    car.add(leftWindow1);

    const rightWindow1 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow1.rotation.y = -Math.PI * 0.49;
    rightWindow1.rotation.z = 0;
    rightWindow1.position.set(0.89, 1.1, -0.23);
    car.add(rightWindow1);

    // Rear side windows
    const leftWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    leftWindow2.rotation.y = Math.PI * 0.51;
    leftWindow2.rotation.z = 0;
    leftWindow2.position.set(-0.95, 1.05, -0.23);
    leftWindow2.scale.set(1, 1.2, 1);
    car.add(leftWindow2);

    const rightWindow2 = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    rightWindow2.rotation.y = Math.PI * 0.49;
    rightWindow2.rotation.z = 0;
    rightWindow2.position.set(0.95, 1.05, -0.23);
    rightWindow2.scale.set(1, 1.2, 1);
    car.add(rightWindow2);

    // Create more realistic wheels with better details
    function createWheel() {
        const wheelGroup = new THREE.Group();

        // Tire with better tread pattern
        const tireGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.25, 24);
        tireGeometry.rotateZ(Math.PI / 2);

        // Add tread pattern to tire
        const tireMaterial = new THREE.MeshStandardMaterial({
            color: colors.car.wheels,
            roughness: 0.5,
            metalness: 0.1,
            bumpScale: 0.02
        });

        const tire = new THREE.Mesh(tireGeometry, tireMaterial);
        tire.castShadow = true;
        wheelGroup.add(tire);

        // More detailed rim with curved spokes
        const rimGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.27, 16);
        rimGeometry.rotateZ(Math.PI / 2);
        const rimMaterial = new THREE.MeshStandardMaterial({
            color: getRandomColor(),
            metalness: 0.9,
            roughness: 0.2
        });
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        wheelGroup.add(rim);

        // Hub cap
        const hubCapGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.28, 16);
        hubCapGeometry.rotateZ(Math.PI / 2);
        const hubCapMaterial = new THREE.MeshStandardMaterial({
            color: getRandomColor(),
            metalness: 0.95,
            roughness: 0.1
        });
        const hubCap = new THREE.Mesh(hubCapGeometry, hubCapMaterial);
        wheelGroup.add(hubCap);

        // Create elegant curved spokes
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;

            // Create curved spoke with shape
            const spokeShape = new THREE.Shape();
            spokeShape.moveTo(0.2, -0.02);
            spokeShape.quadraticCurveTo(0.1, -0.01, 0.2, -0.02);
            spokeShape.lineTo(0.2, 0.02);
            spokeShape.quadraticCurveTo(0.1, 0.01, 0, 0.02);
            spokeShape.lineTo(0, -0.02);

            const extrudeSettings = {
                steps: 1,
                depth: 0.14,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 1
            };

            const spokeGeometry = new THREE.ExtrudeGeometry(spokeShape, extrudeSettings);
            const spoke = new THREE.Mesh(spokeGeometry, rimMaterial);
            spoke.rotation.set(0, 0, angle);
            spoke.position.set(0, 0, 0);
            rim.add(spoke);
        }

        return wheelGroup;
    }

    // Add wheels with better positioning
    const wheelPositions = [
        { x: -0.85, y: 0.4, z: 1.2 },   // Front Left
        { x: 0.85, y: 0.4, z: 1.2 },    // Front Right
        { x: -0.85, y: 0.4, z: -1.2 },  // Rear Left
        { x: 0.85, y: 0.4, z: -1.2 }    // Rear Right
    ];

    wheelPositions.forEach(pos => {
        const wheel = createWheel();
        wheel.position.set(pos.x, pos.y, pos.z);
        car.add(wheel);
    });

    // Add wheel arches to make it more realistic
    const archGeometry = new THREE.TorusGeometry(0.45, 0.2, 8, 12, Math.PI);
    const archMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.body,
        metalness: 0.7,
        roughness: 0.3
    });

    // Front wheel arches
    const frontLeftArch = new THREE.Mesh(archGeometry, archMaterial);
    frontLeftArch.position.set(-0.85, 0.45, 1.2);
    frontLeftArch.rotation.y = Math.PI / 2;
    car.add(frontLeftArch);

    const frontRightArch = new THREE.Mesh(archGeometry, archMaterial);
    frontRightArch.position.set(0.85, 0.45, 1.2);
    frontRightArch.rotation.y = -Math.PI / 2;
    car.add(frontRightArch);

    // Rear wheel arches
    const rearLeftArch = new THREE.Mesh(archGeometry, archMaterial);
    rearLeftArch.position.set(-0.85, 0.45, -1.2);
    rearLeftArch.rotation.y = Math.PI / 2;
    car.add(rearLeftArch);

    const rearRightArch = new THREE.Mesh(archGeometry, archMaterial);
    rearRightArch.position.set(0.85, 0.45, -1.2);
    rearRightArch.rotation.y = -Math.PI / 2;
    car.add(rearRightArch);

    // Create better looking headlights
    const headlightShape = new THREE.Shape();
    headlightShape.ellipse(0, 0, 0.15, 0.1, 0, Math.PI * 2);

    const headlightExtrudeSettings = {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 3
    };

    const headlightGeometry = new THREE.ExtrudeGeometry(headlightShape, headlightExtrudeSettings);
    const headlightMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.lights,
        emissive: colors.car.lights,
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.6
    });

    // Add glass cover to headlights
    const headlightGlassMaterial = new THREE.MeshPhysicalMaterial({
        color: getRandomColor(),
        transparent: true,
        opacity: 0.7,
        clearcoat: 2.0,
        clearcoatRoughness: 0.1
    });

    // Left headlight assembly
    const leftHeadlightGroup = new THREE.Group();

    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.rotation.y = Math.PI;
    leftHeadlightGroup.add(leftHeadlight);

    const leftHeadlightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        headlightGlassMaterial
    );
    leftHeadlightGlass.rotation.y = Math.PI;
    leftHeadlightGlass.position.z = 0.05;
    leftHeadlightGroup.add(leftHeadlightGlass);

    leftHeadlightGroup.position.set(-0.6, 0.6, 2);
    car.add(leftHeadlightGroup);

    // Right headlight assembly
    const rightHeadlightGroup = new THREE.Group();

    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.rotation.y = Math.PI;
    rightHeadlightGroup.add(rightHeadlight);

    const rightHeadlightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        headlightGlassMaterial
    );
    rightHeadlightGlass.rotation.y = Math.PI;
    rightHeadlightGlass.position.z = 0.05;
    rightHeadlightGroup.add(rightHeadlightGlass);

    rightHeadlightGroup.position.set(0.6, 0.6, 2);
    car.add(rightHeadlightGroup);

    // Create taillights
    const taillightShape = new THREE.Shape();
    taillightShape.ellipse(0, 0, 0.15, 0.08, 0.5, Math.PI * 2);

    const taillightGeometry = new THREE.ExtrudeGeometry(taillightShape, headlightExtrudeSettings);
    const taillightMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        emissive: getRandomColor(),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.9
    });

    // Left taillight assembly
    const leftTaillightGroup = new THREE.Group();

    const leftTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    leftTaillightGroup.add(leftTaillight);

    const leftTaillightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        new THREE.MeshPhysicalMaterial({
            color: getRandomColor(),
            transparent: true,
            opacity: 0.7,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        })
    );
    leftTaillightGlass.position.z = 0.05;
    leftTaillightGroup.add(leftTaillightGlass);

    leftTaillightGroup.position.set(-1, 0.6, -2);
    car.add(leftTaillightGroup);

    // Right taillight assembly
    const rightTaillightGroup = new THREE.Group();

    const rightTaillight = new THREE.Mesh(taillightGeometry, taillightMaterial);
    rightTaillightGroup.add(rightTaillight);

    const rightTaillightGlass = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 12, 12, 0, Math.PI),
        new THREE.MeshPhysicalMaterial({
            color: getRandomColor(),
            transparent: true,
            opacity: 0.7,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        })
    );
    rightTaillightGlass.position.z = 0.05;
    rightTaillightGroup.add(rightTaillightGlass);

    rightTaillightGroup.position.set(1, 0.6, -2);
    car.add(rightTaillightGroup);

    // Create a more aerodynamic spoiler
    const spoilerWingShape = new THREE.Shape();
    spoilerWingShape.moveTo(-0.75, 0);
    spoilerWingShape.lineTo(0.75, 0);
    spoilerWingShape.quadraticCurveTo(0.7, 0.1, 0.65, 0.15);
    spoilerWingShape.lineTo(-0.65, 0.15);
    spoilerWingShape.quadraticCurveTo(-0.7, 0.1, -0.75, 0);

    const spoilerWingGeometry = new THREE.ExtrudeGeometry(spoilerWingShape, {
        steps: 1,
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 2
    });

    const spoilerMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.6,
        roughness: 0.4
    });

    const spoilerWing = new THREE.Mesh(spoilerWingGeometry, spoilerMaterial);
    spoilerWing.position.set(0, 1., -1.9);
    spoilerWing.rotation.y = Math.PI * 2;
    car.add(spoilerWing);

    // Curved spoiler stands
    const spoilerStandShape = new THREE.Shape();
    spoilerStandShape.moveTo(1, 0);
    spoilerStandShape.lineTo(1.6, 1);
    spoilerStandShape.quadraticCurveTo(1.2, 0.2, 0.1, 0.4);
    spoilerStandShape.lineTo(0, 0.4);
    spoilerStandShape.lineTo(0, 0);

    const spoilerStandGeometry = new THREE.ExtrudeGeometry(spoilerStandShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 1
    });

    const leftSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    leftSpoilerStand.position.set(-0.65, 0.6, -1);
    leftSpoilerStand.rotation.y = Math.PI / 2;
    car.add(leftSpoilerStand);

    const rightSpoilerStand = new THREE.Mesh(spoilerStandGeometry, spoilerMaterial);
    rightSpoilerStand.position.set(0.65, 0.6, -1);
    rightSpoilerStand.rotation.y = Math.PI / 2;
    car.add(rightSpoilerStand);

    // Add front grille
    const grilleShape = new THREE.Shape();
    grilleShape.moveTo(-0.6, -0.15);
    grilleShape.lineTo(0.6, -0.15);
    grilleShape.lineTo(0.5, 0.15);
    grilleShape.lineTo(-0.5, 0.15);
    grilleShape.lineTo(-0.6, -0.15);

    const grilleGeometry = new THREE.ExtrudeGeometry(grilleShape, {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 1
    });

    const grilleMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.8,
        roughness: 0.2
    });

    const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
    grille.position.set(0, 0.5, 2);
    car.add(grille);

    // Add grille details (horizontal bars)
    for (let i = 0; i < 5; i++) {
        const barGeometry = new THREE.BoxGeometry(1.1, 0.02, 0.02);
        const bar = new THREE.Mesh(barGeometry, grilleMaterial);
        bar.position.set(0, 0.5 - 0.15 + i * 0.06, 2.03);
        car.add(bar);
    }

    // Add door handles
    const handleGeometry = new THREE.BoxGeometry(0.03, 0.05, 0.15);
    handleGeometry.translate(0, 0, 0.1);

    const handleShape = new THREE.Shape();
    handleShape.moveTo(0, 0);
    handleShape.lineTo(0.15, 0);
    handleShape.lineTo(0.15, 0.03);
    handleShape.lineTo(0, 0.03);

    const handleExtrudeSettings = {
        steps: 1,
        depth: 0.05,
        bevelEnabled: true,
        bevelThickness: 0.01,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 2
    };

    const handleGeometryExtruded = new THREE.ExtrudeGeometry(handleShape, handleExtrudeSettings);

    const handleMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.9,
        roughness: 0.1
    });

    const leftFrontHandle = new THREE.Mesh(handleGeometryExtruded, handleMaterial);
    leftFrontHandle.rotation.y = -Math.PI / 2;
    leftFrontHandle.position.set(-1.01, 0.8, 0.2);
    car.add(leftFrontHandle);

    const rightFrontHandle = new THREE.Mesh(handleGeometryExtruded, handleMaterial);
    rightFrontHandle.rotation.y = Math.PI / 2;
    rightFrontHandle.position.set(1.01, 0.8, 0.2);
    car.add(rightFrontHandle);

    const leftRearHandle = new THREE.Mesh(handleGeometryExtruded, handleMaterial);
    leftRearHandle.rotation.y = -Math.PI / 2;
    leftRearHandle.position.set(-1.01, 0.8, -0.5);
    car.add(leftRearHandle);

    const rightRearHandle = new THREE.Mesh(handleGeometryExtruded, handleMaterial);
    rightRearHandle.rotation.y = Math.PI / 2;
    rightRearHandle.position.set(1.01, 0.8, -0.5);
    car.add(rightRearHandle);

    // Add bumpers
    const frontBumperShape = new THREE.Shape();
    frontBumperShape.moveTo(-1, -0.2);
    frontBumperShape.lineTo(1, -0.2);
    frontBumperShape.quadraticCurveTo(0.8, 0, 0.8, 0.2);
    frontBumperShape.lineTo(-0.8, 0.2);
    frontBumperShape.quadraticCurveTo(-0.8, 0, -1, -0.2);

    const frontBumperGeometry = new THREE.ExtrudeGeometry(frontBumperShape, {
        steps: 1,
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const bumperMaterial = new THREE.MeshStandardMaterial({
        color: colors.car.body,
        metalness: 0.7,
        roughness: 0.3
    });

    const frontBumper = new THREE.Mesh(frontBumperGeometry, bumperMaterial);
    frontBumper.position.set(0, 0.5, 1.9);
    frontBumper.rotation.x = Math.PI / 2;
    car.add(frontBumper);

    // Rear bumper
    const rearBumperShape = new THREE.Shape();
    rearBumperShape.moveTo(-1, -0.2);
    rearBumperShape.lineTo(1, -0.2);
    rearBumperShape.quadraticCurveTo(0.8, 0, 0.8, 0.2);
    rearBumperShape.lineTo(-0.8, 0.2);
    rearBumperShape.quadraticCurveTo(-0.8, 0, -1, -0.2);

    const rearBumperGeometry = new THREE.ExtrudeGeometry(rearBumperShape, {
        steps: 1,
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const rearBumper = new THREE.Mesh(rearBumperGeometry, bumperMaterial);
    rearBumper.position.set(0, 0.4, -2.2);
    rearBumper.rotation.x = Math.PI * 2;
    car.add(rearBumper);

    // Add exhaust pipes
    const exhaustGeometry = new THREE.CylinderGeometry(0.05, 0.06, 0.65, 8);
    exhaustGeometry.rotateX(Math.PI / 2);

    const exhaustMaterial = new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        metalness: 0.8,
        roughness: 0.2
    });

    const leftExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    leftExhaust.position.set(-0.6, 0.3, -2.3);
    car.add(leftExhaust);
    const rightExhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    rightExhaust.position.set(0.6, 0.3, -2.3);
    car.add(rightExhaust);
    return car;
}

export { createCar1, createCar2, createCar3, createCar4 };