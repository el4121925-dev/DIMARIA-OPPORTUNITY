/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Google AdMob Banner & Native Simulator
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Info, X, ExternalLink } from 'lucide-react';

interface AdMobBannerProps {
  placement?: 'home-bottom' | 'search-header' | 'detail-card' | 'native-inline';
  onSimulateRewarded?: () => void;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ placement = 'home-bottom' }) => {
  const { admobConfig, userProfile } = useApp();
  const [dismissed, setDismissed] = useState(false);

  // If user is premium, AdMob ads are completely removed
  if (userProfile?.isPremium) {
    return null;
  }

  // If admob is disabled by admin
  if (!admobConfig.enabled || dismissed) {
    return null;
  }

  return (
    <div className="w-full my-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-[#0F0F14] border border-[#D4AF37]/20 rounded-xl p-3 shadow-md relative overflow-hidden">
        {/* Subtle Ad Badge compliant with Google AdMob policy */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-1.5 mb-2 text-[10px] text-gray-400">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 font-mono font-bold uppercase text-[9px]">
              {admobConfig.isTestMode ? 'AdMob Test (ca-app-pub-3940256099942544)' : 'Annonce'}
            </span>
            <span className="text-gray-400">Google AdMob Network</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Fermer la bannière publicitaire"
            className="text-gray-400 hover:text-white p-0.5 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ad Body */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center shrink-0 text-black font-bold">
            <span className="font-['Cinzel'] text-xs font-black">DO</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-gray-100 truncate">
              Développez vos compétences avec les partenaires certifiés
            </h4>
            <p className="text-[11px] text-gray-400 truncate">
              Formations gratuites et bourses disponibles sur DIMARIA OPPORTUNITY.
            </p>
          </div>
          <a
            href="https://grow.google"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#F5CE62] text-black text-xs font-bold transition shadow"
          >
            <span>Visiter</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Google AdMob Compliance Notice */}
        <div className="mt-2 pt-1 border-t border-gray-900 flex items-center gap-1 text-[9px] text-gray-400">
          <Info className="w-2.5 h-2.5" />
          <span>Annonce conforme aux règles Google Play et AdMob. Aucun faux clic généré.</span>
        </div>
      </div>
    </div>
  );
};
