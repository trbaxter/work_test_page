const canvas = document.querySelector('canvas');
let width = canvas.offsetWidth,
    height = canvas.offsetHeight;

// Particle colors
let colors = [
    new THREE.Color(0x34fa76),  // Bright green
    new THREE.Color(0x96789f),  // Dark gray magenta
    new THREE.Color(0x00FFFF)   // Electric cyan
];

// Renderer setup
let renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setPixelRatio(2);
renderer.setClearColor(0x000000);
renderer.setSize(width, height);

// Scene & camera setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
camera.position.set(0, 0, 350);

// Group to hold everything
let galaxy = new THREE.Group();
scene.add(galaxy);

// Create dots
let loader = new THREE.TextureLoader();
loader.crossOrigin = "";
let dotTexture = loader.load("img/dotTexture.png");
let particleNumber = 2000;

let positions = new Float32Array(particleNumber * 3);
let sizes = new Float32Array(particleNumber);
let colorsAttribute = new Float32Array(particleNumber * 3);
const opacities = new Float32Array(particleNumber);
let dotsGeometry = new THREE.Geometry();

let i;
let vector;
for (i = 0; i < particleNumber; i++) {
    vector = new THREE.Vector3();

    // Randomly choose one of the three colors
    vector.color = Math.floor(Math.random() * colors.length);

    // Random spherical distribution using theta/phi
    vector.theta = Math.random() * Math.PI * 2;
    vector.phi = (1 - Math.sqrt(Math.random())) *
        Math.PI / 2 *
        (Math.random() > 0.5 ? 1 : -1);

    vector.x = Math.cos(vector.theta) * Math.cos(vector.phi);
    vector.y = Math.sin(vector.phi);
    vector.z = Math.sin(vector.theta) * Math.cos(vector.phi);
    vector.multiplyScalar(120 + (Math.random() - 0.5) * 5);
    vector.scaleX = 5;

    // Randomly animate half of the dots
    if (Math.random() > 0.6) {
        moveParticle(vector, i);
    }

    // Specify color opacities
    if (vector.colorIndex === 0) { // Solventum green
        opacities[i] = 0.75;
    } else if (vector.colorIndex === 1) { // Dark gray magenta
        opacities[i] = 0.75;
    } else {
        opacities[i] = 0.75;
    }


    // Geometry usage (for lines)
    dotsGeometry.vertices.push(vector);

    // For BufferGeometry
    vector.toArray(positions, i * 3);
    colors[vector.color].toArray(colorsAttribute, i * 3);

    // Subtle random dot size from 3 to 7
    sizes[i] = 3 + Math.cos(i);
}

let attributePositions = new THREE.BufferAttribute(positions, 3);

function moveParticle(vector, index) {
    let tempVector = vector.clone();
    tempVector.multiplyScalar((Math.random() - 0.5) * 0.2 + 1);

    TweenMax.to(vector, Math.random() * 3 + 3, {
        x: tempVector.x,
        y: tempVector.y,
        z: tempVector.z,
        yoyo: true,
        repeat: -1,
        delay: -Math.random() * 3,
        ease: Power0.easeNone,
        onUpdate: function () {
            attributePositions.array[index * 3] = vector.x;
            attributePositions.array[index * 3 + 1] = vector.y;
            attributePositions.array[index * 3 + 2] = vector.z;
        }
    });
}

let bufferWrapGeom = new THREE.BufferGeometry();
bufferWrapGeom.frustumCulled = true;

bufferWrapGeom.addAttribute('position', attributePositions);
let attributeSizes = new THREE.BufferAttribute(sizes, 1);
bufferWrapGeom.addAttribute('size', attributeSizes);
let attributeColors = new THREE.BufferAttribute(colorsAttribute, 3);
bufferWrapGeom.addAttribute('color', attributeColors);
const attributeOpacities = new THREE.BufferAttribute(opacities, 1);
bufferWrapGeom.addAttribute('opacity', attributeOpacities);

let shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        texture: {value: dotTexture}
    },
    vertexShader: document.getElementById("wrapVertexShader").textContent,
    fragmentShader: document.getElementById("wrapFragmentShader").textContent,
    transparent: true
});

let wrap = new THREE.Points(bufferWrapGeom, shaderMaterial);
scene.add(wrap);

// Create line segments
let segmentsGeom = new THREE.Geometry();
let segmentsMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    vertexColors: THREE.VertexColors
});

for (i = dotsGeometry.vertices.length - 1; i >= 0; i--) {
    vector = dotsGeometry.vertices[i];
    for (let j = dotsGeometry.vertices.length - 1; j >= 0; j--) {
        if (i !== j && vector.distanceTo(dotsGeometry.vertices[j]) < 12) {
            segmentsGeom.vertices.push(vector);
            segmentsGeom.vertices.push(dotsGeometry.vertices[j]);
            segmentsGeom.colors.push(colors[vector.color]);
            segmentsGeom.colors.push(colors[vector.color]);
        }
    }
}

let segments = new THREE.LineSegments(segmentsGeom, segmentsMat);
galaxy.add(segments);

let hovered = [];
let prevHovered = [];

function render() {
    galaxy.rotation.y += 0.0004;

    dotsGeometry.verticesNeedUpdate = true;
    segmentsGeom.verticesNeedUpdate = true;
    prevHovered = hovered.slice(0);

    attributeSizes.needsUpdate = true;
    attributePositions.needsUpdate = true;

    renderer.render(scene, camera);
}

function onResize() {
    canvas.style.width = '';
    canvas.style.height = '';
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

TweenMax.ticker.addEventListener("tick", render);

let resizeTm;
window.addEventListener("resize", function () {
    clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 200);
});
