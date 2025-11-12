import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export type ModelConfig = {
  path: string
  targetScale: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  metalness?: number
  roughness?: number
  envMapIntensity?: number
  lightBoost?: number
  exposure?: number
  ambientBoost?: number
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function prepareGLB(root: THREE.Object3D, opts: Partial<ModelConfig>) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;

    if ((mesh as any).isMesh) {
      const setStd = (mm: THREE.MeshStandardMaterial) => {
        if (!mm.isMeshStandardMaterial) return;
        if (opts.metalness !== undefined) mm.metalness = opts.metalness;
        if (opts.roughness !== undefined) mm.roughness = opts.roughness;
        if (opts.envMapIntensity !== undefined) mm.envMapIntensity = opts.envMapIntensity;
        if (opts.metalness === 0 && opts.roughness === undefined) {
          mm.roughness = Math.min(mm.roughness ?? 0.9, 0.35);
        }
      }

      const mat = mesh.material as THREE.Material | THREE.Material[];
      Array.isArray(mat) ? mat.forEach(m => setStd(m as any)) : setStd(mat as any);

      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  })
}

function ScaledModel({
  path,
  scale,
  config,
}: {
  path: string;
  scale: number;
  config: ModelConfig;
}) {
  const { scene } = useGLTF(path);
  const local = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    prepareGLB(local, config);
    local.position.set(...(config.position ?? [0, -4, 0]));
    local.rotation.set(...(config.rotation ?? [0, 0, 0]));
  }, [local, config]);

  useFrame(() => {
    const s = Math.max(0.001, scale) * config.targetScale;
    local.scale.set(s, s, s);
  });

  return <primitive object={local} />
}

export function ModelSwitcher({
  config,
  everySec = 5,
  shrinkSec = 0.8,
  growSec = 0.8,
  onLightChange,
  onVisualChange,
}: {
  config: ModelConfig[];
  everySec?: number;
  shrinkSec?: number;
  growSec?: number;
  onLightChange?: (value: number) => void;
  onVisualChange?: (v: { ambientBoost?: number; exposure?: number }) => void
}) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [phase, setPhase] = useState<"hold" | "shrink" | "grow">("hold");
  const [t, setT] = useState(0);

  const timerRef = useRef(0);

  useEffect(() => {
    const c = config[current]
    onLightChange?.(c.lightBoost ?? 1)
    onVisualChange?.({ ambientBoost: c.ambientBoost, exposure: c.exposure })
  }, [current, config, onLightChange, onVisualChange])

  useFrame((_, dt) => {
    timerRef.current += dt;

    if (phase === "hold" && timerRef.current >= everySec) {
      timerRef.current = 0;
      setPhase("shrink");
      setT(0);
    } else if (phase === "shrink") {
      const progress = easeInOutCubic(Math.min(1, t / shrinkSec));
      if (progress >= 1) {
        setPhase("grow");
        setNext((current + 1) % config.length);
        setCurrent((i) => (i + 1) % config.length);
        setT(0);
      }
      setT((prev) => prev + dt);
    } else if (phase === "grow") {
      const progress = easeInOutCubic(Math.min(1, t / growSec));
      if (progress >= 1) {
        setPhase("hold");
        setT(0);
        timerRef.current = 0;
      }
      setT((prev) => prev + dt);
    }
  });

  let scale = 1;
  if (phase === "shrink") scale = 1 - easeInOutCubic(Math.min(1, t / shrinkSec));
  else if (phase === "grow") scale = easeInOutCubic(Math.min(1, t / growSec));

  return (
    <>
      {phase === "grow" && next !== null ? (
        <ScaledModel path={config[next].path} scale={scale} config={config[next]} />
      ) : (
        <ScaledModel path={config[current].path} scale={scale} config={config[current]} />
      )}
    </>
  );
}
