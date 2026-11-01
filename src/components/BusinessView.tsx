/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Espace Business & Entrepreneuriat
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BusinessIdea } from '../types';
import { formatReward } from '../utils/opportunityLogic';
import {
  Briefcase,
  Lightbulb,
  Smartphone,
  Bot,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const BusinessView: React.FC = () => {
  const { businessIdeas, currency, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les idées' },
    { id: 'zero-investment', label: 'Sans investissement (0 FCFA)' },
    { id: 'with-phone', label: 'Avec simple téléphone' },
    { id: 'with-ai', label: 'Avec Intelligence Artificielle' },
    { id: 'ecommerce', label: 'Commerce en ligne & COD' },
    { id: 'digital-marketing', label: 'Marketing digital & Agence' },
  ];

  const filteredIdeas = businessIdeas.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="pb-24 pt-4 px-4 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="w-6 h-6 text-[#D4AF37]" />
          <h1 className="text-2xl font-black text-white font-['Cinzel',serif] tracking-wide">
            ESPACE <span className="text-[#D4AF37]">BUSINESS</span>
          </h1>
        </div>
        <p className="text-xs text-gray-300">
          Modèles d'entreprises concrets, rentables et adaptés aux réalités économiques locales et internationales.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-[#D4AF37] text-black shadow-md font-bold'
                : 'bg-[#14141E] text-gray-300 border border-gray-800 hover:border-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Business Ideas Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredIdeas.map((idea) => {
          const isExpanded = expandedIdeaId === idea.id;

          return (
            <article
              key={idea.id}
              className="rounded-2xl bg-[#101018] border border-gray-800 hover:border-[#D4AF37]/50 p-5 flex flex-col justify-between transition shadow-md"
            >
              <div>
                {/* Header: Category Badge & Profitability */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#181824] border border-gray-700 text-[11px] font-semibold text-[#E5C07B] flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-[#D4AF37]" />
                    {idea.category === 'zero-investment' && '0 Investissement'}
                    {idea.category === 'with-phone' && '100% Smartphone'}
                    {idea.category === 'with-ai' && 'Propulsé par l\'IA'}
                    {idea.category === 'ecommerce' && 'E-Commerce Local'}
                    {idea.category === 'digital-marketing' && 'Marketing B2B'}
                  </span>

                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {idea.estimatedReturn}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5 leading-snug">
                  {idea.title}
                </h3>

                <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                  {idea.subtitle}
                </p>

                {/* Key Metrics: Cost & Time */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#14141E] border border-gray-800/80 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Budget estimé</span>
                    <span className="font-bold text-[#F5CE62]">
                      {idea.estimatedCostEur > 0
                        ? formatReward(idea.estimatedCostEur, currency)
                        : idea.costText}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block uppercase font-medium">Délai premiers revenus</span>
                    <span className="font-bold text-gray-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {idea.timeToProfit}
                    </span>
                  </div>
                </div>

                {/* Expanded Details: Step-by-Step guide & Tools */}
                {isExpanded && (
                  <div className="space-y-4 pt-2 border-t border-gray-800 text-xs animate-fade-in">
                    <div>
                      <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Étapes concrètes de démarrage :
                      </h4>
                      <ol className="space-y-2 pl-1">
                        {idea.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <span className="w-5 h-5 rounded-full bg-[#1F1F2C] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-400 uppercase text-[10px] tracking-wider mb-1">
                        Outils recommandés :
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {idea.recommendedTools.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-600/30 text-amber-200 text-[11px]">
                      <strong>Facteur clé de succès :</strong> {idea.keySuccessFactor}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setExpandedIdeaId(isExpanded ? null : idea.id)}
                  aria-label={isExpanded ? 'Masquer le plan détaillé' : 'Afficher le plan détaillé'}
                  className="text-xs font-bold text-[#E5C07B] hover:text-[#F5CE62] flex items-center gap-1 transition cursor-pointer"
                >
                  <span>{isExpanded ? 'Masquer le guide' : 'Voir le guide en 5 étapes'}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>

                <button
                  onClick={() => setActiveTab('ai')}
                  aria-label="Demander conseil à DIMARIA AI sur cette idée"
                  className="px-3 py-1.5 rounded-xl bg-[#1C1C28] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Approfondir avec l'IA</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
