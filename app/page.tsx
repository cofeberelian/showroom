"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircle, Car, ArrowLeft } from "lucide-react";
import CarModel3D from "@/components/CarModel3D";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const carsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
      });
      gsap.from(subRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.from(".car-card", {
        scrollTrigger: {
          trigger: carsRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0e0c]">
      {/* پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#1F6F5C] opacity-20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#C9A227] opacity-10 blur-[120px]" />
      </div>

      {/* نوار بالا */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1F6F5C] to-[#C9A227]">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#F8F8F6]">
            نمایشگاه <span className="text-[#C9A227]">لوکس</span>
          </span>
        </div>
        <nav className="hidden gap-8 text-sm text-[#B8BCC2] md:flex">
          <a href="#" className="transition hover:text-[#C9A227]">خانه</a>
          <a href="#" className="transition hover:text-[#C9A227]">خودروها</a>
          <a href="#" className="transition hover:text-[#C9A227]">درباره ما</a>
          <a href="#" className="transition hover:text-[#C9A227]">تماس</a>
        </nav>
        <button className="flex items-center gap-2 rounded-full border border-[#C9A227]/40 px-4 py-2 text-sm text-[#C9A227] transition hover:bg-[#C9A227] hover:text-[#0a0e0c]">
          <MessageCircle className="h-4 w-4" />
          مشاوره زنده
        </button>
      </header>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-[calc(100vh-100px)] flex-col items-center justify-center px-6 text-center"
      >
        <span className="mb-6 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/5 px-4 py-1.5 text-xs tracking-widest text-[#C9A227]">
          اولین تجربه‌ی سه‌بعدی خرید خودرو در ایران
        </span>

        <h1
          ref={titleRef}
          className="max-w-4xl text-5xl font-black leading-tight md:text-7xl"
        >
          ماشین رویاهات رو
          <br />
          <span className="bg-gradient-to-l from-[#C9A227] via-[#E8C766] to-[#1F6F5C] bg-clip-text text-transparent">
            قبل از خرید تجربه کن
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[#B8BCC2] md:text-xl"
        >
          خودروی مورد علاقه‌ات را از هر زاویه ببین، داخل کابین قدم بزن،
          و با کارشناسان ما گفتگو کن — همه در یک نمایشگاه آنلاین.
        </p>

        <div className="mt-12 flex flex-col gap-4 md:flex-row">
          <button className="rounded-full bg-gradient-to-l from-[#1F6F5C] to-[#C9A227] px-8 py-4 text-base font-bold text-[#0a0e0c] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(201,162,39,0.5)]">
            شروع کاوش خودروها
          </button>
          <button className="rounded-full border border-[#B8BCC2]/30 px-8 py-4 text-base font-medium text-[#F8F8F6] transition hover:border-[#C9A227] hover:text-[#C9A227]">
            تماشای دمو
          </button>
        </div>

        <div className="absolute bottom-10 animate-bounce text-[#C9A227]">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* بخش کاوش خودروها */}
      <section ref={carsRef} className="relative z-10 px-8 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm tracking-widest text-[#C9A227]">
              — گالری خودروها —
            </span>
            <h2 className="text-4xl font-black md:text-5xl">
              خودروی <span className="text-[#C9A227]">منتخب</span> خود را کشف کنید
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[#B8BCC2]">
              هر خودرو را می‌توانید در فضای سه‌بعدی بچرخانید، داخل کابین قدم بزنید و از نزدیک لمس کنید.
            </p>
          </div>

          <div className="car-card group relative overflow-hidden rounded-3xl border border-[#1F6F5C]/30 bg-gradient-to-br from-[#0f1a16] to-[#0a0e0c] p-8 transition hover:border-[#C9A227]/60 hover:shadow-[0_0_60px_rgba(201,162,39,0.2)]">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <span className="mb-3 inline-block rounded-full border border-[#C9A227]/30 bg-[#C9A227]/5 px-3 py-1 text-xs text-[#C9A227]">
                  جدید ۲۰۲۵
                </span>
                <h3 className="mb-2 text-3xl font-black text-[#F8F8F6]">
                  مرسدس بنز <span className="text-[#C9A227]">C200L</span>
                </h3>
                <p className="mb-6 text-[#B8BCC2]">
                  سدان لوکس با طراحی مدرن، کابین پیشرفته و فناوری‌های روز دنیا.
                </p>

                <div className="mb-6 grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/60 p-3">
                    <div className="text-xs text-[#B8BCC2]">موتور</div>
                    <div className="mt-1 font-bold text-[#C9A227]">2.0L</div>
                  </div>
                  <div className="rounded-xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/60 p-3">
                    <div className="text-xs text-[#B8BCC2]">قدرت</div>
                    <div className="mt-1 font-bold text-[#C9A227]">204hp</div>
                  </div>
                  <div className="rounded-xl border border-[#1F6F5C]/30 bg-[#0a0e0c]/60 p-3">
                    <div className="text-xs text-[#B8BCC2]">رنگ</div>
                    <div className="mt-1 font-bold text-[#C9A227]">سفید</div>
                  </div>
                </div>

                <button className="flex items-center gap-2 rounded-full bg-gradient-to-l from-[#1F6F5C] to-[#C9A227] px-6 py-3 font-bold text-[#0a0e0c] transition hover:scale-105">
                  مشاهده سه‌بعدی
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>

              <div className="relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1F6F5C]/20 to-[#C9A227]/10 md:h-96">
                <CarModel3D />
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0a0e0c]/70 px-3 py-1 text-xs text-[#B8BCC2] backdrop-blur">
                  🖱️ با موس بچرخانید
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer className="relative z-10 border-t border-[#1F6F5C]/20 px-8 py-10 text-center text-sm text-[#B8BCC2]">
        © ۲۰۲۵ نمایشگاه لوکس — تمام حقوق محفوظ است
      </footer>
    </main>
  );
}