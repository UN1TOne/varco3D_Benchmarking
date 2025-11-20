import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { centerModelToOrigin } from "./modelUtils";
import { ArcRotateController } from "./ArcRotateController";

function CenteredHamburger() {
    const { scene } = useGLTF("/models/hamburger.glb");
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (!groupRef.current) return;

        const g = groupRef.current;
        g.clear();

        const cloned = scene.clone(true);
        g.add(cloned);

        centerModelToOrigin(g, 2.5, 0);
    }, [scene]);

    return <group ref={groupRef} />;
}


function StartRig() {
    const { camera, gl, scene } = useThree();
    const controllerRef = useRef<ArcRotateController | null>(null);

    useEffect(() => {
        camera.near = 0.1;
        camera.far = 100;
        camera.updateProjectionMatrix();

        camera.position.set(0, 1.2, 6);
        camera.lookAt(0, 0, 0);

        scene.background = new THREE.Color(0x272727);

        const grid = new THREE.GridHelper(10, 11);
        grid.material.opacity = 0.4;
        grid.material.transparent = true;
        scene.add(grid);

        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMappingExposure = 1.1;

        const amb = new THREE.AmbientLight(0xffffff, 0.35);
        const key = new THREE.DirectionalLight(0xffffff, 2.5);
        key.position.set(3, 5, 4);
        const rim = new THREE.DirectionalLight(0x88aaff, 1.5);
        rim.position.set(-4, 3, -3);

        scene.add(amb, key, rim);

        const dom = gl.domElement;
        controllerRef.current = new ArcRotateController(camera, dom);
        controllerRef.current.setTarget(new THREE.Vector3(0, 0, 0));

        return () => {
            scene.remove(amb, key, rim);
            controllerRef.current?.dispose();
        };
    }, [camera, gl, scene]);

    return null;
}

export function StartScene() {
    return (
        <Canvas
            camera={{ fov: 45, position: [0, 1.2, 6] }}
            dpr={[1, 2]}
            style={{
                width: "100%",
                height: "100%",
                touchAction: "none",
            }}
        >
            <Environment files="/images/studio.hdr" background={false} />
            <StartRig />
            <CenteredHamburger />
        </Canvas>
    );
}

useGLTF.preload("/models/hamburger.glb");
