import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { ModelSwitcher } from "./ModelSwithcer";

function Rig() {
    const base = useRef(0);
    const groupRef = useRef<THREE.Group>(null);
    const p1Ref = useRef<THREE.PointLight>(null);
    const p2Ref = useRef<THREE.PointLight>(null);
    const ambRef = useRef<THREE.AmbientLight>(null);
    const { camera, scene, gl } = useThree();

    const [lightBoost, setLightBoost] = useState(1);
    const [ambientBoost, setAmbientBoost] = useState(0.3);
    const [targetExposure, setTargetExposure] = useState(1);

    useEffect(() => {
        scene.fog = new THREE.FogExp2(0x11151c, 0.15);
        camera.near = 0.1;
        camera.far = 1000;
        camera.updateProjectionMatrix();

        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
    }, [scene, camera, gl])

    useFrame((_, dt) => {
        base.current += dt * 0.25;
        const t = base.current;

        camera.position.set(Math.sin(t) * 10, Math.cos(t), Math.cos(t) * 10);
        camera.lookAt(0, 0, 0);

        const p1 = p1Ref.current, p2 = p2Ref.current, amb = ambRef.current;
        if (p1 && p2) {
            const intensity = 15 * lightBoost;
            p1.intensity = intensity;
            p2.intensity = intensity;
            p1.position.set(Math.sin(t + 1) * 11, 2 * Math.cos(t - 3) + 3, Math.cos(t + 1) * 11);
            p2.position.set(-Math.sin(t + 1) * 11, 2 * -Math.cos(t - 3) - 6, -Math.cos(t + 1) * 11);
        }
        if (amb) amb.intensity = 0.4 * ambientBoost;

        gl.toneMappingExposure = THREE.MathUtils.lerp(gl.toneMappingExposure, targetExposure, 0.1);
        if (groupRef.current) groupRef.current.rotation.y += 0.01;
    })

    return (
        <group ref={groupRef}>
            <ambientLight ref={ambRef} intensity={0.12} />
            <pointLight ref={p1Ref} color={0x85ccb8} intensity={7.5} distance={20} />
            <pointLight ref={p2Ref} color={0x9f85cc} intensity={7.5} distance={20} />

            <ModelSwitcher
                everySec={5}
                shrinkSec={1}
                growSec={1}
                onLightChange={(v) => setLightBoost(v)}
                onVisualChange={(v) => {
                    if (v.ambientBoost !== undefined) setAmbientBoost(v.ambientBoost);
                    if (v.exposure !== undefined) setTargetExposure(v.exposure);
                }}
                config={[
                    { path: "/models/statue.glb", targetScale: 2.0, position: [0, -4, 0], metalness: 0.5, envMapIntensity: 3, lightBoost: 1, ambientBoost: 0.3, exposure: 1.0 },
                    { path: "/models/isometric.glb", targetScale: 5, position: [0, 0, 1], metalness: 0, envMapIntensity: 8, lightBoost: 5, ambientBoost: 6, exposure: 1.4 },
                    { path: "/models/hamburger.glb", targetScale: 5, position: [0, 0, 0], metalness: 0, envMapIntensity: 6, lightBoost: 5, ambientBoost: 3, exposure: 1.5 },
                ]}
            />
        </group>
    )
}

export function Scene() {
    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
            camera={{ fov: 45, position: [0, 0, 10] }}
            dpr={[1, 2]}
            style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
        >
            <Environment files="/images/studio.hdr" background={false} />
            <Rig />
            <EffectComposer>
                <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.3} />
            </EffectComposer>
        </Canvas>
    );
}

useGLTF.preload("/models/statue.glb");
useGLTF.preload("/models/isometric.glb");
useGLTF.preload("/models/hamburger.glb");
