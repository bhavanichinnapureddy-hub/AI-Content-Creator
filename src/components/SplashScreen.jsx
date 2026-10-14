import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const SplashScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Canvas sparkling particles animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = 55;
    const colors = ['#48E5C2', '#66BFBF', '#00796B', '#A7D2CB', '#FFD166', '#FFFFFF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8 - 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
        alphaSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.1 || p.alpha >= 0.95) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0.05, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Timer to trigger smooth transition after ~2 seconds
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2450);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#002B33] text-white transition-all duration-500 overflow-hidden ${
        fading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #004D5A 0%, #003B46 45%, #001F26 100%)'
      }}
    >
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Radiant Glow Orb */}
      <div className="absolute w-96 h-96 rounded-full bg-[#00796B]/30 blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute w-64 h-64 rounded-full bg-[#48E5C2]/20 blur-2xl animate-pulse-glow pointer-events-none" />

      {/* 3D Animated Logo Emblem */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="relative mb-6 animate-float-3d" style={{ perspective: 1000 }}>
          {/* Ambient Rings */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#00796B] to-[#48E5C2] opacity-40 blur-lg animate-pulse" />

          {/* 3D Icon Container */}
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#003B46] via-[#005F56] to-[#00796B] p-1 shadow-2xl border border-[#48E5C2]/40 flex items-center justify-center relative overflow-hidden"
            style={{
              boxShadow: '0 20px 50px rgba(0, 59, 70, 0.6), 0 0 30px rgba(72, 229, 194, 0.35)',
              transform: 'rotateY(10deg) rotateX(10deg)'
            }}
          >
            {/* Peacock Feather / Sparkle Motif in SVG */}
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_4px_16px_rgba(72,229,194,0.7)]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Peacock Plume Crown */}
              <path
                d="M50 8C50 8 41 26 41 38C41 43.5 45 48 50 48C55 48 59 43.5 59 38C59 26 50 8 50 8Z"
                fill="url(#peacockGrad1)"
              />
              <path
                d="M26 22C26 22 26 38 33 46C37 50.5 43 51 47 48C45 42 40 37 36 32C33 28 26 22 26 22Z"
                fill="url(#peacockGrad2)"
                opacity="0.9"
              />
              <path
                d="M74 22C74 22 74 38 67 46C63 50.5 57 51 53 48C55 42 60 37 64 32C67 28 74 22 74 22Z"
                fill="url(#peacockGrad2)"
                opacity="0.9"
              />
              {/* Center Radiant Eye Motif */}
              <circle cx="50" cy="52" r="24" fill="#003B46" stroke="#48E5C2" strokeWidth="2.5" />
              <circle cx="50" cy="52" r="16" fill="url(#peacockGrad3)" />
              <circle cx="50" cy="52" r="8" fill="#FFD166" />
              <circle cx="52" cy="50" r="3" fill="#FFFFFF" />

              {/* Lower Stem / Base */}
              <path
                d="M50 76V92M46 92H54"
                stroke="#48E5C2"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              <defs>
                <linearGradient id="peacockGrad1" x1="50" y1="8" x2="50" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#48E5C2" />
                  <stop offset="0.6" stopColor="#00796B" />
                  <stop offset="1" stopColor="#003B46" />
                </linearGradient>
                <linearGradient id="peacockGrad2" x1="26" y1="22" x2="47" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#66BFBF" />
                  <stop offset="1" stopColor="#005F56" />
                </linearGradient>
                <linearGradient id="peacockGrad3" x1="34" y1="36" x2="66" y2="68" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00796B" />
                  <stop offset="1" stopColor="#003B46" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Brand Name Typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-center justify-center gap-2 drop-shadow-md">
          CreatorSphere<span className="text-[#48E5C2] drop-shadow-[0_0_15px_rgba(72,229,194,0.6)]"> AI</span>
        </h1>

        {/* Subtitle with Sparkle */}
        <div className="flex items-center gap-2 mt-2 px-3.5 py-1 rounded-full bg-[#00796B]/30 border border-[#48E5C2]/30 text-[#48E5C2] text-xs sm:text-sm font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Content Creator Marketplace</span>
        </div>

        {/* Loading Progress Bar Indicator */}
        <div className="mt-8 w-48 sm:w-64 h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#00796B] via-[#48E5C2] to-[#FFD166] rounded-full transition-all duration-2000 ease-out"
            style={{ width: fading ? '100%' : '90%' }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2 tracking-widest uppercase">Connecting Brands & Creators...</p>
      </div>
    </div>
  );
};
