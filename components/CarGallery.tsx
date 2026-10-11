"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Eye,
  MessageCircle,
  Gauge,
  Fuel,
  Cog,
  GitCompare,
  Check,
} from "lucide-react";
import { cars, Car } from "@/data/cars";
import CarModel3D from "./CarModel3D";
import ComparisonBar from "./ComparisonBar";
import ComparisonModal from "./ComparisonModal";

const BRANDS = ["همه", ...Array.from(new Set(cars.map((c) => c.brand)))];

const PRICE_FILTERS = [
  { label: "همه", min: 0, max: Infinity },
  { label: "تا ۴ میلیارد", min: 0, max: 4000000000 },
  { label: "۴ تا ۶ میلیارد", min: 4000000000, max: 6000000000 },
  { label: "بیش از ۶ میلیارد", min: 6000000000, max: Infinity },
];

const SORTS = [
  { label: "جدیدترین", key: "newest" as const },
  { label: "ارزان‌ترین", key: "cheapest" as const },
  { label: "گران‌ترین", key: "expensive" as const },
];

export default function CarGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInside, setIsInside] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("همه");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedSort, setSelectedSort] = useState<
    "newest" | "cheapest" | "expensive"
  >("newest");

  // مقایسه
  const [compareList, setCompareList] = useState<Car[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (selectedBrand !== "همه") {
      result = result.filter((c) => c.brand === selectedBrand);
    }

    const priceFilter = PRICE_FILTERS[selectedPrice];
    result = result.filter(
      (c) => c.price >= priceFilter.min && c.price < priceFilter.max
    );

    if (selectedSort === "cheapest") {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "expensive") {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [selectedBrand, selectedPrice, selectedSort]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsInside(false);
  }, [selectedBrand, selectedPrice, selectedSort]);

  const currentCar = filteredCars[currentIndex];

  const goNext = () => {
    if (filteredCars.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCars.length);
  };

  const goPrev = () => {
    if (filteredCars.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + filteredCars.length) % filteredCars.length
    );
  };

  // 🆚 افزودن به مقایسه
  const addToCompare = (car: Car) => {
    if (compareList.find((c) => c.id === car.id)) return;
    if (compareList.length >= 2) return;
    setCompareList([...compareList, car]);
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter((c) => c.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (id: string) => {
    return compareList.some((c) => c.id === id);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goNext();
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filteredCars.length]);

  return (
    <>
      <section className="relative z-10 px-4 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-sm tracking-widest text-[#C9A227]">
              — گالری خودروها —
            </span>
            <h2 className="text-3xl font-black md:text-5xl">
              خودروی <span className="text-[#C9A227]">منتخب</span> خود را کشف
              کنید
            </h2>
          </div>

          {/* فیلتر */}
          <div className="mb-8 space-y-4 rounded-2xl border border-[#1F6F5C]/30 bg-[#0f1a16]/60 p-4 backdrop-blur md:p-6">
            <div>
              <div className="mb-2 text-xs text-[#B8BCC2]">برند:</div>
              <div className="flex flex-wrap gap-2">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition md:px-4 md:py-2 md:text-sm ${
                      selectedBrand === brand
                        ? "border-[#C9A227] bg-[#C9A227] font-bold text-[#0a0e0c]"
                        : "border-[#1F6F5C]/40 text-[#B8BCC2] hover:border-[#C9A227]/60 hover:text-[#C9A227]"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs text-[#B8BCC2]">قیمت:</div>
              <div className="flex flex-wrap gap-2">
                {PRICE_FILTERS.map((filter, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPrice(idx)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition md:px-4 md:py-2 md:text-sm ${
                      selectedPrice === idx
                        ? "border-[#C9A227] bg-[#C9A227] font-bold text-[#0a0e0c]"
                        : "border-[#1F6F5C]/40 text-[#B8BCC2] hover:border-[#C9A227]/60 hover:text-[#C9A227]"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs text-[#B8BCC2]">مرتب‌سازی:</div>
              <div className="flex flex-wrap gap-2">
                {SORTS.map((sort) => (
                  <button
                    key={sort.key}
                    onClick={() => setSelectedSort(sort.key)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition md:px-4 md:py-2 md:text-sm ${
                      selectedSort === sort.key
                        ? "border-[#C9A227] bg-[#C9A227] font-bold text-[#0a0e0c]"
                        : "border-[#1F6F5C]/40 text-[#B8BCC2] hover:border-[#C9A227]/60 hover:text-[#C9A227]"
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4 text-center text-sm text-[#B8BCC2]">
            {filteredCars.length} خودرو یافت شد
          </div>

          {filteredCars.length === 0 ? (
            <div className="rounded-3xl border border-[#1F6F5C]/30 bg-[#0f1a16] p-12 text-center">
              <p className="text-lg text-[#B8BCC2]">
                متأسفانه خودرویی با این فیلترها پیدا نشد.
              </p>
              <button
                onClick={() => {
                  setSelectedBrand("همه");
                  setSelectedPrice(0);
                }}
                className="mt-4 rounded-full bg-[#C9A227] px-6 py-2 text-sm font-bold text-[#0a0e0c] transition hover:scale-105"
              >
                پاک‌کردن فیلترها
              </button>
            </div>
          ) : (
            <div className="relative">
              {filteredCars.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute -right-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#0a0e0c]/90 text-[#C9A227] backdrop-blur transition hover:bg-[#C9A227] hover:text-[#0a0e0c] md:-right-6 md:h-14 md:w-14"
                    aria-label="قبلی"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  <button
                    onClick={goNext}
                    className="absolute -left-2 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#0a0e0c]/90 text-[#C9A227] backdrop-blur transition hover:bg-[#C9A227] hover:text-[#0a0e0c] md:-left-6 md:h-14 md:w-14"
                    aria-label="بعدی"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </>
              )}

              <div className="group relative overflow-hidden rounded-3xl border border-[#1F6F5C]/30 bg-gradient-to-br from-[#0f1a16] to-[#0a0e0c] p-4 transition hover:border-[#C9A227]/60 hover:shadow-[0_0_60px_rgba(201,162,39,0.2)] md:p-8">
                <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-8">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-block rounded-full border border-[#C9A227]/30 bg-[#C9A227]/5 px-3 py-1 text-xs text-[#C9A227]">
                        جدید {currentCar.year}
                      </span>
                      <span className="inline-block rounded-full border border-[#1F6F5C]/40 bg-[#1F6F5C]/10 px-3 py-1 text-xs text-[#1F6F5C]">
                        {currentIndex + 1} از {filteredCars.length}
                      </span>
                    </div>
                    <h3 className="mb-2 text-3xl font-black text-[#F8F8F6] md:text-4xl">
                      {currentCar.brand}{" "}
                      <span className="text-[#C9A227]">
                        {currentCar.model}
                      </span>
                    </h3>
                    <p className="mb-6 text-sm text-[#B8BCC2] md:text-base">
                      {currentCar.description}
                    </p>

                    <div className="mb-6 grid grid-cols-3 gap-2 md:gap-4">
                      <div className="rounded-xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/60 p-2 text-center md:p-3">
                        <Gauge className="mx-auto mb-1 h-4 w-4 text-[#C9A227]" />
                        <div className="text-[10px] text-[#B8BCC2] md:text-xs">
                          موتور
                        </div>
                        <div className="mt-1 text-xs font-bold text-[#C9A227] md:text-sm">
                          {currentCar.engine}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/60 p-2 text-center md:p-3">
                        <Cog className="mx-auto mb-1 h-4 w-4 text-[#C9A227]" />
                        <div className="text-[10px] text-[#B8BCC2] md:text-xs">
                          قدرت
                        </div>
                        <div className="mt-1 text-xs font-bold text-[#C9A227] md:text-sm">
                          {currentCar.power}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/60 p-2 text-center md:p-3">
                        <Fuel className="mx-auto mb-1 h-4 w-4 text-[#C9A227]" />
                        <div className="text-[10px] text-[#B8BCC2] md:text-xs">
                          سوخت
                        </div>
                        <div className="mt-1 text-xs font-bold text-[#C9A227] md:text-sm">
                          {currentCar.fuel}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 rounded-xl border border-[#C9A227]/30 bg-[#C9A227]/5 p-3">
                      <div className="text-xs text-[#B8BCC2]">قیمت</div>
                      <div className="text-xl font-black text-[#C9A227] md:text-2xl">
                        {currentCar.price.toLocaleString("fa-IR")}{" "}
                        <span className="text-sm">تومان</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
  href={`/cars/${currentCar.slug}`}
  className="flex items-center gap-2 rounded-full border border-[#C9A227]/40 px-5 py-3 text-sm font-medium text-[#C9A227] transition hover:bg-[#C9A227] hover:text-[#0a0e0c]"
>
  <Eye className="h-4 w-4" />
  جزئیات کامل
</Link>
                      <button
                        onClick={() => addToCompare(currentCar)}
                        disabled={
                          isInCompare(currentCar.id) || compareList.length >= 2
                        }
                        className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition ${
                          isInCompare(currentCar.id)
                            ? "cursor-not-allowed border-[#1F6F5C] bg-[#1F6F5C]/20 text-[#1F6F5C]"
                            : compareList.length >= 2
                            ? "cursor-not-allowed border-[#B8BCC2]/20 text-[#B8BCC2]/40"
                            : "border-[#B8BCC2]/40 text-[#B8BCC2] hover:border-[#C9A227] hover:text-[#C9A227]"
                        }`}
                      >
                        {isInCompare(currentCar.id) ? (
                          <>
                            <Check className="h-4 w-4" />
                            اضافه شد
                          </>
                        ) : (
                          <>
                            <GitCompare className="h-4 w-4" />
                            افزودن به مقایسه
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1F6F5C]/20 to-[#C9A227]/10 md:h-96">
                    <CarModel3D car={currentCar} />
                    <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0a0e0c]/70 px-3 py-1 text-xs text-[#B8BCC2] backdrop-blur">
                      🖱️ با موس بچرخانید
                    </div>
                  </div>
                </div>
              </div>

              {filteredCars.length > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  {filteredCars.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex
                          ? "w-8 bg-[#C9A227]"
                          : "w-2 bg-[#B8BCC2]/30 hover:bg-[#B8BCC2]/60"
                      }`}
                      aria-label={`ماشین ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* نوار مقایسه شناور */}
      <ComparisonBar
        selectedCars={compareList}
        onRemove={removeFromCompare}
        onClear={clearCompare}
        onCompare={() => setShowCompareModal(true)}
      />

      {/* مودال مقایسه */}
      {showCompareModal && compareList.length === 2 && (
        <ComparisonModal
          car1={compareList[0]}
          car2={compareList[1]}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </>
  );
}