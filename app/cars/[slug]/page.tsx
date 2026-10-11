"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Check,
  Gauge,
  Cog,
  Fuel,
  Calendar,
  Palette,
  Zap,
} from "lucide-react";
import { cars, getCarBySlug } from "@/data/cars";
import CarModel3D from "@/components/CarModel3D";

export default function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const car = getCarBySlug(slug);

  if (!car) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0e0c]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#C9A227]">۴۰۴</h1>
          <p className="mt-4 text-[#B8BCC2]">خودرو پیدا نشد</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-[#C9A227] px-6 py-3 font-bold text-[#0a0e0c]"
          >
            بازگشت به خانه
          </Link>
        </div>
      </main>
    );
  }

  const similarCars = cars
    .filter((c) => c.brand === car.brand && c.id !== car.id)
    .slice(0, 4);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0e0c]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#1F6F5C] opacity-20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#C9A227] opacity-10 blur-[120px]" />
      </div>

      <header className="relative z-20 flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#0a0e0c]/80 px-4 py-2 text-sm text-[#C9A227] backdrop-blur transition hover:bg-[#C9A227] hover:text-[#0a0e0c]"
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت
        </Link>

        <div className="text-sm font-bold text-[#F8F8F6] md:text-base">
          نمایشگاه <span className="text-[#C9A227]">لوکس</span>
        </div>
      </header>

      <section className="relative z-10 px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-center md:mb-10">
            <span className="mb-3 inline-block rounded-full border border-[#C9A227]/30 bg-[#C9A227]/5 px-4 py-1.5 text-xs tracking-widest text-[#C9A227]">
              {car.year} • {car.fuel}
            </span>
            <h1 className="text-3xl font-black text-[#F8F8F6] md:text-5xl">
              {car.brand}{" "}
              <span className="text-[#C9A227]">{car.model}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#B8BCC2] md:text-base">
              {car.description}
            </p>
          </div>

          <div className="mb-8 overflow-hidden rounded-3xl border border-[#1F6F5C]/30 bg-gradient-to-br from-[#0f1a16] to-[#0a0e0c] md:mb-12">
            <div className="relative h-[400px] md:h-[600px]">
              <CarModel3D car={car} />
            </div>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3 md:gap-8">
            <div className="md:col-span-2">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-[#F8F8F6] md:text-2xl">
                <span className="h-1 w-8 rounded-full bg-[#C9A227]" />
                مشخصات فنی
              </h2>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                <SpecCard
                  icon={<Gauge className="h-5 w-5" />}
                  label="موتور"
                  value={car.engine}
                />
                <SpecCard
                  icon={<Zap className="h-5 w-5" />}
                  label="قدرت"
                  value={car.power}
                />
                <SpecCard
                  icon={<Cog className="h-5 w-5" />}
                  label="گیربکس"
                  value={car.transmission}
                />
                <SpecCard
                  icon={<Fuel className="h-5 w-5" />}
                  label="سوخت"
                  value={car.fuel}
                />
                <SpecCard
                  icon={<Calendar className="h-5 w-5" />}
                  label="سال ساخت"
                  value={car.year.toString()}
                />
                <SpecCard
                  icon={<Palette className="h-5 w-5" />}
                  label="رنگ‌های موجود"
                  value="۶ رنگ"
                />
              </div>

              <h2 className="mb-4 mt-8 flex items-center gap-2 text-xl font-black text-[#F8F8F6] md:text-2xl">
                <span className="h-1 w-8 rounded-full bg-[#C9A227]" />
                امکانات ویژه
              </h2>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
                {car.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-[#1F6F5C]/30 bg-[#0f1a16]/60 p-3"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A227]/20">
                      <Check className="h-3.5 w-3.5 text-[#C9A227]" />
                    </div>
                    <span className="text-sm text-[#F8F8F6]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-6 rounded-3xl border border-[#C9A227]/40 bg-gradient-to-br from-[#1F6F5C]/10 to-[#C9A227]/10 p-6">
                <div className="mb-2 text-xs text-[#B8BCC2]">قیمت</div>
                <div className="mb-6 text-3xl font-black text-[#C9A227]">
                  {car.price.toLocaleString("fa-IR")}
                  <span className="text-base font-medium text-[#F8F8F6]">
                    {" "}
                    تومان
                  </span>
                </div>

                <div className="mb-4 space-y-3">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#1F6F5C] to-[#C9A227] px-5 py-3 text-sm font-bold text-[#0a0e0c] transition hover:scale-105">
                    <Phone className="h-4 w-4" />
                    تماس با کارشناس
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[#C9A227]/40 px-5 py-3 text-sm font-bold text-[#C9A227] transition hover:bg-[#C9A227] hover:text-[#0a0e0c]">
                    <MessageCircle className="h-4 w-4" />
                    گفتگوی زنده
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-[#B8BCC2]/30 px-5 py-3 text-sm font-medium text-[#B8BCC2] transition hover:border-[#B8BCC2]/60">
                    رزرو تست درایو
                  </button>
                </div>

                <div className="border-t border-[#1F6F5C]/30 pt-4 text-xs text-[#B8BCC2]">
                  <div className="mb-1 flex justify-between">
                    <span>وضعیت:</span>
                    <span className="text-[#C9A227]">موجود</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تحویل:</span>
                    <span className="text-[#C9A227]">فوری</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {similarCars.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-black text-[#F8F8F6] md:text-2xl">
                <span className="h-1 w-8 rounded-full bg-[#C9A227]" />
                خودروهای مشابه
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {similarCars.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/cars/${similar.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[#1F6F5C]/30 bg-[#0f1a16] transition hover:border-[#C9A227]/60 hover:shadow-[0_0_30px_rgba(201,162,39,0.2)]"
                  >
                    <div className="p-4">
                      <div className="mb-1 text-xs text-[#B8BCC2]">
                        {similar.year}
                      </div>
                      <div className="mb-2 text-sm font-bold text-[#F8F8F6]">
                        {similar.brand}{" "}
                        <span className="text-[#C9A227]">
                          {similar.model}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#C9A227]">
                        {similar.price.toLocaleString("fa-IR")}
                        <span className="mr-1 text-xs text-[#B8BCC2]">
                          {" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#1F6F5C]/20 px-8 py-10 text-center text-sm text-[#B8BCC2]">
        © ۲۰۲۵ نمایشگاه لوکس — تمام حقوق محفوظ است
      </footer>
    </main>
  );
}

function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#1F6F5C]/30 bg-[#0f1a16]/60 p-3 transition hover:border-[#C9A227]/40">
      <div className="mb-1 flex items-center gap-2 text-[#C9A227]">
        {icon}
        <span className="text-[10px] text-[#B8BCC2] md:text-xs">{label}</span>
      </div>
      <div className="text-xs font-bold text-[#F8F8F6] md:text-sm">
        {value}
      </div>
    </div>
  );
}