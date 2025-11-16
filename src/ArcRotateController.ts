import * as THREE from "three";

export class ArcRotateController {
  camera: THREE.Camera;
  dom: HTMLElement;

  target = new THREE.Vector3();
  alpha = Math.PI * 0.5; // yaw
  beta = Math.PI * 0.3;  // pitch
  radius = 10;

  private currentAlpha = this.alpha;
  private currentBeta = this.beta;
  private currentRadius = this.radius;
  private currentTarget = this.target.clone();

  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private dragButton: number | null = null;

  private rafId: number | null = null;

  constructor(camera: THREE.Camera, dom: HTMLElement) {
    this.camera = camera;
    this.dom = dom;

    this.applyCamera();

    dom.addEventListener("mousedown", this.onDown);
    dom.addEventListener("mousemove", this.onMove);
    dom.addEventListener("mouseup", this.onUp);
    dom.addEventListener("mouseleave", this.onUp);
    dom.addEventListener("wheel", this.onWheel, { passive: true });
    dom.addEventListener("contextmenu", this.onContextMenu);
  }

  dispose() {
    this.dom.removeEventListener("mousedown", this.onDown);
    this.dom.removeEventListener("mousemove", this.onMove);
    this.dom.removeEventListener("mouseup", this.onUp);
    this.dom.removeEventListener("mouseleave", this.onUp);
    this.dom.removeEventListener("wheel", this.onWheel);
    this.dom.removeEventListener("contextmenu", this.onContextMenu);

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  private onDown = (e: MouseEvent) => {
    this.dragging = true;
    this.dragButton = e.button; // 0: left, 1: middle, 2: right
    this.lastX = e.clientX;
    this.lastY = e.clientY;
  };

  private onMove = (e: MouseEvent) => {
    if (!this.dragging) return;

    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    this.lastX = e.clientX;
    this.lastY = e.clientY;

    if (this.dragButton === 2) {
      this.handlePan(dx, dy);
    } else if (this.dragButton === 0) {
      this.handleOrbit(dx, dy);
    }
  };

  private onUp = () => {
    this.dragging = false;
    this.dragButton = null;
  };

  private onWheel = (e: WheelEvent) => {
    const s = Math.exp(e.deltaY * 0.0015);
    this.radius = THREE.MathUtils.clamp(this.radius * s, 1.2, 20);
    this.scheduleUpdate();
  };

  setTarget(v: THREE.Vector3) {
    this.target.copy(v);
    this.scheduleUpdate();
  }

  // ===== 내부 로직 =====

  private handleOrbit(dx: number, dy: number) {
    this.alpha += dx * 0.005;
    this.beta -= dy * 0.005;

    const eps = 0.001;
    this.beta = Math.max(eps, Math.min(Math.PI - eps, this.beta));

    this.scheduleUpdate();
  }

  private handlePan(dx: number, dy: number) {
    const panSpeed = this.radius * 0.001;

    const offsetX = -dx * panSpeed;
    const offsetY = dy * panSpeed;

    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(this.camera.quaternion);

    const panOffset = new THREE.Vector3()
      .addScaledVector(right, offsetX)
      .addScaledVector(up, offsetY);

    this.target.add(panOffset);
    this.scheduleUpdate();
  }

  private applyCamera() {
    const x =
      this.currentTarget.x +
      this.currentRadius * Math.sin(this.currentBeta) * Math.cos(this.currentAlpha);
    const y =
      this.currentTarget.y +
      this.currentRadius * Math.cos(this.currentBeta);
    const z =
      this.currentTarget.z +
      this.currentRadius * Math.sin(this.currentBeta) * Math.sin(this.currentAlpha);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.currentTarget);
  }

  private scheduleUpdate() {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  private animate = () => {
    this.rafId = null;

    const ease = 0.08;
    let needMore = false;

    this.currentAlpha = THREE.MathUtils.lerp(this.currentAlpha, this.alpha, ease);
    this.currentBeta = THREE.MathUtils.lerp(this.currentBeta, this.beta, ease);
    this.currentRadius = THREE.MathUtils.lerp(this.currentRadius, this.radius, ease);

    this.currentTarget.lerp(this.target, ease);

    this.applyCamera();

    const eps = 1e-4;
    if (
      Math.abs(this.currentAlpha - this.alpha) > eps ||
      Math.abs(this.currentBeta - this.beta) > eps ||
      Math.abs(this.currentRadius - this.radius) > eps ||
      this.currentTarget.distanceToSquared(this.target) > eps * eps
    ) {
      needMore = true;
    }

    if (needMore) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  };
}
