init();

function init(){
    var scene = new THREE.Scene();
    
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();

    // scene.fog=new THREE.Fog( 0x777777, 0.15, 100 );

    renderer.setClearColorHex(0x111111);

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMapEnabled = true;

    var axes = new THREE.AxisHelper(20);

    axes.position.x = -4.3;

    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(50,20,1,1);

    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xeeeee});

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x=-0.5*Math.PI;
    plane.position.x = 5;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;

    scene.add(plane);

    var cubeGeometry = new THREE.CubeGeometry(4,4,4);
    
    var cubeMaterial = new THREE.MeshLambertMaterial(
        {color: 0xcccccc, wireframe: true});

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.x = -8;
    cube.position.y = 3;
    cube.position.z = 0;
    cube.castShadow = true;

    scene.add(cube);

    var sphereGeometry = new THREE.SphereGeometry(4,20,20);

    var sphereMaterial = new THREE.MeshLambertMaterial({
        color: 0xcccccc,
        wireframe: true
    });

    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 10;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;

    scene.add(sphere);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    var steps = 0;

    window.onload = function(){
        document.getElementById('output').appendChild(renderer.domElement);
        window.addEventListener( 'resize', onWindowResize, false );
    }

    renderScene();

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
    }

    function renderScene(){

        cube.rotation.x += 0.02;
        cube.rotation.y += 0.02;
        cube.rotation.z += 0.02;

        steps +=0.03;
        sphere.position.x = 20+( 10*(Math.cos(steps)));
        sphere.position.y = 2+( 10*Math.abs(Math.sin(steps)));


        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    }
}