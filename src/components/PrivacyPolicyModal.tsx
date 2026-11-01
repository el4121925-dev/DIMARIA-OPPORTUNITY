/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Google Play & RGPD Compliant Privacy Policy
 * DIMARIA COMPANY
 */

import React from 'react';
import { X, ShieldCheck, Lock, Mail } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0F0F16] border border-[#D4AF37]/50 shadow-2xl p-6 relative max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Fermer la politique de confidentialité"
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
          <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <h2 className="text-base font-bold text-white font-['Cinzel',serif] tracking-wide">
              POLITIQUE DE CONFIDENTIALITÉ & SÉCURITÉ DES DONNÉES
            </h2>
            <p className="text-[11px] text-gray-400">
              DIMARIA OPPORTUNITY • Éditée par DIMARIA COMPANY
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
          <section>
            <h3 className="font-bold text-[#E5C07B] mb-1">1. Présentation générale</h3>
            <p>
              L'application DIMARIA OPPORTUNITY est développée et exploitée par DIMARIA COMPANY. Notre engagement est d'offrir une plateforme sécurisée, éthique et respectueuse de la vie privée de nos utilisateurs à travers le monde.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-[#E5C07B] mb-1">2. Données collectées</h3>
            <p>
              • <strong>Données de profil utilisateur :</strong> Nom ou pseudonyme, adresse email, pays de résidence et préférences de devise (FCFA, EUR, USD). Ces informations sont utilisées uniquement pour adapter les résultats de recherche et les alertes d'opportunités.
            </p>
            <p className="mt-1">
              • <strong>Données techniques de navigation :</strong> Historique de recherche local et opportunités enregistrées dans vos favoris, stockés de manière sécurisée sur votre appareil.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-[#E5C07B] mb-1">3. Réseau publicitaire Google AdMob</h3>
            <p>
              DIMARIA OPPORTUNITY intègre des unités d'annonces Google AdMob (bannières, interstitiels et vidéos récompensées). Google AdMob peut utiliser des identifiants publicitaires anonymisés conformément aux règles de la politique pour les développeurs Google Play. Aucun clic automatisé, frauduleux ou incitatif n'est généré par l'application.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-[#E5C07B] mb-1">4. Intelligence Artificielle & DIMARIA AI</h3>
            <p>
              Les requêtes adressées à DIMARIA AI (CV, lettres de motivation, conseils) sont traitées via une API sécurisée. Aucune donnée confidentielle ou privée n'est vendue ni cédée à des tiers à des fins commerciales.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-[#E5C07B] mb-1">5. Droits des utilisateurs & Contact</h3>
            <p>
              Conformément aux réglementations internationales (RGPD et lois sur la protection des données personnelles), vous pouvez à tout moment demander la modification ou la suppression totale de vos données en contactant notre équipe à :
            </p>
            <div className="mt-2 p-3 rounded-xl bg-[#14141E] border border-gray-800 flex items-center gap-2 text-[#F5CE62] font-mono">
              <Mail className="w-4 h-4" />
              <span>contact@dimariacompany.com</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
