## Final Work Stars ##
My idea is to create a cosmic scene in the form of array code. I do this by letting the stars randomly generate and randomly assign textures.I am a hardcore fan of Star Wars, so I added a lot of spaceships to this space and matched the background music of Star Wars.

#### Description ####
I simulated the stars in the universe with array code.

#### student ID ####
B161006101
#### Student name ####
Chang Yao

#### screenshot ####
![overall effect](ScreenShot/space.png)

![core](Screenshot/space4.png)

#### Usage ####
```html
<script src="build/three.min.js"></script>
```

* Create renderer, scene, camera, controls, stars and sound.

```javascript
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

```
* The basic definition.
* Defined stars array,Rot value,Amount of starsNum.

```javascript
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
```
* This code imports the model into the scene.Using mtl and obj import method.

```javascript
	texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection+".jpg" );
```

* Set 5 random textures to add to stars and create random size of stars.

```javascript
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
}
  //renderer.shadowMapEnabled = true;

```
 * Set the location from the camera while adding spotlight and amblight.
 * Set the background color

```javascript
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
```
* Randomly generate a planet in the scene. When the number of stars is less than the starNumber, interest is continuously generated. Stop generation when the number of stars is equal to starNumber.

##### position #####
```javascript
mesh.position.set(Math.random()*300-100, Math.random()*300-100, Math.random()*300-100);
```
* This code specifies the location of the generated mesh. First, the random function can randomly take the value of the planet in a cube with XYZ of 300, and then () * 300-100 this code can make each planet's neutral point more than or equal to 100.

```javascript
controls = new THREE.OrbitControls(camera, renderer.domElement);
```
* Import the controller.

```javascript
var randSize = Math.random() * 0.8;
mesh.scale.x = randSize;
mesh.scale.y = randSize;
mesh.scale.z = randSize;
```
* Let the size of the planet be random.

```javascript
audioLoader.load( 'audio/1.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( false );
	sound.setVolume( 0.5 );
	sound.play();
	});
```

* Add background music.

```javascript
rot += 0.01;
stars.forEach(function(s,i){
	s.rotation.y = rot;
});
```
* Use the Foreach function to make each planet in the array rotate equal to rot.
