/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - 3-Second Golden Splash Screen
 * DIMARIA COMPANY
 */

import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SplashProps {
  onFinish: () => void;
}

export const SplashView: React.FC<SplashProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 3000; // 3 seconds exact requirement

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        onFinish();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#060608] via-[#0D0D12] to-[#040406] p-8 select-none">
      {/* Top Header with Skip */}
      <div className="w-full flex justify-end">
        <button
          onClick={onFinish}
          aria-label="Passer l'introduction"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A1A22]/80 border border-[#D4AF37]/30 text-xs font-semibold text-[#E5C07B] hover:bg-[#D4AF37]/20 transition backdrop-blur-sm cursor-pointer"
        >
          <span>Passer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Centerpiece: Glowing Golden DO Crest & Branding */}
      <div className="flex flex-col items-center text-center max-w-sm animate-fade-in">
        {/* DO Emblem */}
        <div className="relative mb-6">
          {/* Radiant pulse background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 to-[#F5CE62]/20 blur-2xl animate-pulse" />
          
          <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-b from-[#181820] to-[#0A0A0E] border-2 border-[#D4AF37] p-2.5 shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center">
            <img
              src="/logo-do.svg"
              alt="Logo DO DIMARIA OPPORTUNITY"
              className="w-full h-full object-contain drop-shadow-[0_2px_12px_rgba(212,175,55,0.6)]"
            />
          </div>

          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-[#D4AF37] text-black shadow-lg">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Brand Name with Cinzel typography */}
        <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#F5CE62] to-[#D4AF37] font-['Cinzel',serif] uppercase drop-shadow">
          DIMARIA
        </h1>
        <p className="text-sm font-bold tracking-[0.3em] text-[#E5C07B] mt-0.5 uppercase">
          OPPORTUNITY
        </p>

        {/* Creator credit */}
        <span className="inline-block mt-3 px-3 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] tracking-wider uppercase font-semibold text-[#D4AF37]">
          DIMARIA COMPANY
        </span>

        {/* Slogan */}
        <p className="mt-5 text-sm text-gray-300 font-medium italic leading-relaxed px-4">
          « Toutes les opportunités du monde à portée de main. »
        </p>
      </div>

      {/* Bottom Progress Bar & Loading Indicator */}
      <div className="w-full max-w-xs flex flex-col items-center gap-2">
        <div className="w-full h-1.5 rounded-full bg-[#1F1F28] overflow-hidden border border-[#D4AF37]/20">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FDE68A] to-[#D4AF37] transition-all duration-75 ease-out shadow-[0_0_10px_#D4AF37]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-[11px] text-gray-400 font-mono">
          <span>Chargement des opportunités</span>
          <span className="text-[#E5C07B] font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
