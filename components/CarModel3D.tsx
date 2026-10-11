"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Eye, Undo2, Box, Image as ImageIcon } from "lucide-react";
import { Car } from "@/data/cars";
import CarImage from "./CarImage";

const CAR_COLORS = [
  { name: "سفید", hex: "#F8F8F6" },
  { name: "مشکی", hex: "#0a0a0a" },
  { name: "طلایی", hex: "#C9A227" },
  { name: "سبز", hex: "#1F6F5C" },
  { name: "نقره‌ای", hex: "#B8BCC2" },
  { name: "قرمز", hex: "#8B1A1A" },
];

const BODY_MATERIALS = [
  "w206_color1",
  "w206_color2",
  "w206_color4",
  "w206_paint",
];

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#C9A227]/30 border-t-[#C9A227]" />
        <p className="text-sm text-[#C9A227]">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

function CarModel({
  color,
  modelPath,
}: {
  color: string;
  modelPath: string;
}) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mats = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        mats.forEach((mat) => {
          const material = mat as THREE.MeshStandardMaterial;
          const nameLower = (material.name || "").toLowerCase();

          const isBodyMaterial = BODY_MATERIALS.some(
            (bodyName) => nameLower === bodyName.toLowerCase()
          );

          if (isBodyMaterial && material.color) {
            material.color.set(color);
          }
        });
      }
    });
  }, [scene, color]);

  return (
    <primitive
      object={scene}
      position={[0, -0.5, 0]}
      scale={1}
      rotation={[0, 0, 0]}
    />
  );
}

// 🎥 نگاه داخل: دوربین ثابت، اما با موس می‌چرخه
function InsideCamera() {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ yaw: 0, pitch: 0 });

  useEffect(() => {
    camera.position.set(-0.13, 0.85, -0.3);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    gl.domElement.addEventListener("mousemove", handleMouseMove);
    return () => {
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, gl]);

  useFrame(() => {
    const targetYaw = mouse.current.x * Math.PI * 0.45;
    const targetPitch = mouse.current.y * Math.PI * 0.25;

    rotation.current.yaw += (targetYaw - rotation.current.yaw) * 0.08;
    rotation.current.pitch += (targetPitch - rotation.current.pitch) * 0.08;

    const lookDistance = 3;
    const dirX = Math.sin(rotation.current.yaw);
    const dirY = Math.sin(rotation.current.pitch);
    const dirZ =
      Math.cos(rotation.current.yaw) * Math.cos(rotation.current.pitch);

    camera.lookAt(
      camera.position.x + dirX * lookDistance,
      camera.position.y + dirY * lookDistance,
      camera.position.z + dirZ * lookDistance
    );
  });

  return null;
}

function CameraController({ isInside }: { isInside: boolean }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (isInside) return;

    camera.position.set(6, 3, 6);

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0.3, 0);
      controlsRef.current.update();
    }
  }, [isInside, camera]);

  if (isInside) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={3}
      maxDistance={20}
      autoRotate={true}
      autoRotateSpeed={0.5}
    />
  );
}

useGLTF.preload("/models/c200l.glb");

export default function CarModel3D({ car }: { car: Car }) {
  const [selectedColor, setSelectedColor] = useState(car.colorHex);
  const [isInside, setIsInside] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "image">("3d");

  // وقتی ماشین عوض می‌شه، تنظیمات رو ریست کن
  useEffect(() => {
    setSelectedColor(car.colorHex);
    setIsInside(false);
    setViewMode("3d");
  }, [car]);

  return (
    <div className="relative h-full w-full">
      {/* نمایش بر اساس حالت */}
      {viewMode === "3d" ? (
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <PerspectiveCamera
            makeDefault
            position={[6, 3, 6]}
            fov={isInside ? 80 : 45}
          />

          <ambientLight intensity={isInside ? 2 : 0.6} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={2.5}
            castShadow
          />
          <spotLight
            position={[-10, 10, -10]}
            angle={0.3}
            penumbra={1}
            intensity={1.5}
            color="#C9A227"
          />

          {isInside && (
            <>
              <pointLight
                position={[-0.13, 1.5, -0.3]}
                intensity={3}
                color="#ffffff"
              />
              <pointLight
                position={[-0.13, 1, 1]}
                intensity={2}
                color="#ffffff"
              />
              <pointLight
                position={[-0.13, 1, -1.5]}
                intensity={2}
                color="#ffffff"
              />
            </>
          )}

          <Environment preset="city" />

          <Suspense fallback={<Loader />}>
            <CarModel color={selectedColor} modelPath={car.model3d} />
          </Suspense>

          {!isInside && (
            <ContactShadows
              position={[0, -0.55, 0]}
              opacity={0.7}
              scale={15}
              blur={2.5}
              far={5}
              color="#C9A227"
            />
          )}

          {isInside ? <InsideCamera /> : <CameraController isInside={false} />}
        </Canvas>
      ) : (
        <CarImage car={car} />
      )}

      {/* 🎯 دکمه‌ی toggle 3D/عکس (فقط وقتی داخل کابین نیستیم) */}
      {!isInside && (
        <div className="pointer-events-auto absolute top-3 left-3 z-20 flex gap-1 rounded-full border border-[#C9A227]/40 bg-[#0a0e0c]/80 p-1 backdrop-blur-md">
          <button
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              viewMode === "3d"
                ? "bg-[#C9A227] text-[#0a0e0c]"
                : "text-[#B8BCC2] hover:text-[#C9A227]"
            }`}
          >
            <Box className="h-3 w-3" />
            3D
          </button>
          <button
            onClick={() => setViewMode("image")}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              viewMode === "image"
                ? "bg-[#C9A227] text-[#0a0e0c]"
                : "text-[#B8BCC2] hover:text-[#C9A227]"
            }`}
          >
            <ImageIcon className="h-3 w-3" />
            عکس
          </button>
        </div>
      )}

      {/* دکمه داخل/بیرون (فقط در حالت 3D) */}
      {viewMode === "3d" && (
        <button
          onClick={() => setIsInside(!isInside)}
          className={`pointer-events-auto absolute top-3 right-3 z-20 flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold backdrop-blur-md transition-all ${
            isInside
              ? "border-[#C9A227] bg-[#C9A227] text-[#0a0e0c]"
              : "border-[#C9A227]/40 bg-[#0a0e0c]/80 text-[#C9A227] hover:bg-[#C9A227] hover:text-[#0a0e0c]"
          }`}
        >
          {isInside ? (
            <>
              <Undo2 className="h-4 w-4" />
              بازگشت به بیرون
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              مشاهده داخل کابین
            </>
          )}
        </button>
      )}

      {/* رنگ‌ها (فقط در حالت 3D و نمای بیرون) */}
      {viewMode === "3d" && !isInside && (
        <div className="pointer-events-auto absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#1F6F5C]/30 bg-[#0a0e0c]/80 px-3 py-2 backdrop-blur-md">
          <span className="mr-1 text-xs text-[#B8BCC2]">رنگ:</span>
          {CAR_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(c.hex)}
              title={c.name}
              className={`h-7 w-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                selectedColor === c.hex
                  ? "border-[#C9A227] scale-110 shadow-[0_0_15px_rgba(201,162,39,0.7)]"
                  : "border-[#B8BCC2]/30"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      )}

      {/* راهنما */}
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-[#0a0e0c]/70 px-3 py-1 text-xs text-[#B8BCC2] backdrop-blur">
        {viewMode === "image"
          ? "🖼️ عکس خودرو"
          : isInside
          ? "🎮 با موس نگاه کن"
          : "🖱️ بچرخانید"}
      </div>
    </div>
  );
}