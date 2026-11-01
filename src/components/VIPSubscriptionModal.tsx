/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - VIP Premium Subscription Modal
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Crown,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  X,
  CreditCard,
  Wallet,
} from 'lucide-react';

interface VIPSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchRewardedAd?: () => void;
}

export const VIPSubscriptionModal: React.FC<VIPSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onWatchRewardedAd,
}) => {
  const { userProfile, upgradeToPremium, currency } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'wave' | 'orange' | 'mtn' | 'card'>('wave');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const priceText =
    currency === 'XOF'
      ? selectedPlan === 'monthly'
        ? '3 000 FCFA / mois'
        : '28 000 FCFA / an (Économisez 20%)'
      : currency === 'USD'
      ? selectedPlan === 'monthly'
        ? '$4.99 / month'
        : '$45.00 / year'
      : selectedPlan === 'monthly'
      ? '4,50 € / mois'
      : '42,00 € / an';

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      upgradeToPremium();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-[#0F0F16] border-2 border-[#D4AF37] p-6 shadow-[0_0_40px_rgba(212,175,55,0.3)] relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Fermer la fenêtre VIP"
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#D4AF37] via-[#F5CE62] to-[#E5A93C] flex items-center justify-center text-black shadow-lg">
            <Crown className="w-9 h-9 fill-current" />
          </div>

          <h2 className="text-2xl font-black text-white font-['Cinzel',serif] tracking-wider">
            DIMARIA <span className="text-[#D4AF37]">VIP GOLD</span>
          </h2>
          <p className="text-xs text-gray-300">
            Passez au niveau supérieur et maximisez vos chances de réussite avec nos outils réservés.
          </p>
        </div>

        {/* VIP Benefits List */}
        <div className="space-y-2.5 mb-6 text-xs">
          {[
            'Accès illimité à l\'Assistant DIMARIA AI (CV, lettres et plans)',
            'Suppression complète de toutes les bannières publicitaires',
            'Notifications prioritaires pour les nouvelles bourses et missions',
            'Filtres de recherche avancés et contact direct partenaires',
            'Badge VIP Or officiel sur votre profil',
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-gray-200">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Plan Selector */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            onClick={() => setSelectedPlan('monthly')}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              selectedPlan === 'monthly'
                ? 'bg-[#1C1C28] border-[#D4AF37] text-white'
                : 'bg-[#12121A] border-gray-800 text-gray-400'
            }`}
          >
            <span className="block text-[11px] font-semibold text-gray-400">Mensuel</span>
            <span className="text-xs font-bold text-[#F5CE62]">Sans engagement</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlan('yearly')}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer relative ${
              selectedPlan === 'yearly'
                ? 'bg-[#1C1C28] border-[#D4AF37] text-white'
                : 'bg-[#12121A] border-gray-800 text-gray-400'
            }`}
          >
            <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded bg-emerald-500 text-[9px] font-bold text-black">
              -20%
            </span>
            <span className="block text-[11px] font-semibold text-gray-400">Annuel</span>
            <span className="text-xs font-bold text-emerald-400">12 mois</span>
          </button>
        </div>

        {/* Payment Gateways (Wave, Orange, MTN, Card) */}
        <div className="mb-5">
          <label className="block text-[11px] font-semibold text-gray-400 mb-2">
            Moyen de paiement direct sécurisé :
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'wave', label: 'Wave' },
              { id: 'orange', label: 'Orange' },
              { id: 'mtn', label: 'MTN' },
              { id: 'card', label: 'Carte' },
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as any)}
                className={`py-2 rounded-xl text-xs font-bold border transition ${
                  paymentMethod === method.id
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#14141E] text-gray-400 border-gray-800'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {userProfile?.isPremium ? (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center text-xs font-bold text-emerald-400">
            Votre abonnement VIP Gold est déjà actif !
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F5CE62] to-[#F59E0B] text-black font-extrabold text-sm shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>
                {isProcessing ? 'Validation sécurisée...' : `S'abonner (${priceText})`}
              </span>
            </button>

            {/* Rewarded Ad Free VIP unlock option */}
            {onWatchRewardedAd && (
              <button
                onClick={() => {
                  onClose();
                  onWatchRewardedAd();
                }}
                className="w-full py-2.5 rounded-xl bg-[#181824] border border-gray-700 hover:border-[#D4AF37] text-gray-300 hover:text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Tester gratuitement : Débloquer 24h VIP avec une vidéo AdMob</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
