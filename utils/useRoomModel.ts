import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { ObjectMap } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface ElementsObject {
  [key: string]: THREE.Group | THREE.Mesh;
}

const useRoomModel = (
  src: string
): [MutableRefObject<GLTF & ObjectMap>, MutableRefObject<ElementsObject>] => {
  const room = useGLTF(src);
  const modelRef = useRef(room);
  const elements = useRef<ElementsObject>({} as ElementsObject);

  // set Model
  modelRef.current.scene.children.forEach((child: any) => {
    elements.current[child.name.toLowerCase()] = child;
    child.castShadow = true;
    child.receiveShadow = true;

    // if it's a group then add the shadowing first
    if (child instanceof THREE.Group) {
      child.children.forEach((groupchild) => {
        groupchild.castShadow = true;
        groupchild.receiveShadow = true;
      });
    }
    if (child instanceof THREE.Object3D) {
      child.children.forEach((groupchild) => {
        groupchild.castShadow = true;
        groupchild.receiveShadow = true;
      });
    }

    if (child.name === "grinder_glass") {
      child.castShadow = false;
      child.material = new THREE.MeshPhysicalMaterial();
      child.material.transmission = 0.1;
      child.material.roughness = 0.15;
      child.material.metalness = 0.6;
      child.material.color.set(0xffffff);
      //child.material.color.set(0xeaf6ff);
      child.material.ior = 2;
      child.material.opacity = 1;
      child.material.thickness = 0.1;
    }

    //child.scale.set(0, 0, 0);
    // if (child.name === "table") {
    //   child.scale.set(0, 0, 0);
    // }
    if (child.name === "tea_bottle") {
      console.log(child.material);
      child.material.roughness = 0.05;
    }
  });

  return [modelRef, elements];
};

export default useRoomModel;
