/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Android Bottom Navigation Bar
 * DIMARIA COMPANY
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { AppTab } from '../types';
import {
  Home,
  Search,
  DollarSign,
  Briefcase,
  Bot,
  GraduationCap,
  Bookmark,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, savedOpportunityIds } = useApp();

  const navItems: { tab: AppTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      tab: 'home',
      label: 'Accueil',
      icon: <Home className="w-5 h-5" />,
    },
    {
      tab: 'search',
      label: 'Recherche',
      icon: <Search className="w-5 h-5" />,
    },
    {
      tab: 'earn',
      label: 'Gagner',
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      tab: 'business',
      label: 'Business',
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      tab: 'ai',
      label: 'DIMARIA AI',
      icon: <Bot className="w-5 h-5" />,
    },
    {
      tab: 'training',
      label: 'Formation',
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      tab: 'favorites',
      label: 'Favoris',
      icon: <Bookmark className="w-5 h-5" />,
      badge: savedOpportunityIds.length > 0 ? savedOpportunityIds.length : undefined,
    },
  ];

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0E]/95 backdrop-blur-md border-t border-[#D4AF37]/25 pb-safe"
    >
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-around px-1 py-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              aria-label={item.label}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition cursor-pointer min-w-[50px] ${
                isActive
                  ? 'text-[#F5CE62]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {/* Highlight background pill for active state */}
              {isActive && (
                <span className="absolute inset-x-1 top-0 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
              )}
              <div className="relative">
                {item.icon}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#D4AF37] text-[8px] font-bold text-black">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'text-[#F5CE62] font-bold' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
