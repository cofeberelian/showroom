"use client";

import { useState } from "react";
import { Car } from "@/data/cars";
import { Car as CarIcon } from "lucide-react";

export default function CarImage({ car }: { car: Car }) {
  const [imgError, setImgError] = useState(false);

  // مسیر عکس اصلی هر ماشین
  const imagePath = `/cars/${car.slug}/main.jpg`;

  // اگه عکس نبود، آیکون پیش‌فرض نشون بده
  if (imgError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1F6F5C]/20 to-[#C9A227]/10">
        <CarIcon className="h-20 w-20 text-[#C9A227] opacity-50" />
        <p className="text-xs text-[#B8BCC2]">
          عکس این خودرو به‌زودی اضافه می‌شود
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <img
        src={imagePath}
        alt={`${car.brand} ${car.model}`}
        className="h-full w-full object-cover"
        onError={() => setImgError(true)}
      />
      {/* گرادیانت پایین برای زیبایی */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0e0c] to-transparent" />
    </div>
  );
}