import * as THREE from "three";

export class ArcRotateController {
  camera: THREE.Camera;
  dom: HTMLElement;

  target = new THREE.Vector3();
  alpha = Math.PI * 0.25; // yaw
  beta = Math.PI * 0.35; // pitch
  radius = 4.5;

  private dragging = false;
  private lastX = 0;
  private lastY = 0;

  constructor(camera: THREE.Camera, dom: HTMLElement) {
    this.camera = camera;
    this.dom = dom;

    this.updateCamera();

    dom.addEventListener("mousedown", this.onDown);
    dom.addEventListener("mousemove", this.onMove);
    dom.addEventListener("mouseup", this.onUp);
    dom.addEventListener("mouseleave", this.onUp);
    dom.addEventListener("wheel", this.onWheel, { passive: true });
  }

  dispose() {
    this.dom.removeEventListener("mousedown", this.onDown);
    this.dom.removeEventListener("mousemove", this.onMove);
    this.dom.removeEventListener("mouseup", this.onUp);
    this.dom.removeEventListener("mouseleave", this.onUp);
    this.dom.removeEventListener("wheel", this.onWheel);
  }

  private onDown = (e: MouseEvent) => {
    this.dragging = true;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  private onMove = (e: MouseEvent) => {
    if (!this.dragging) return;
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;

    this.alpha += dx * 0.005;
    this.beta -= dy * 0.005;

    const eps = 0.001;
    this.beta = Math.max(eps, Math.min(Math.PI - eps, this.beta));

    this.updateCamera();
  };

  private onUp = () => {
    this.dragging = false;
  };

  private onWheel = (e: WheelEvent) => {
    const s = Math.exp(e.deltaY * 0.0015);
    this.radius = THREE.MathUtils.clamp(this.radius * s, 1.2, 20);
    this.updateCamera();
  };

  setTarget(v: THREE.Vector3) {
    this.target.copy(v);
    this.updateCamera();
  }

  private updateCamera() {
    const x = this.target.x + this.radius * Math.sin(this.beta) * Math.cos(this.alpha);
    const y = this.target.y + this.radius * Math.cos(this.beta);
    const z = this.target.z + this.radius * Math.sin(this.beta) * Math.sin(this.alpha);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.target);
  }
}
