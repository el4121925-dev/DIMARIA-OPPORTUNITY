/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - AdMob Interstitial & Rewarded Video Simulator
 * DIMARIA COMPANY
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Sparkles, CheckCircle2, X } from 'lucide-react';

interface AdMobSimulatorModalProps {
  type: 'interstitial' | 'rewarded';
  isOpen: boolean;
  onClose: () => void;
  onRewardGranted?: () => void;
}

export const AdMobSimulatorModal: React.FC<AdMobSimulatorModalProps> = ({
  type,
  isOpen,
  onClose,
  onRewardGranted,
}) => {
  const { admobConfig } = useApp();
  const [countdown, setCountdown] = useState(type === 'rewarded' ? 5 : 3);
  const [canClose, setCanClose] = useState(false);
  const [rewardGranted, setRewardGranted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setCountdown(type === 'rewarded' ? 5 : 3);
    setCanClose(false);
    setRewardGranted(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClose(true);
          if (type === 'rewarded') {
            setRewardGranted(true);
            onRewardGranted?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, type, onRewardGranted]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#0E0E14] border-2 border-[#D4AF37] p-5 shadow-[0_0_30px_rgba(212,175,55,0.3)] relative">
        {/* Top header with Test ID and countdown */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-[#D4AF37] font-bold">
              Google AdMob {type === 'rewarded' ? 'Vidéo Récompensée' : 'Interstitiel'}
            </span>
            <span className="text-[9px] text-gray-400 font-mono">
              ID Test : {type === 'rewarded' ? admobConfig.rewardedUnitId : admobConfig.interstitialUnitId}
            </span>
          </div>

          {canClose ? (
            <button
              onClick={onClose}
              aria-label="Fermer la publicité"
              className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-[#1F1F2A] text-xs font-mono text-[#F5CE62] border border-[#D4AF37]/30">
              Fermeture dans {countdown}s
            </span>
          )}
        </div>

        {/* Ad creative display */}
        <div className="flex flex-col items-center text-center py-6 px-3 bg-gradient-to-b from-[#14141E] to-[#0A0A0E] rounded-xl border border-gray-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#FDE68A] flex items-center justify-center text-black mb-4 shadow-lg">
            <Play className="w-8 h-8 fill-current" />
          </div>

          <h3 className="text-base font-bold text-white mb-1">
            Découvrez les Programmes d'Entrepreneuriat DIMARIA COMPANY
          </h3>
          <p className="text-xs text-gray-300 max-w-xs mb-4">
            Rejoignez notre réseau de leaders et découvrez les meilleures bourses d'études et subventions pour financer vos projets.
          </p>

          {rewardGranted ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Récompense accordée ! Accès VIP débloqué.</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Regardez jusqu'au bout pour débloquer votre avantage</span>
            </div>
          )}
        </div>

        {/* Bottom dismiss button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            disabled={!canClose}
            aria-label="Continuer vers l'application"
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              canClose
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black shadow-md hover:brightness-110'
                : 'bg-gray-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canClose ? 'Reprendre l\'application' : `Patientez (${countdown}s)`}
          </button>
        </div>
      </div>
    </div>
  );
};
