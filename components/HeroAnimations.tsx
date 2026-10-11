"use client";

import { useEffect, useState } from "react";

// 🛞 رد لاستیک سینمایی
export function TireTrack() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="tireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A227" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9A227" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M -100 600 Q 300 400, 600 500 T 1300 300"
          fill="none"
          stroke="url(#tireGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="tire-track"
        />
        <path
          d="M -100 630 Q 300 430, 600 530 T 1300 330"
          fill="none"
          stroke="url(#tireGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className="tire-track"
          style={{ animationDelay: "0.5s" }}
        />
        <path
          d="M -100 660 Q 300 460, 600 560 T 1300 360"
          fill="none"
          stroke="url(#tireGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          className="tire-track"
          style={{ animationDelay: "1s" }}
        />
      </svg>
    </div>
  );
}

// ✨ ذرات نور طلایی (اصلاح‌شده برای جلوگیری از Hydration Error)
type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
};

export function GoldParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  // فقط توی مرورگر تولید کن (نه سرور)
  useEffect(() => {
    const generated = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
    }));
    setParticles(generated);
  }, []);

  // اگه هنوز مرورگر لود نشده، چیزی نشون نده
  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle absolute rounded-full bg-[#C9A227]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: "0 0 12px rgba(201, 162, 39, 1)",
          }}
        />
      ))}
    </div>
  );
}

// 🎬 خط نور
export function LightSweep() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="light-sweep absolute top-0 h-full w-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.3), transparent)",
        }}
      />
    </div>
  );
}