// import dan konstanta
global.THREE = require("three");
require("three/examples/js/controls/OrbitControls");
const canvasSketch = require("canvas-sketch");

const settings = {
  animate : true,
  context : "webgl",
  scaleToView : true
};

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var sketch = ({context}) => {

  //Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas : context.canvas,
    alpha : true
  });
  renderer.setClearColor("#121212",1);

  //Camera
  const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
  camera.position.set(30, 5, 35);

  //Orbit Controls
  const controls = new THREE.OrbitControls(camera, context.canvas);
  controls.target.set(30, 0, 0);

  //Scene
  const scene = new THREE.Scene();

  //Texture
  const loader = new THREE.TextureLoader();
  const sunTexture = loader.load("assets/sun.jpg");
  const mercuryTexture = loader.load("assets/mercury.jpg");
  const venusTexture = loader.load("assets/venus.jpg");
  const earthTexture = loader.load("assets/earth.jpg");
  const marsTexture = loader.load("assets/mars.jpg");
  const jupiterTexture = loader.load("assets/jupiter.jpg");
  const saturnTexture = loader.load("assets/saturn.jpg");
  const uranusTexture = loader.load("assets/uranus.jpg");
  const neptuneTexture = loader.load("assets/neptune.jpg");
  const plutoTexture = loader.load("assets/pluto.jpeg");

  //Material
  const sunMaterial = new THREE.MeshStandardMaterial({map : sunTexture});
  const mercuryMaterial = new THREE.MeshStandardMaterial({map : mercuryTexture});
  const venusMaterial = new THREE.MeshStandardMaterial({map : venusTexture});
  const earthMaterial = new THREE.MeshStandardMaterial({map : earthTexture});
  const marsMaterial = new THREE.MeshStandardMaterial({map : marsTexture});
  const jupiterMaterial = new THREE.MeshStandardMaterial({map : jupiterTexture});
  const saturnMaterial = new THREE.MeshStandardMaterial({map : saturnTexture});
  const uranusMaterial = new THREE.MeshStandardMaterial({map : uranusTexture});
  const neptuneMaterial = new THREE.MeshStandardMaterial({map : neptuneTexture});
  const plutoMaterial = new THREE.MeshStandardMaterial({map : plutoTexture});

  // Meshes
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const sunMesh = new THREE.Mesh(geometry, sunMaterial);
  sunMesh.position.set(0, 0, 0);
  sunMesh.scale.setScalar(10);
  scene.add(sunMesh);

  const mercuryGroup = new THREE.Group();
  const mercuryMesh = new THREE.Mesh(geometry, mercuryMaterial);
  createPlanet(scene, mercuryMesh, mercuryGroup, 25, 0.8);

  const venusGroup = new THREE.Group();
  const venusMesh = new THREE.Mesh(geometry, venusMaterial);
  createPlanet(scene, venusMesh, venusGroup, 28, 0.9);
 
  const earthGroup = new THREE.Group();
  const earthMesh = new THREE.Mesh(geometry, earthMaterial);
  createPlanet(scene, earthMesh, earthGroup, 31, 1);

  const marsGroup = new THREE.Group();
  const marsMesh = new THREE.Mesh(geometry, marsMaterial);
  createPlanet(scene, marsMesh, marsGroup, 34, 0.8);

  const jupiterGroup = new THREE.Group();
  const jupiterMesh = new THREE.Mesh(geometry, jupiterMaterial);
  createPlanet(scene, jupiterMesh, jupiterGroup, 42, 3.5);

  const saturnGroup = new THREE.Group();
  const saturnMesh = new THREE.Mesh(geometry, saturnMaterial);
  createPlanet(scene, saturnMesh, saturnGroup, 50, 2.9);

  const uranusGroup = new THREE.Group();
  const uranusMesh = new THREE.Mesh(geometry, uranusMaterial);
  createPlanet(scene, uranusMesh, uranusGroup, 56, 1.7);

  const neptuneGroup = new THREE.Group();
  const neptuneMesh = new THREE.Mesh(geometry, neptuneMaterial);
  createPlanet(scene, neptuneMesh, neptuneGroup, 60, 1.65);

  const plutoGroup = new THREE.Group();
  const plutoMesh = new THREE.Mesh(geometry, plutoMaterial);
  createPlanet(scene, plutoMesh, plutoGroup, 64, 0.5);

  //Lighting
  const light = new THREE.PointLight("white", 1.25);
  light.position.set(0, 0, 0);
  scene.add(light);

  // illuminate the sun
  createSpotLights(scene);

  //Helpers
  scene.add(new THREE.PointLightHelper(light, 1));

  return {
    render({time}){

      sunMesh.rotation.y = time * 0.05;

      mercuryGroup.rotation.y = time * 0.5;
      mercuryMesh.rotation.y = time * 0.20;

      venusGroup.rotation.y = time * 0.35;
      venusMesh.rotation.y = time * 0.18;
      
      earthGroup.rotation.y = time * 0.3;
      earthMesh.rotation.y = time * 0.18;

      marsGroup.rotation.y = time * 0.2;
      marsMesh.rotation.y = time * 0.2;

      jupiterGroup.rotation.y = time * 0.05;
      jupiterMesh.rotation.y = time * 0.05;

      saturnGroup.rotation.y = time * 0.03;
      saturnMesh.rotation.y = time * 0.25;

      uranusGroup.rotation.y = time * 0.2;
      uranusMesh.rotation.y = time * 0.25;

      neptuneGroup.rotation.y = time * 0.015;
      neptuneMesh.rotation.y = time * 0.25;

      plutoGroup.rotation.y = time * 0.005;
      plutoMesh.rotation.y = time * 0.2;

      controls.update();
      renderer.render(scene, camera);
    },

  unload(){
    controls.dispose();
    renderer.dispose();
  }

  };

};
function createPlanet(scene, mesh, group, x, scale){

  mesh.position.set(x, 0, 0);
  mesh.scale.setScalar(scale);
  group.add(mesh);
  scene.add(group);
  
}
function createSpotLights(scene){
  var color = 0xFFFFFF;
  var intensity = 5;
  var distance = 25;
  var angle = Math.PI/7;

  new Array(6).fill('').forEach((item, i) =>{
    var spotLight = new THREE.SpotLight(color, intensity, distance, angle);
    var value = i % 2 === 0 ? 25 : -25;

    spotLight.position.set(
      i < 2 ? value : 0,
      i >= 2 && i < 4 ? value : 0,
      i >= 4 ? value : 0
    );
    scene.add(spotLight);
  });
}
canvasSketch(sketch, settings);


