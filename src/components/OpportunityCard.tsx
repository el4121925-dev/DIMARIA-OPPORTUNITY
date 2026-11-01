/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Opportunity Card Component
 * DIMARIA COMPANY
 */

import React from 'react';
import { OpportunityItem } from '../types';
import { useApp } from '../context/AppContext';
import { formatReward } from '../utils/opportunityLogic';
import {
  Bookmark,
  ExternalLink,
  Globe,
  Wallet,
  ShieldCheck,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

interface OpportunityCardProps {
  item: OpportunityItem;
  onSelect?: (item: OpportunityItem) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ item, onSelect }) => {
  const {
    currency,
    savedOpportunityIds,
    toggleSaveOpportunity,
    recordView,
    recordLinkClick,
    userProfile,
  } = useApp();

  const isSaved = savedOpportunityIds.includes(item.id);

  // Check if Côte d'Ivoire is eligible
  const isCIElegible = item.countries.some((c) => {
    const norm = c.toLowerCase();
    return norm === 'worldwide' || norm === "côte d'ivoire" || norm === 'ci' || norm === 'afrique';
  });

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    recordLinkClick(item.officialUrl);
    recordView(item.id);
  };

  const handleCardClick = () => {
    recordView(item.id);
    onSelect?.(item);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`relative rounded-2xl bg-[#101017] border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)] cursor-pointer group ${
        item.isSponsored
          ? 'border-[#D4AF37]/60 shadow-[0_0_15px_rgba(212,175,55,0.12)] bg-gradient-to-br from-[#14141E] via-[#101017] to-[#0A0A0E]'
          : 'border-gray-800'
      }`}
    >
      <div>
        {/* Header: Platform, Sponsored / Popular badges & Bookmark */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-[#1C1C26] border border-gray-700 text-xs font-bold text-[#E5C07B]">
              {item.platform}
            </span>

            {item.isSponsored && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/50 text-[10px] font-bold text-amber-300">
                <Sparkles className="w-2.5 h-2.5" />
                Sponsorisé
              </span>
            )}

            {item.isPopular && !item.isSponsored && (
              <span className="px-2 py-0.5 rounded-md bg-rose-950/60 border border-rose-700/50 text-[10px] font-bold text-rose-300">
                Populaire
              </span>
            )}

            {item.isRemote && (
              <span className="px-2 py-0.5 rounded-md bg-blue-950/50 border border-blue-700/40 text-[10px] font-semibold text-blue-300">
                100% Télétravail
              </span>
            )}

            {isCIElegible && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-600/40 text-[10px] font-bold text-emerald-400">
                🇨🇮 Côte d'Ivoire OK
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveOpportunity(item.id);
            }}
            aria-label={isSaved ? "Retirer des favoris" : "Ajouter aux favoris"}
            className={`p-2 rounded-xl transition cursor-pointer shrink-0 ${
              isSaved
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'bg-[#181824] text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-[#F5CE62] transition leading-snug mb-2">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-3">
          {item.description}
        </p>

        {/* Conditions d'accès */}
        <div className="flex items-start gap-1.5 text-[11px] text-gray-300 bg-[#161622] rounded-lg p-2 mb-3 border border-gray-800/80">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="line-clamp-2">
            <strong className="text-gray-200">Conditions :</strong> {item.accessConditions}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-400 mb-3">
          <Wallet className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-gray-400 font-medium">Paiement :</span>
          {item.paymentMethods.map((pm, idx) => (
            <span
              key={idx}
              className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                pm.includes('Wave') || pm.includes('Orange') || pm.includes('MTN')
                  ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              {pm}
            </span>
          ))}
        </div>

        {/* Countries */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-4">
          <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span className="truncate">
            {item.countries.join(', ')}
          </span>
        </div>
      </div>

      {/* Footer: Rémunération indicative & Official Link Button */}
      <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            Rémunération indicative
          </span>
          <span className="text-sm font-extrabold text-[#F5CE62]">
            {item.indicativeRewardEur > 0
              ? formatReward(item.indicativeRewardEur, currency)
              : item.rewardText}
          </span>
        </div>

        <a
          href={item.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
          aria-label={`Accéder à l'offre officielle sur ${item.platform}`}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:brightness-110 text-black text-xs font-bold shadow-md transition cursor-pointer"
        >
          <span>Postuler / Voir</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};
