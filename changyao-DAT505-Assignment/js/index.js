var renderer, scene, camera;
var controls
var starsNum = 25;
var stars = [];
var rot = 0;
var listener = new THREE.AudioListener();
var sound = new THREE.Audio( listener );
var audioLoader = new THREE.AudioLoader();


var radius = 100, theta = 0;
var object;

var objects = [];


function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );


  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 0, 400);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(500, 0, 100);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  var ambLight = new THREE.AmbientLight(0x000000);
  ambLight.position.set(0,1000,0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x000000);
  renderer.setSize(W, H);

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
  for (var i=0; i<10; i++){
  // Model/material loading!
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load("Blocks.mtl", function(materials){

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

      objLoader.load("ship.obj", function(mesh){
        mesh.traverse(function(node){
          if( node instanceof THREE.Mesh ){
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        var sizeRand = Math.random() * 0.5;
        mesh.scale.set(sizeRand,sizeRand,sizeRand);
        mesh.position.set(Math.random()*300-100, Math.random()*300-100, Math.random()*300-100);
        mesh.rotation.y = -Math.PI/Math.random()*4;

        scene.add(mesh);
        objects.push(mesh); //Add to the array so that we can access for raycasting
      });
    });
  }

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
