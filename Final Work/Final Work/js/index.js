var renderer, scene, camera;
var controls
var starsNum = 25;
var stars = [];
var rot = 0;
var listener = new THREE.AudioListener();
var sound = new THREE.Audio( listener );
var audioLoader = new THREE.AudioLoader();
function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 0, 400);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(1000, 0, 1000);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0,10000,0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x000000);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

    for (var i = 0; i < starsNum; i++) {

	var randomSelection = Math.round(Math.random()*4)+1;

  // Load a texture
	texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection+".jpg" );
var geometry = new THREE.SphereGeometry( 30, 32, 16 );
	material = new THREE.MeshBasicMaterial( { map: texture} );
      mesh = new THREE.Mesh( geometry, material );
mesh.position.set(Math.random()*300-100, Math.random()*300-100, Math.random()*300-100);
      var randSize = Math.random() * 0.8;
      mesh.scale.x = randSize;
      mesh.scale.y = randSize;
      mesh.scale.z = randSize;
      scene.add(mesh);
      stars.push(mesh);
  }
  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  rot += 0.01;
  stars.forEach(function(s,i){
    s.rotation.y = rot;
  });
  audioLoader.load( 'audio/1.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
    sound.play();
    });
  renderer.render(scene, camera);
}

init();
drawFrame();
