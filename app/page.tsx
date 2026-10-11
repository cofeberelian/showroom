"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircle, Car, Play } from "lucide-react";
import CarGallery from "@/components/CarGallery";
import {
  TireTrack,
  GoldParticles,
  LightSweep,
} from "@/components/HeroAnimations";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.6,
        delay: 0.3,
        ease: "power4.out",
      });

      gsap.from(subRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.from(buttonsRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });

      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0e0c]">
      {/* پس‌زمینه گرادیانت */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#1F6F5C] opacity-20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#C9A227] opacity-10 blur-[120px]" />
      </div>

      {/* 🎬 موشن گرافی */}
      <TireTrack />
      <GoldParticles />
      <LightSweep />

      {/* نوار بالا */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1F6F5C] to-[#C9A227] pulse-gold">
            <Car className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-[#F8F8F6]">
            نمایشگاه <span className="text-[#C9A227]">لوکس</span>
          </span>
        </div>
        <nav className="hidden gap-8 text-sm text-[#B8BCC2] md:flex">
          <a href="#" className="transition hover:text-[#C9A227]">
            خانه
          </a>
          <a href="#gallery" className="transition hover:text-[#C9A227]">
            خودروها
          </a>
          <a href="#" className="transition hover:text-[#C9A227]">
            درباره ما
          </a>
          <a href="#" className="transition hover:text-[#C9A227]">
            تماس
          </a>
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
        <div
          ref={badgeRef}
          className="mb-6 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/5 px-4 py-1.5 text-xs tracking-widest text-[#C9A227] backdrop-blur"
        >
          اولین تجربه‌ی سه‌بعدی خرید خودرو در ایران
        </div>

        <h1
          ref={titleRef}
          className="max-w-4xl text-5xl font-black leading-tight md:text-7xl"
        >
          ماشین رویاهات رو
          <br />
          <span className="gold-shine">قبل از خرید تجربه کن</span>
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-[#B8BCC2] md:text-xl"
        >
          خودروی مورد علاقه‌ات را از هر زاویه ببین، داخل کابین قدم بزن، و با
          کارشناسان ما گفتگو کن — همه در یک نمایشگاه آنلاین.
        </p>

        <div
          ref={buttonsRef}
          className="mt-12 flex flex-col gap-4 md:flex-row"
        >
          <a
            href="#gallery"
            className="rounded-full bg-gradient-to-l from-[#1F6F5C] to-[#C9A227] px-8 py-4 text-base font-bold text-[#0a0e0c] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(201,162,39,0.5)] pulse-gold"
          >
            شروع کاوش خودروها
          </a>
          <button className="flex items-center justify-center gap-2 rounded-full border border-[#B8BCC2]/30 px-8 py-4 text-base font-medium text-[#F8F8F6] transition hover:border-[#C9A227] hover:text-[#C9A227]">
            <Play className="h-4 w-4" />
            تماشای دمو
          </button>
        </div>

        <div className="absolute bottom-10 animate-bounce text-[#C9A227]">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* گالری */}
      <div id="gallery">
        <CarGallery />
      </div>

      {/* فوتر */}
      <footer className="relative z-10 border-t border-[#1F6F5C]/20 px-8 py-10 text-center text-sm text-[#B8BCC2]">
        © ۲۰۲۵ نمایشگاه لوکس — تمام حقوق محفوظ است
      </footer>
    </main>
  );
}