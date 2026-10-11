"use client";

import { X, Trophy, Minus } from "lucide-react";
import { Car } from "@/data/cars";

type Props = {
  car1: Car;
  car2: Car;
  onClose: () => void;
};

export default function ComparisonModal({ car1, car2, onClose }: Props) {
  // پیدا کردن برنده‌ی هر ردیف (اگر قابل مقایسه باشه)
  const getPriceWinner = () => {
    if (car1.price < car2.price) return 1;
    if (car2.price < car1.price) return 2;
    return 0;
  };

  const getPowerWinner = () => {
    const p1 = parseInt(car1.power.replace(/\D/g, "")) || 0;
    const p2 = parseInt(car2.power.replace(/\D/g, "")) || 0;
    if (p1 > p2) return 1;
    if (p2 > p1) return 2;
    return 0;
  };

  const getYearWinner = () => {
    if (car1.year > car2.year) return 1;
    if (car2.year > car1.year) return 2;
    return 0;
  };

  const rows = [
    { label: "برند", val1: car1.brand, val2: car2.brand, winner: 0 },
    { label: "مدل", val1: car1.model, val2: car2.model, winner: 0 },
    {
      label: "سال ساخت",
      val1: car1.year.toString(),
      val2: car2.year.toString(),
      winner: getYearWinner(),
    },
    {
      label: "قیمت",
      val1: `${car1.price.toLocaleString("fa-IR")} تومان`,
      val2: `${car2.price.toLocaleString("fa-IR")} تومان`,
      winner: getPriceWinner(),
    },
    { label: "موتور", val1: car1.engine, val2: car2.engine, winner: 0 },
    {
      label: "قدرت",
      val1: car1.power,
      val2: car2.power,
      winner: getPowerWinner(),
    },
    {
      label: "گیربکس",
      val1: car1.transmission,
      val2: car2.transmission,
      winner: 0,
    },
    { label: "سوخت", val1: car1.fuel, val2: car2.fuel, winner: 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl border border-[#C9A227]/40 bg-gradient-to-br from-[#0f1a16] to-[#0a0e0c] p-4 md:p-8">
        {/* دکمه بستن */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/40 text-[#C9A227] transition hover:bg-[#C9A227] hover:text-[#0a0e0c]"
          aria-label="بستن"
        >
          <X className="h-5 w-5" />
        </button>

        {/* عنوان */}
        <div className="mb-6 text-center">
          <span className="mb-2 inline-block text-xs tracking-widest text-[#C9A227]">
            — مقایسه —
          </span>
          <h2 className="text-2xl font-black md:text-3xl">
            <span className="text-[#F8F8F6]">{car1.brand} {car1.model}</span>
            <span className="mx-3 text-[#C9A227]">در برابر</span>
            <span className="text-[#F8F8F6]">{car2.brand} {car2.model}</span>
          </h2>
        </div>

        {/* جدول مقایسه */}
        <div className="overflow-hidden rounded-2xl border border-[#1F6F5C]/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1F6F5C]/20">
                <th className="p-3 text-right text-xs text-[#B8BCC2] md:p-4 md:text-sm">
                  ویژگی
                </th>
                <th className="p-3 text-center text-xs font-bold text-[#C9A227] md:p-4 md:text-sm">
                  {car1.brand} {car1.model}
                </th>
                <th className="p-3 text-center text-xs font-bold text-[#C9A227] md:p-4 md:text-sm">
                  {car2.brand} {car2.model}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-[#1F6F5C]/20 ${
                    idx % 2 === 0 ? "bg-[#0a0e0c]/40" : "bg-transparent"
                  }`}
                >
                  <td className="p-3 text-right text-xs text-[#B8BCC2] md:p-4 md:text-sm">
                    {row.label}
                  </td>
                  <td
                    className={`p-3 text-center text-xs md:p-4 md:text-sm ${
                      row.winner === 1
                        ? "bg-[#C9A227]/10 font-bold text-[#C9A227]"
                        : "text-[#F8F8F6]"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {row.winner === 1 && (
                        <Trophy className="h-3 w-3 text-[#C9A227]" />
                      )}
                      {row.val1}
                    </div>
                  </td>
                  <td
                    className={`p-3 text-center text-xs md:p-4 md:text-sm ${
                      row.winner === 2
                        ? "bg-[#C9A227]/10 font-bold text-[#C9A227]"
                        : "text-[#F8F8F6]"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {row.winner === 2 && (
                        <Trophy className="h-3 w-3 text-[#C9A227]" />
                      )}
                      {row.val2}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* امکانات */}
        <div className="mt-6">
          <h3 className="mb-3 text-center text-sm font-bold text-[#C9A227] md:text-base">
            امکانات ویژه
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/40 p-4">
              <div className="mb-3 text-center text-xs font-bold text-[#C9A227]">
                {car1.brand} {car1.model}
              </div>
              <ul className="space-y-2">
                {car1.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#F8F8F6]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/40 p-4">
              <div className="mb-3 text-center text-xs font-bold text-[#C9A227]">
                {car2.brand} {car2.model}
              </div>
              <ul className="space-y-2">
                {car2.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#F8F8F6]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}