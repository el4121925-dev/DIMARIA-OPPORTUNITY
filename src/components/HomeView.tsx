/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Home View (Page d'accueil)
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from './OpportunityCard';
import { AdMobBanner } from './AdMobBanner';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import { OpportunityItem } from '../types';
import {
  Search,
  Sparkles,
  TrendingUp,
  Compass,
  ArrowRight,
  Briefcase,
  Laptop,
  Coins,
  GraduationCap,
  Lightbulb,
  Share2,
} from 'lucide-react';

interface HomeViewProps {
  onSelectOpportunity: (item: OpportunityItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectOpportunity }) => {
  const { opportunities, setActiveTab, addSearchQuery, userProfile, setUserProfile } = useApp();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      addSearchQuery(searchInput);
      setActiveTab('search');
    }
  };

  // Segregate popular, latest, and recommended
  const popularOpps = opportunities.filter((op) => op.isPopular || op.isSponsored).slice(0, 4);
  const latestOpps = [...opportunities]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
  const recommendedOpps = opportunities.filter((op) => op.isRecommended).slice(0, 4);

  const mainCategories = [
    { id: 'earn', label: 'Micro-tâches & Missions', icon: <Coins className="w-5 h-5 text-amber-400" /> },
    { id: 'business', label: 'Idées de Business', icon: <Lightbulb className="w-5 h-5 text-yellow-300" /> },
    { id: 'search', label: 'Télétravail & Emplois', icon: <Laptop className="w-5 h-5 text-blue-400" /> },
    { id: 'training', label: 'Formations Gratuites', icon: <GraduationCap className="w-5 h-5 text-emerald-400" /> },
    { id: 'ai', label: 'Assistant DIMARIA AI', icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" /> },
    { id: 'search', label: 'Bourses d\'Études', icon: <Briefcase className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <div className="pb-24 pt-4 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Banner with Golden Accents & Hook Sentence */}
      <section className="relative rounded-3xl bg-gradient-to-b from-[#151522] via-[#0E0E16] to-[#0A0A0E] border border-[#D4AF37]/30 p-6 sm:p-8 overflow-hidden shadow-[0_4px_30px_rgba(212,175,55,0.1)]">
        {/* Decorative radiant ambient lights */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-b from-[#D4AF37]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Creator badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A26] border border-[#D4AF37]/40 text-xs font-semibold text-[#E5C07B] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span>DIMARIA COMPANY présente</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-['Cinzel',serif]">
            DIMARIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2B2] via-[#F5CE62] to-[#D4AF37]">OPPORTUNITY</span>
          </h1>

          {/* Slogan */}
          <p className="text-sm sm:text-base font-semibold text-[#E5C07B] mt-1 tracking-wide">
            Toutes les opportunités du monde à portée de main.
          </p>

          {/* Hook Sentence required by prompt: « Découvrez les meilleures opportunités pour développer vos revenus. » */}
          <p className="text-base sm:text-lg text-gray-200 font-medium mt-3 italic leading-relaxed">
            « Découvrez les meilleures opportunités pour développer vos revenus. »
          </p>

          {/* Intelligent Search Input */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ex : Outlier AI, Upwork, Bourses d'études, Télétravail..."
                aria-label="Rechercher des opportunités"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#09090D]/90 border border-gray-700 focus:border-[#D4AF37] text-sm text-white placeholder-gray-500 shadow-inner focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition"
              />
            </div>
            <button
              type="submit"
              aria-label="Lancer la recherche"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-extrabold text-sm shadow-md hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Rechercher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Country Pills */}
          <div className="mt-5 flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-gray-400 font-medium mr-1">Pays mis en avant :</span>
            {SUPPORTED_COUNTRIES.slice(1, 8).map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  if (userProfile) {
                    setUserProfile({ ...userProfile, country: country.name });
                  }
                  setActiveTab('search');
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  userProfile?.country === country.name
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow'
                    : 'bg-[#14141E] text-gray-300 border-gray-800 hover:border-[#D4AF37]/50'
                }`}
              >
                <span>{country.flag} {country.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D4AF37]" />
            Catégories Principales
          </h2>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-bold text-[#E5C07B] hover:underline flex items-center gap-1"
          >
            <span>Tout voir</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {mainCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat.id as any)}
              className="p-3.5 rounded-2xl bg-[#111119] border border-gray-800 hover:border-[#D4AF37]/70 hover:bg-[#161622] transition text-left flex flex-col justify-between group cursor-pointer shadow-sm"
            >
              <div className="p-2 rounded-xl bg-[#1A1A26] w-fit mb-3 group-hover:scale-105 transition">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-gray-200 group-hover:text-[#F5CE62]">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Google AdMob Banner */}
      <AdMobBanner placement="home-bottom" />

      {/* Popular Opportunities (Opportunités populaires) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-400" />
            Opportunités Populaires
          </h2>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs font-bold text-[#E5C07B] hover:underline flex items-center gap-1"
          >
            <span>Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularOpps.map((op) => (
            <OpportunityCard key={op.id} item={op} onSelect={onSelectOpportunity} />
          ))}
        </div>
      </section>

      {/* Recommended Opportunities (Opportunités recommandées) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            Recommandées pour Vous
          </h2>
          <span className="text-xs text-gray-400">
            Basé sur votre profil ({userProfile?.country || 'International'})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedOpps.map((op) => (
            <OpportunityCard key={op.id} item={op} onSelect={onSelectOpportunity} />
          ))}
        </div>
      </section>

      {/* Latest Opportunities (Dernières opportunités) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-400" />
            Dernières Opportunités Publiées
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestOpps.map((op) => (
            <OpportunityCard key={op.id} item={op} onSelect={onSelectOpportunity} />
          ))}
        </div>
      </section>

      {/* Community & Safety Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-[#14141E] via-[#101018] to-[#14141E] border border-gray-800 p-5 text-center">
        <h3 className="text-sm font-bold text-[#E5C07B] uppercase tracking-wider mb-1">
          Engagement DIMARIA COMPANY
        </h3>
        <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
          Toutes les plateformes répertoriées sont rigoureusement auditées. Les rémunérations sont indicatives. DIMARIA OPPORTUNITY ne facture aucun frais pour postuler aux offres réelles.
        </p>
      </section>
    </div>
  );
};
