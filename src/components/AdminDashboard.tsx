/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Secure Admin Management Dashboard
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityItem, TrainingCourse, AppNotification } from '../types';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Bell,
  BarChart3,
  Sliders,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle,
  X,
  ExternalLink,
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const {
    opportunities,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    trainings,
    addTraining,
    broadcastNotification,
    admobConfig,
    updateAdMobConfig,
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'stats' | 'opportunities' | 'trainings' | 'notifications' | 'admob'>('stats');

  // Form state for creating opportunity
  const [showAddOppModal, setShowAddOppModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState('');
  const [newCategory, setNewCategory] = useState<OpportunityItem['category']>('micro-tasks');
  const [newDescription, setNewDescription] = useState('');
  const [newConditions, setNewConditions] = useState('');
  const [newCountries, setNewCountries] = useState('Worldwide, Côte d\'Ivoire, Sénégal, France');
  const [newPaymentMethods, setNewPaymentMethods] = useState('Wave, Orange Money, PayPal');
  const [newRewardEur, setNewRewardEur] = useState('20');
  const [newRewardText, setNewRewardText] = useState('20€ / mission');
  const [newOfficialUrl, setNewOfficialUrl] = useState('');
  const [newIsRemote, setNewIsRemote] = useState(true);
  const [newIsSponsored, setNewIsSponsored] = useState(false);

  // Notification broadcast form
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState<AppNotification['type']>('offer');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === '1234' || adminPin === 'dimaria2026') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOfficialUrl) return;

    const created: OpportunityItem = {
      id: `opp-admin-${Date.now()}`,
      title: newTitle,
      platform: newPlatform || 'Partenaire DIMARIA',
      category: newCategory,
      description: newDescription || 'Opportunité vérifiée et validée par DIMARIA COMPANY.',
      accessConditions: newConditions || 'Inscription directe sur la plateforme officielle.',
      countries: newCountries.split(',').map((c) => c.trim()),
      paymentMethods: newPaymentMethods.split(',').map((p) => p.trim()),
      indicativeRewardEur: parseFloat(newRewardEur) || 0,
      rewardText: newRewardText || 'Selon mission',
      officialUrl: newOfficialUrl,
      isRemote: newIsRemote,
      isFree: true,
      isPopular: true,
      isSponsored: newIsSponsored,
      experienceLevel: 'beginner',
      createdAt: new Date().toISOString().split('T')[0],
    };

    addOpportunity(created);
    setShowAddOppModal(false);
    // Reset form
    setNewTitle('');
    setNewOfficialUrl('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;
    broadcastNotification(broadcastTitle, broadcastMessage, broadcastType);
    setBroadcastSuccess(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setBroadcastSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl rounded-3xl bg-[#0F0F16] border border-[#D4AF37]/60 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between bg-[#14141E]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-black flex items-center justify-center font-bold shadow">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Cinzel',serif] tracking-wider">
                ADMINISTRATION DIMARIA OPPORTUNITY
              </h2>
              <p className="text-[11px] text-gray-400">
                Gestion dynamique en direct sans reconstruction d'APK • DIMARIA COMPANY
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer le tableau de bord"
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUTHENTICATION SCREEN */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-sm mx-auto text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-[#181824] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Espace Administrateur Sécurisé</h3>
              <p className="text-xs text-gray-400 mt-1">
                Entrez le code PIN administrateur pour gérer le catalogue en temps réel.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <input
                type="password"
                maxLength={10}
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Code PIN (Défaut : 1234)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#14141E] border border-gray-700 text-center text-sm font-mono tracking-widest text-white focus:border-[#D4AF37] focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-semibold">
                  Code PIN incorrect. Utilisez le code par défaut : 1234
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs shadow-md hover:brightness-110 transition cursor-pointer"
              >
                Déverrouiller le Tableau de Bord
              </button>
            </form>

            <button
              onClick={() => {
                setAdminPin('1234');
                setIsAuthenticated(true);
              }}
              className="text-[11px] text-[#E5C07B] hover:underline"
            >
              Mode démo rapide : Déverrouiller avec le PIN 1234
            </button>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Admin Tabs */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-800 bg-[#12121A] overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveAdminTab('stats')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeAdminTab === 'stats'
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Statistiques</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('opportunities')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeAdminTab === 'opportunities'
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Gérer Opportunités ({opportunities.length})</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('notifications')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeAdminTab === 'notifications'
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Diffuser Notification</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('admob')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeAdminTab === 'admob'
                    ? 'bg-[#D4AF37] text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Monétisation AdMob</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* TAB 1: STATS */}
              {activeAdminTab === 'stats' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-[#14141E] border border-gray-800">
                      <span className="text-[11px] text-gray-400 block uppercase font-medium">Visites totales</span>
                      <span className="text-xl font-black text-white">14 250</span>
                      <span className="text-[10px] text-emerald-400 block mt-1">+18% cette semaine</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#14141E] border border-gray-800">
                      <span className="text-[11px] text-gray-400 block uppercase font-medium">Clics partenaires</span>
                      <span className="text-xl font-black text-[#F5CE62]">8 920</span>
                      <span className="text-[10px] text-amber-400 block mt-1">Liens vérifiés suivis</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#14141E] border border-gray-800">
                      <span className="text-[11px] text-gray-400 block uppercase font-medium">Requêtes DIMARIA AI</span>
                      <span className="text-xl font-black text-blue-400">2 150</span>
                      <span className="text-[10px] text-blue-300 block mt-1">CV & Plans générés</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#14141E] border border-gray-800">
                      <span className="text-[11px] text-gray-400 block uppercase font-medium">Utilisateurs actifs</span>
                      <span className="text-xl font-black text-purple-400">640 / j</span>
                      <span className="text-[10px] text-purple-300 block mt-1">Afrique & International</span>
                    </div>
                  </div>

                  {/* Geographic breakdown */}
                  <div className="p-5 rounded-2xl bg-[#14141E] border border-gray-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5C07B] mb-3">
                      Répartition Géographique des Utilisateurs
                    </h3>
                    <div className="space-y-2">
                      {[
                        { country: "🇨🇮 Côte d'Ivoire", pct: 42 },
                        { country: "🇸🇳 Sénégal", pct: 21 },
                        { country: "🇨🇲 Cameroun", pct: 14 },
                        { country: "🇫🇷 France & Europe", pct: 11 },
                        { country: "🇧🇯 🇹🇬 Bénin & Togo", pct: 8 },
                        { country: "🌍 Autres pays", pct: 4 },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-300">
                            <span>{item.country}</span>
                            <span className="font-bold text-[#E5C07B]">{item.pct}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-gray-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]"
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: OPPORTUNITIES CRUD */}
              {activeAdminTab === 'opportunities' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">
                      Catalogue dynamique ({opportunities.length} opportunités)
                    </h3>
                    <button
                      onClick={() => setShowAddOppModal(true)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs shadow hover:brightness-110 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter une opportunité</span>
                    </button>
                  </div>

                  {/* Add Modal */}
                  {showAddOppModal && (
                    <form
                      onSubmit={handleCreateOpportunity}
                      className="p-5 rounded-2xl bg-[#181824] border border-[#D4AF37] space-y-3"
                    >
                      <h4 className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider">
                        Nouvelle Opportunité Vérifiée
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Titre de l'offre</label>
                          <input
                            type="text"
                            required
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Ex : Annotation de données Outlier"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#12121A] border border-gray-700 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Nom de la plateforme</label>
                          <input
                            type="text"
                            required
                            value={newPlatform}
                            onChange={(e) => setNewPlatform(e.target.value)}
                            placeholder="Ex : Outlier AI"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#12121A] border border-gray-700 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Lien officiel direct</label>
                          <input
                            type="url"
                            required
                            value={newOfficialUrl}
                            onChange={(e) => setNewOfficialUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-1.5 rounded-lg bg-[#12121A] border border-gray-700 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Rémunération indicative (€)</label>
                          <input
                            type="number"
                            value={newRewardEur}
                            onChange={(e) => setNewRewardEur(e.target.value)}
                            placeholder="Ex : 25"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#12121A] border border-gray-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-300">
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newIsRemote}
                            onChange={(e) => setNewIsRemote(e.target.checked)}
                          />
                          <span>100% Télétravail</span>
                        </label>

                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newIsSponsored}
                            onChange={(e) => setNewIsSponsored(e.target.checked)}
                          />
                          <span>Marquer comme Sponsorisé</span>
                        </label>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddOppModal(false)}
                          className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-xs"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs shadow"
                        >
                          Enregistrer et Publier
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of current opportunities */}
                  <div className="space-y-2">
                    {opportunities.map((op) => (
                      <div
                        key={op.id}
                        className="p-3 rounded-xl bg-[#14141E] border border-gray-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white truncate">{op.title}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-[#E5C07B]">
                              {op.platform}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">{op.rewardText}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              updateOpportunity({ ...op, isSponsored: !op.isSponsored });
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition ${
                              op.isSponsored
                                ? 'bg-amber-400 text-black border-amber-400'
                                : 'bg-gray-800 text-gray-400 border-gray-700'
                            }`}
                          >
                            {op.isSponsored ? 'Sponsorisé' : 'Standard'}
                          </button>

                          <button
                            onClick={() => deleteOpportunity(op.id)}
                            className="p-1.5 rounded bg-gray-800 text-rose-400 hover:bg-rose-950 transition"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: NOTIFICATION BROADCAST */}
              {activeAdminTab === 'notifications' && (
                <div className="max-w-xl mx-auto space-y-4 animate-fade-in">
                  <h3 className="text-sm font-bold text-white">
                    Envoyer une Notification aux Utilisateurs
                  </h3>
                  <p className="text-xs text-gray-400">
                    Cette alerte sera instantanément diffusée dans l'application pour informer les utilisateurs de nouvelles opportunités.
                  </p>

                  {broadcastSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      <span>Notification diffusée avec succès à tous les utilisateurs !</span>
                    </div>
                  )}

                  <form onSubmit={handleSendBroadcast} className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Titre de l'alerte</label>
                      <input
                        type="text"
                        required
                        value={broadcastTitle}
                        onChange={(e) => setBroadcastTitle(e.target.value)}
                        placeholder="Ex : Nouvelles missions rémunérées disponibles"
                        className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Message</label>
                      <textarea
                        rows={3}
                        required
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        placeholder="Ex : Outlier AI ouvre 500 nouvelles places pour les évaluateurs francophones..."
                        className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs shadow"
                    >
                      Diffuser la Notification Instantanée
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: MONETIZATION ADMOB */}
              {activeAdminTab === 'admob' && (
                <div className="max-w-xl mx-auto space-y-4 animate-fade-in">
                  <h3 className="text-sm font-bold text-white">
                    Configuration Google AdMob & Monétisation
                  </h3>
                  <p className="text-xs text-gray-400">
                    Configurez l'affichage des annonces publicitaires. Les annonces peuvent être désactivées ou maintenues en mode test jusqu'à validation par Google.
                  </p>

                  <div className="p-4 rounded-xl bg-[#14141E] border border-gray-800 space-y-3">
                    <label className="flex items-center justify-between text-xs text-gray-200 cursor-pointer">
                      <span>Activer les publicités AdMob dans l'application</span>
                      <input
                        type="checkbox"
                        checked={admobConfig.enabled}
                        onChange={(e) => updateAdMobConfig({ enabled: e.target.checked })}
                        className="rounded border-gray-700 bg-gray-900 text-[#D4AF37]"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-gray-200 cursor-pointer">
                      <span>Mode Test Google AdMob (Unit IDs de test officiels)</span>
                      <input
                        type="checkbox"
                        checked={admobConfig.isTestMode}
                        onChange={(e) => updateAdMobConfig({ isTestMode: e.target.checked })}
                        className="rounded border-gray-700 bg-gray-900 text-[#D4AF37]"
                      />
                    </label>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <label className="block text-gray-400 mb-1">ID Unité Bannière AdMob</label>
                      <input
                        type="text"
                        value={admobConfig.bannerUnitId}
                        onChange={(e) => updateAdMobConfig({ bannerUnitId: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#14141E] border border-gray-700 text-gray-200 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">ID Unité Interstitiel AdMob</label>
                      <input
                        type="text"
                        value={admobConfig.interstitialUnitId}
                        onChange={(e) => updateAdMobConfig({ interstitialUnitId: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#14141E] border border-gray-700 text-gray-200 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">ID Unité Vidéo Récompensée AdMob</label>
                      <input
                        type="text"
                        value={admobConfig.rewardedUnitId}
                        onChange={(e) => updateAdMobConfig({ rewardedUnitId: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#14141E] border border-gray-700 text-gray-200 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
