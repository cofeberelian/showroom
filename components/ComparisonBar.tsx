"use client";

import { X, GitCompare, Trash2 } from "lucide-react";
import { Car } from "@/data/cars";

type Props = {
  selectedCars: Car[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
};

export default function ComparisonBar({
  selectedCars,
  onRemove,
  onClear,
  onCompare,
}: Props) {
  if (selectedCars.length === 0) return null;

  return (
    <div className="pointer-events-auto fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-[#C9A227]/40 bg-[#0a0e0c]/95 p-4 shadow-[0_0_40px_rgba(201,162,39,0.3)] backdrop-blur-xl md:p-5">
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
        {/* عنوان */}
        <div className="flex items-center gap-2 text-sm text-[#C9A227]">
          <GitCompare className="h-5 w-5" />
          <span className="font-bold">
            مقایسه ({selectedCars.length} از ۲)
          </span>
        </div>

        {/* ماشین‌های انتخابی */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedCars.map((car) => (
            <div
              key={car.id}
              className="group flex items-center gap-2 rounded-full border border-[#1F6F5C]/40 bg-[#0f1a16] py-1.5 pr-3 pl-1.5 text-xs"
            >
              <button
                onClick={() => onRemove(car.id)}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A227]/20 text-[#C9A227] transition hover:bg-[#C9A227] hover:text-[#0a0e0c]"
                aria-label="حذف"
              >
                <X className="h-3 w-3" />
              </button>
              <span className="text-[#F8F8F6]">
                {car.brand} {car.model}
              </span>
            </div>
          ))}
        </div>

        {/* دکمه‌ها */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="flex items-center gap-1 rounded-full border border-[#B8BCC2]/30 px-3 py-2 text-xs text-[#B8BCC2] transition hover:border-[#B8BCC2]/60"
          >
            <Trash2 className="h-3 w-3" />
            پاک کردن
          </button>
          <button
            onClick={onCompare}
            disabled={selectedCars.length < 2}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
              selectedCars.length === 2
                ? "bg-gradient-to-l from-[#1F6F5C] to-[#C9A227] text-[#0a0e0c] hover:scale-105 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]"
                : "cursor-not-allowed bg-[#B8BCC2]/10 text-[#B8BCC2]/50"
            }`}
          >
            <GitCompare className="h-4 w-4" />
            مقایسه کن
          </button>
        </div>
      </div>

      {/* راهنما */}
      {selectedCars.length < 2 && (
        <div className="mt-2 text-center text-[10px] text-[#B8BCC2]">
          یک خودروی دیگر انتخاب کنید تا مقایسه فعال شود
        </div>
      )}
    </div>
  );
}