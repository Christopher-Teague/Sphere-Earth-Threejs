import React, { Component } from "react";
import * as THREE from "three";
// import OrbitControls from "three-orbitcontrols";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class ThreeScene extends Component {
    
    componentDidMount(){
        // scene
        this.scene = new THREE.Scene();

        //renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth , window.innerHeight);

        this.mount.appendChild(this.renderer.domElement);

        //camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z=5;

        // Create Box
        let geometry = new THREE.BoxGeometry(2,2,2);
        let material = new THREE.MeshBasicMaterial({
            color: "dodgerblue",
            wireframe: true
        });
        this.cube = new THREE.Mesh(geometry,material);

        //Add to scene
        this.scene.add(this.cube);
        this.animation();
        this.renderer.render(this.scene,this.camera);
        
        // orbit controls
        new OrbitControls(this.camera, this.renderer.domElement);
        
        //Event Handler
        window.addEventListener("resize", this.handleWindowResize);
    
    }

    animation = () => {
        requestAnimationFrame(this.animation);
        this.cube.rotation.x +=0.005
        this.cube.rotation.y +=0.005
        this.renderer.render(this.scene, this.camera);
    }

    handleWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
    }

    
    render() {
        return(
            <div
            ref={mount => {
                this.mount = mount;
            }}
            />
        )
    }
}

export default ThreeScene;