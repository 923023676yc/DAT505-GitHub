# FINAL WORK #
The content of this work is intended to let us understand and master the knowledge learned in previous courses. It includes creating objects, making them material, moving objects at different speeds, forming arrays, and radiation.

#### student Name ####
Chang Yao
#### Nua student ID  ####
B161006101
### ScreenShot of work ###
I think the most difficult part is the writing of the css,which i complete this by seeking my classmates' help and asking my teacher.

![overall effect](ScreenShot/ss1.png)

### Usage ###
#### css ####
```html
<script src="build/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
```
* Reference the library.

```html
  <link rel="stylesheet" type="text/css" href="css/style.css">
```
* Reference the css.

#### css ####
```css
#objectinfo {
	position: absolute;
    color: white;
	  top: 10px;
    left:10px;
	width: 100%;
	text-align: left;
	z-index: 100;
	display:block;
    text-shadow: -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
     1px 1px 0 #000;
}

```
* The purpose of this code in the css is to control the font size of the text generated on the screen.
#### js ####

```javascript
var renderer, scene, camera;
var controls, material, geometry;
var objects = [];
var randomRotationX = [];
var randomRotationY = [];
```
* Global variables.

```javascript
scene = new THREE.Scene();
```
* Create an empty scene.

```javascript
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.set(0, 55, 85);
camera.lookAt(scene.position);
```
* Create a basic perspective camera.

```javascript
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(1000, 0, 1000);
scene.add(spotLight);
```
* Configure spotlight.

```javascript
var ambLight = new THREE.AmbientLight(0xFFFFFF);
ambLight.position.set(0,10000,0);
ambLight.add(spotLight);
scene.add(ambLight);
```
* Configure amblight.

```javascript
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio( window.devicePixelRatio );
```
* Create a renderer with Antialiasing.

```javascript
renderer.setSize( window.innerWidth, window.innerHeight );
```
* Configure renderer size.

```javascript
renderer.setClearColor(0x000000);
```
* Configure renderer clear color.

```javascript
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
```
*  Let camera can be controled by mouse.

```javascript
var randomSelection = Math.round(Math.random()*6)+1;
```
* Set random selection range.

```javascript
var	texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection+".jpg" );
```
* Load random textures.

```javascript
var	texture1 = new THREE.TextureLoader().load( "textures/texture7.jpg" );
```
* Load selected texture.

```javascript
for (var x = -10; x <= 5; x += 5) {..}
for (var y = -10; y <= 5; y += 5) {..}
for (var z = -10; z <= 5; z += 5) {..}
```
* Start from -10 and sequentially add one every 5 pixels.

```javascript
  if (x >= 0 && y >=0 && z >=0){...}
```
*  Create different kinds of geometries in different domains.

```javascript
    if (x >= 0 && y >=0 && z >=0){
    geometry = new THREE.BoxGeometry(3, 3, 3);
  } else if ( x <= 0 && y >= 0 && z >=0){
    geometry = new THREE.ConeGeometry( 2, 3, 32);
  } else if ( x >= 0 && y <= 0 && z >=0){
    geometry = new THREE.CylinderGeometry( 2, 2, 3, 32 );
  } else if ( x >= 0 && y >= 0 && z <=0){
    geometry = new THREE.IcosahedronGeometry(3, 0);
  } else if ( x <= 0 && y <= 0 && z >=0){
    geometry = new THREE.SphereGeometry( 2, 32, 32 );
  } else if ( x <= 0 && y >= 0 && z <=0){
    geometry = new THREE.TetrahedronGeometry(3, 0);
  } else if ( x >= 0 && y <= 0 && z <=0){
    geometry = new THREE.TorusGeometry( 2, 1, 8, 6 );
  } else {
    geometry = new THREE.OctahedronGeometry(3, 0);
  }
```
* The whole piece of code.

```javascript
if (x >= 0 && y >=0 && z >=0){
material = new THREE.MeshLambertMaterial( {color: Math.random() * 0xFFFFFF} );
} else if ( x <= 0 && y >= 0 && z >=0){
material = new THREE.MeshBasicMaterial( { color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending } );
} else if ( x >= 0 && y <= 0 && z >=0){
material = new THREE.MeshLambertMaterial( { map: texture1, transparent: true } );
} else if ( x >= 0 && y >= 0 && z <=0){
material = new THREE.MeshLambertMaterial( {color: 0x355C7D} );
} else if ( x <= 0 && y <= 0 && z >=0){
material = new THREE.MeshBasicMaterial( { map: texture} );
} else if ( x <= 0 && y >= 0 && z <=0){
material = new THREE.MeshNormalMaterial( { flatShading: true } );
} else if ( x >= 0 && y <= 0 && z <=0){
material = new THREE.MeshBasicMaterial( { color: 0xffaa00, wireframe: true } );
} else {
material = new THREE.MeshPhongMaterial( { color: 0x6C5B7B, specular: 0x666666, emissive: 0xff0000, shininess: 10, opacity: 0.5, transparent: true } );
}
```
* The whole piece of code to create different kinds of materials in different domains.

```javascript
var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
```
* Create mesh and configure the position of mesh.

```javascript
var randomValueX = (Math.random() * 0.1)- 0.05;
var randomValueY = (Math.random() * 0.1)- 0.05;
```
* Create random speed values of rotation.

```javascript
randomRotationX.push(randomValueX);
randomRotationY.push(randomValueY);
```
* push value array to rotation speeds.

```javascript
scene.add(mesh);
```
* Add the mesh to the scene.

```javascript
objects.push(mesh);
```
* push mesh array to objects.

```javascript
document.body.appendChild(renderer.domElement);
```
* Append Renderer to DOM.

```javascript
window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener( "mousemove", onDocumentMouseMove, false );
```
* Add a series of listening events.

```javascript
function drawFrame(){
  requestAnimationFrame(drawFrame);
}
```
* Render Loop.

```javascript
objects.forEach(function(o,i){
	o.rotation.x += randomRotationX[i];
	o.rotation.y += randomRotationY[i];
});
```
* Rotate the objects independently.

```javascript
renderer.render(scene, camera);
```
* Render the scene.

```javascript
function onWindowResize() {}
```
* Events triggered when the mouse moves.

```javascript
 camera.aspect = window.innerWidth / window.innerHeight;
```
*  Change the camera's aspect attribute to the width and height of the current window.

```javascript
camera.updateProjectionMatrix();
```
* Updating the projection matrix of the camera.

```javascript
renderer.setSize( window.innerWidth, window.innerHeight );
}
```
* Reset scene width and height.

```javascript
  var textfiled = document.getElementById("objectinfo");
```
* get the div element which I added in index.html to show object number; I also link .css file in .html file.

```javascript
if ( selectedObject ) {
	selectedObject = null;
	textfiled.style.display="none";
}
```
* hide object number when select the objects.

```javascript
var intersects = getIntersects( event.layerX, event.layerY );
	if ( intersects.length > 0 ) {
		var res = intersects[ 0 ];
		if ( res && res.object ) {
			selectedObject = res.object;
		}
	}
```
* The position of the point in the mouse point minus the offset vector, and the new position is assigned to the selected object.
* Judge whether objects intersect with raycaster.

```javascript
  var num =(selectedObject.getWorldPosition().x/5+3)+(selectedObject.getWorldPosition().y/5+3-1)*4+(selectedObject.getWorldPosition().z/5+3-1)*16;
```
*  I use position of selected object to calculate the number of objects.

```javascript
  textfiled.textContent = num.toString();
```
* set object number I calculated before.

```javascript
  textfiled.style.display="block";
```
* show object number.

```javascript
textfiled.style.top =  event.clientY+10+"px";
textfiled.style.left = event.clientX+10+"px";
```
* set the number position.

```javascript
	var raycaster = new THREE.Raycaster();
```
* Create a raycaster.

```javascript
var mouseVector = new THREE.Vector2();
function getIntersects( x, y ) {
	x = ( x / window.innerWidth ) * 2 - 1;
	y = - ( y / window.innerHeight ) * 2 + 1;
}
```
* Create a new Two-Dimensional Transform Semi-Unit Vector.

```javascript
mouseVector.set( x, y );
raycaster.setFromCamera( mouseVector, camera );
```
* Screen and raycaster convert this vector from screen to scene based on the camera.

```javascript
	return raycaster.intersectObjects( scene.children, true );
```
* Set recursion to "true" and for .intersectObject for each child. Once an array is established, it calls the callback function provided on the array.
