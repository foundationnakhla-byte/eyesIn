"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type HeroBackgroundProps = {
  /** مسارات الصور (يفضّل صور WebP/AVIF أو JPG مضغوطة) */
  images: string[];
  /** الزمن بين الانتقالات بالمللي ثانية (افتراضي 6000) */
  interval?: number;
  /** إظهار طبقة تعتيم/تدرّج فوق الصور (افتراضي true) */
  overlay?: boolean;
  /** كلاس إضافي للحاوية */
  className?: string;
  /** مستوى التعتيم للطبقة (0–100، افتراضي 35) */
  overlayOpacity?: number;
  /** تمويه خفيف فوق الخلفية (افتراضي 0 = بدون) */
  blur?: number;
};

/**
 * خلفية Hero متحركة (سلايد شو) مع انتقال بالتلاشي وزووم خفيف
 * مهيّأة لتُستخدم بشكل absolute داخل قسم الـHero.
 */
export default function HeroBackground({
  images,
  interval = 6000,
  overlay = true,
  overlayOpacity = 35,
  blur = 0,
  className = "",
}: HeroBackgroundProps) {
  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  // أوقف/شغّل المؤقت عند تغيّر البيانات
  useEffect(() => {
    if (safeImages.length <= 1) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeImages.length);
    }, Math.max(2000, interval));

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [safeImages.length, interval]);

  // Preload للصور
  useEffect(() => {
    safeImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [safeImages]);

  if (safeImages.length === 0) {
    return null;
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* طبقة الصور المتعددة (مكدّسة فوق بعض) */}
      <div className="absolute inset-0">
        {safeImages.map((src, i) => {
          const isActive = i === index;
          // لجعل أول صورة لها أولوية تحميل أعلى
          const priority = i === 0;

          return (
            <div
              key={`${src}-${i}`}
              className={`
                absolute inset-0 transition-opacity duration-[1200ms] ease-in-out
                ${isActive ? "opacity-100" : "opacity-0"}
              `}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={priority}
                sizes="100vw"
                className={`
                  object-cover
                  will-change-transform
                  hero-zoom
                  ${blur ? "blur-[var(--hero-blur)]" : ""}
                `}
                style={
                  {
                    // دعم تمويه خفيف عند الحاجة
                    "--hero-blur": `${blur}px`,
                  } as React.CSSProperties
                }
              />
            </div>
          );
        })}
      </div>

      {/* طبقة تدرّج/تعتيم اختيارية فوق الخلفية لزيادة التباين مع النص */}
      {overlay && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.35) 100%)",
            opacity: overlayOpacity / 100,
          }}
        />
      )}

      {/* أنماط الزووم (keyframes) مضمّنة */}
      <style jsx>{`
        @keyframes hero-zoom {
          0% {
            transform: scale(1.02);
          }
          50% {
            transform: scale(1.06);
          }
          100% {
            transform: scale(1.02);
          }
        }
        .hero-zoom {
          animation: hero-zoom ${Math.max(interval, 3000)}ms ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
