/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Full Opportunity Detail Modal
 * DIMARIA COMPANY
 */

import React from 'react';
import { OpportunityItem } from '../types';
import { useApp } from '../context/AppContext';
import { formatReward, COMPLIANCE_STATEMENT } from '../utils/opportunityLogic';
import {
  X,
  ExternalLink,
  ShieldAlert,
  Bookmark,
  CheckCircle2,
  Globe,
  Wallet,
  Building,
  Sparkles,
} from 'lucide-react';

interface OpportunityDetailModalProps {
  item: OpportunityItem | null;
  onClose: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({ item, onClose }) => {
  const { currency, savedOpportunityIds, toggleSaveOpportunity, recordLinkClick } = useApp();

  if (!item) return null;

  const isSaved = savedOpportunityIds.includes(item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl bg-[#0F0F16] border border-[#D4AF37]/50 p-6 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fermer la vue détaillée"
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
          <span className="px-2.5 py-1 rounded-md bg-[#1F1F2B] text-xs font-bold text-[#E5C07B] border border-gray-700">
            {item.platform}
          </span>
          {item.isRemote && (
            <span className="px-2.5 py-1 rounded-md bg-blue-950/60 text-blue-300 text-xs font-semibold border border-blue-800/50">
              100% Télétravail
            </span>
          )}
          {item.isSponsored && (
            <span className="px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 text-xs font-bold border border-amber-800/50 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Sponsorisé
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-white mb-2 leading-snug">
          {item.title}
        </h2>

        {/* Reward Highlight */}
        <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-[#181824] via-[#1A1820] to-[#121218] border border-[#D4AF37]/40 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 uppercase font-semibold">
              Rémunération indicative
            </span>
            <div className="text-xl font-black text-[#F5CE62]">
              {item.indicativeRewardEur > 0
                ? formatReward(item.indicativeRewardEur, currency)
                : item.rewardText}
            </div>
          </div>
          <div className="text-right text-[11px] text-gray-400">
            <div>Niveau requis</div>
            <div className="font-bold text-gray-200 capitalize">{item.experienceLevel}</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h4 className="text-xs uppercase font-bold text-gray-400 tracking-wider mb-1">
            Description de l'opportunité
          </h4>
          <p className="text-sm text-gray-200 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Conditions d'accès */}
        <div className="mb-4 p-3.5 rounded-xl bg-[#14141E] border border-gray-800">
          <h4 className="text-xs uppercase font-bold text-[#E5C07B] tracking-wider mb-1.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            Conditions requises & Éligibilité
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {item.accessConditions}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-[#14141E] border border-gray-800">
            <div className="text-[11px] text-gray-400 flex items-center gap-1 mb-1">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Pays et zones éligibles</span>
            </div>
            <div className="text-xs font-semibold text-white">
              {item.countries.join(', ')}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#14141E] border border-gray-800">
            <div className="text-[11px] text-gray-400 flex items-center gap-1 mb-1">
              <Wallet className="w-3.5 h-3.5 text-amber-400" />
              <span>Moyens de paiement acceptés</span>
            </div>
            <div className="text-xs font-semibold text-white">
              {item.paymentMethods.join(', ')}
            </div>
          </div>
        </div>

        {/* Compliance & Zero Fake Promises Banner */}
        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-600/30 text-[11px] text-amber-200/90 leading-relaxed mb-6 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{COMPLIANCE_STATEMENT}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => toggleSaveOpportunity(item.id)}
            aria-label={isSaved ? "Retirer des favoris" : "Sauvegarder l'offre"}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
              isSaved
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-[#181824] text-gray-300 border-gray-700 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>{isSaved ? 'Sauvegardé' : 'Favoris'}</span>
          </button>

          <a
            href={item.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordLinkClick(item.officialUrl)}
            aria-label="Accéder au site officiel"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5CE62] to-[#E5A93C] text-black text-sm font-extrabold shadow-lg hover:brightness-110 transition cursor-pointer"
          >
            <span>Accéder au site officiel</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
