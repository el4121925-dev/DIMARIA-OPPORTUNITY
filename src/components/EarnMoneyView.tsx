/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Espace Gagner de l'Argent
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from './OpportunityCard';
import { OpportunityItem } from '../types';
import { COMPLIANCE_STATEMENT } from '../utils/opportunityLogic';
import {
  Coins,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  Award,
  Wallet,
  Globe2,
} from 'lucide-react';

interface EarnMoneyViewProps {
  onSelectOpportunity: (item: OpportunityItem) => void;
}

export const EarnMoneyView: React.FC<EarnMoneyViewProps> = ({ onSelectOpportunity }) => {
  const { opportunities } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [onlyCI, setOnlyCI] = useState<boolean>(false);

  const subCategories = [
    { id: 'all', label: 'Toutes les missions' },
    { id: 'micro-tasks', label: 'Micro-tâches & IA' },
    { id: 'surveys', label: 'Sondages rémunérés' },
    { id: 'testing', label: 'Tests de sites & apps' },
    { id: 'freelance', label: 'Freelance & Services' },
    { id: 'affiliation', label: 'Affiliation & Partenariats' },
    { id: 'online-work', label: 'Travail en ligne' },
    { id: 'beginner-missions', label: 'Missions débutants' },
  ];

  // Filter only earn money categories
  const earnOpportunities = opportunities.filter((op) => {
    const isEarnCategory = [
      'micro-tasks',
      'surveys',
      'testing',
      'freelance',
      'affiliation',
      'online-work',
      'beginner-missions',
    ].includes(op.category);

    if (!isEarnCategory) return false;

    if (activeCategory !== 'all' && op.category !== activeCategory) {
      return false;
    }

    if (onlyCI) {
      const isCIElegible = op.countries.some((c) => {
        const norm = c.toLowerCase();
        return norm === 'worldwide' || norm === "côte d'ivoire" || norm === 'ci' || norm === 'afrique';
      });
      if (!isCIElegible) return false;
    }

    return true;
  });

  return (
    <div className="pb-24 pt-4 px-4 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-2xl font-black text-white font-['Cinzel',serif] tracking-wide">
              GAGNER DE <span className="text-[#D4AF37]">L'ARGENT</span>
            </h1>
          </div>
          <p className="text-xs text-gray-300">
            Plateformes officielles réelles sélectionnées pour leur fiabilité et régularité de paiement.
          </p>
        </div>

        {/* Toggle Côte d'Ivoire & Africa Focus */}
        <button
          onClick={() => setOnlyCI(!onlyCI)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
            onlyCI
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-md'
              : 'bg-[#14141E] text-emerald-400 border-emerald-800 hover:border-emerald-600'
          }`}
        >
          <span>🇨🇮 Côte d'Ivoire & Afrique uniquement</span>
          {onlyCI && <CheckCircle2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Zero Guaranteed Gains Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-600/30 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed shadow-sm">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-bold block mb-0.5">
            Mise en garde éthique DIMARIA COMPANY :
          </strong>
          {COMPLIANCE_STATEMENT}
        </div>
      </div>

      {/* Sub-category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {subCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
              activeCategory === cat.id
                ? 'bg-[#D4AF37] text-black shadow-md font-bold'
                : 'bg-[#14141E] text-gray-300 border border-gray-800 hover:border-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Featured Payment Gateways highlight in West Africa */}
      <div className="p-4 rounded-2xl bg-[#12121A] border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-gray-300 font-medium">
            Retrait direct compatible en Afrique de l'Ouest :
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
            Wave
          </span>
          <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-300 font-semibold border border-orange-500/20">
            Orange Money
          </span>
          <span className="px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-300 font-semibold border border-yellow-500/20">
            MTN MoMo
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-semibold border border-blue-500/20">
            Payoneer / PayPal
          </span>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {earnOpportunities.map((op) => (
          <OpportunityCard key={op.id} item={op} onSelect={onSelectOpportunity} />
        ))}
      </div>
    </div>
  );
};
