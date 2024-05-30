import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  private readonly MIN_ZOOM = 1.0;
  private readonly MAX_ZOOM = 2.0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  private initScene() {
    const canvas = this.canvasRef.nativeElement;

    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    const fov = 60;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 2;
    this.scene.add(this.camera);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.autoClear = false;
    this.renderer.setClearColor(0x000000, 0.0);

    // Orbit control setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(0.9, 64, 64);

    // Earth material
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('../../assets/earth.jpg');
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
    });

    // Earth mesh
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.position.x = 0.0;
    this.scene.add(earthMesh);

    // Convert geographic to 3D coordinates
    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    };

    // Red dots
    const dotGeometry = new THREE.SphereGeometry(0.0025, 8, 8);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // Load city coordinates from data.json
    fetch('../../assets/data.json')
      .then(response => response.json())
      .then(data => {
        data.forEach((city: { lat: number; lon: number }) => {
          const dot = new THREE.Mesh(dotGeometry, dotMaterial);
          const position = latLonToVector3(city.lat, city.lon, 0.9);
          dot.position.copy(position);
          this.scene.add(dot);
        });
      })
      .catch(error => {
        console.error('Error fetching city coordinates:', error);
      });

    // Space geometry
    const starGeometry = new THREE.SphereGeometry(80, 64, 64);

    // Space material
    const starTexture = textureLoader.load('../../assets/space.jpg');
    const starMaterial = new THREE.MeshBasicMaterial({
      map: starTexture,
      side: THREE.BackSide,
    });

    // Space mesh
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    this.scene.add(starMesh);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);

    this.handleResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.handleResize();
  }

  private handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  zoomIn() {
    if (this.camera.position.z > this.MIN_ZOOM) {
      this.camera.position.z -= 0.05;
      if (this.camera.position.z < this.MIN_ZOOM) {
        this.camera.position.z = this.MIN_ZOOM;
      }
    }
  }

  zoomOut() {
    if (this.camera.position.z < this.MAX_ZOOM) {
      this.camera.position.z += 0.05;
      if (this.camera.position.z > this.MAX_ZOOM) {
        this.camera.position.z = this.MAX_ZOOM;
      }
    }
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.render();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }
}
