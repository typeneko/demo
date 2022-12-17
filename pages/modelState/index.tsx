import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import useRoomModel from "../../utils/useRoomModel";
import useCheckDevice from "../../utils/useCheckDevice";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

const Model = () => {
  const pointColor = "#FFEB94";
  const pointIntensity = 0.5;
  const boxSize: any = [0.05, 0.05, 0.05];
  // Canvas is responsive to fit the parent node,
  // so you can control how big it is by changing
  // the parents width and height.
  return (
    <div className="w-[100vw] h-[100vh]">
      <Suspense fallback={<span>Loading...</span>}>
        <Canvas
          gl={{
            toneMapping: THREE.ReinhardToneMapping,
            toneMappingExposure: 2.3,
          }}
          orthographic
          camera={{ position: [0, 6, 10], zoom: 160 }}
          shadows
        >
          <OrbitControls />

          <ambientLight intensity={0.4} color="#FEF3E3" />
          <spotLight
            args={["#FEF3E3", 1]}
            castShadow
            position={[3, 5, 6]}
            shadow-mapSize={4096}
            shadow-normalBias={-0.0001}
            shadow-bias={-0.0001}
            shadow-camera-near={0.1}
            shadow-camera-far={10}
            shadow-camera-top={-3}
            shadow-camera-bottom={3}
            shadow-camera-left={-3}
            shadow-camera-right={3}
          >
            <mesh>
              <boxGeometry args={[0.1, 0.1, 0.1]}></boxGeometry>
              <meshBasicMaterial color={0xff0000} />
            </mesh>
          </spotLight>

          <pointLight
            color="#F9F4E6"
            position={[-0.1, 1, -0.1]}
            intensity={0.6}
            distance={3}
          >
            <mesh>
              <boxGeometry args={[0.1, 0.1, 0.1]}></boxGeometry>
              <meshBasicMaterial color={0xff0000} />
            </mesh>
          </pointLight>

          <Room />
          <mesh
            rotation={[Math.PI / 2 + Math.PI, 0, 0]}
            position={[0, -1.25, 0]}
            receiveShadow
          >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color={0xfef3e3} />
          </mesh>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Model;

const Room = () => {
  // custom hook to set Room Models
  const [model, elements] = useRoomModel("/models/lecouernew.glb");
  console.log(elements.current);
  // resize observer
  const device = useCheckDevice();

  return (
    <primitive
      rotation={[0, -Math.PI / 4, 0]}
      object={model.current.scene}
      scale={0.4}
      position={[0, -1.1, 0]}
    />
  );
};
