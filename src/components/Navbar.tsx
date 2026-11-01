/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Top Premium Navigation Bar
 * DIMARIA COMPANY
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Crown, Smartphone, ShieldCheck, User } from 'lucide-react';
import { Currency } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAndroidKit: () => void;
  onOpenAdmin: () => void;
  onOpenVIP: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNotifications,
  onOpenProfile,
  onOpenAndroidKit,
  onOpenAdmin,
  onOpenVIP,
}) => {
  const {
    setActiveTab,
    currency,
    setCurrency,
    language,
    setLanguage,
    userProfile,
    notifications,
  } = useApp();

  const { isInstallable, install } = usePWAInstall();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Brand & DO Monogram */}
        <button
          onClick={() => setActiveTab('home')}
          aria-label="Accueil DIMARIA OPPORTUNITY"
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#1E1E28] to-[#0D0D12] border border-[#D4AF37]/60 p-1 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.3)] group-hover:border-[#D4AF37] transition">
            <img src="/logo-do.svg" alt="DO Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-['Cinzel',serif] text-base font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#F5CE62] to-[#D4AF37]">
                DIMARIA
              </span>
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider px-1.5 py-0.2 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] font-semibold text-gray-400 tracking-wider">
              OPPORTUNITY
            </span>
          </div>
        </button>

        {/* Action Controls & Badges */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Currency Toggle */}
          <div className="relative inline-flex items-center rounded-lg bg-[#14141B] border border-[#D4AF37]/30 p-0.5 text-xs">
            {(['XOF', 'EUR', 'USD'] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition ${
                  currency === curr
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label={`Devise ${curr}`}
              >
                {curr === 'XOF' ? 'FCFA' : curr}
              </button>
            ))}
          </div>

          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            aria-label="Changer de langue"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#14141B] border border-gray-700 hover:border-[#D4AF37]/50 text-xs font-semibold text-gray-300"
          >
            <span>{language === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}</span>
          </button>

          {/* Android APK / PWA Kit */}
          {isInstallable ? (
            <button
              onClick={install}
              aria-label="Installer l'application Android"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md hover:from-emerald-500 hover:to-teal-500 transition animate-pulse"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Installer APK</span>
            </button>
          ) : (
            <button
              onClick={onOpenAndroidKit}
              aria-label="Espace Android & Google Play"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#181822] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#E5C07B] text-xs font-semibold transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">Android / Play Store</span>
            </button>
          )}

          {/* VIP Upgrade Button */}
          <button
            onClick={onOpenVIP}
            aria-label="Abonnement VIP"
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow ${
              userProfile?.isPremium
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black'
                : 'bg-[#181822] text-[#E5C07B] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10'
            }`}
          >
            <Crown className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">
              {userProfile?.isPremium ? 'VIP Actif' : 'VIP'}
            </span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Centre de notifications"
            className="relative p-2 rounded-lg bg-[#14141B] border border-gray-800 hover:border-[#D4AF37]/50 text-gray-300 transition"
          >
            <Bell className="w-4 h-4 text-gray-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenProfile}
            aria-label="Mon profil et pays"
            className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#14141B] border border-gray-800 hover:border-[#D4AF37]/60 transition"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-black flex items-center justify-center font-bold text-xs shadow">
              <User className="w-4 h-4 text-black" />
            </div>
          </button>

          {/* Admin Access Shortcut */}
          <button
            onClick={onOpenAdmin}
            aria-label="Tableau de bord administrateur"
            className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#14141B] border border-amber-900/50 hover:border-[#D4AF37] text-[11px] font-medium text-amber-300/80 hover:text-amber-300 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
