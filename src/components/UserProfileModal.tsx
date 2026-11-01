/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - User Profile & Authentication Modal
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import { Currency } from '../types';
import {
  X,
  User,
  Mail,
  Lock,
  Globe,
  Coins,
  Check,
  ShieldCheck,
  Crown,
  LogOut,
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVIP: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenVIP,
}) => {
  const { userProfile, setUserProfile, currency, setCurrency } = useApp();

  const [authMode, setAuthMode] = useState<'profile' | 'login' | 'register' | 'forgot'>('profile');
  const [name, setName] = useState(userProfile?.name || 'Visiteur DIMARIA');
  const [email, setEmail] = useState(userProfile?.email || 'visiteur@dimariacompany.com');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(userProfile?.country || "Côte d'Ivoire");
  const [selectedCity, setSelectedCity] = useState(userProfile?.city || 'Abidjan');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        name,
        email,
        country: selectedCountry,
        city: selectedCity,
        preferredCurrency: currency,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setUserProfile({
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      country: selectedCountry,
      city: selectedCity,
      preferredCurrency: currency,
      preferredCategories: ['micro-tasks', 'freelance'],
      isPremium: false,
      notificationsEnabled: true,
      avatarSeed: 'dimaria-user',
    });
    setAuthMode('profile');
    setInfoMessage('Connexion réussie avec succès !');
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage(`Un lien de réinitialisation sécurisé a été envoyé à ${email || 'votre adresse email'}.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-[#0F0F16] border border-[#D4AF37]/50 p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fermer le profil"
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-4">
          <button
            onClick={() => setAuthMode('profile')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
              authMode === 'profile'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mon Profil
          </button>
          <button
            onClick={() => setAuthMode('login')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
              authMode === 'login'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
              authMode === 'register'
                ? 'bg-[#D4AF37] text-black shadow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Inscription
          </button>
        </div>

        {infoMessage && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200">
            {infoMessage}
          </div>
        )}

        {/* PROFILE TAB */}
        {authMode === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14141E] border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-black flex items-center justify-center font-bold text-lg shadow">
                <User className="w-6 h-6 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{userProfile?.name}</h3>
                <p className="text-xs text-gray-400 truncate">{userProfile?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  {userProfile?.isPremium ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300">
                      <Crown className="w-3 h-3 fill-current" /> DIMARIA VIP Actif
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenVIP();
                      }}
                      className="text-[10px] font-bold text-[#E5C07B] hover:underline flex items-center gap-0.5"
                    >
                      <span>Passer VIP</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Nom complet ou pseudonyme
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            {/* Country Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Pays de résidence principal
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              >
                {SUPPORTED_COUNTRIES.slice(1).map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Ville
              </label>
              <input
                type="text"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                placeholder="Ex : Abidjan, Dakar, Douala, Paris..."
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                Devise préférée pour les rémunérations
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['XOF', 'EUR', 'USD'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      currency === curr
                        ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                        : 'bg-[#14141E] text-gray-400 border-gray-800 hover:text-white'
                    }`}
                  >
                    {curr === 'XOF' ? 'FCFA' : curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Public Access Mode explanation */}
            <div className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-[11px] text-gray-400">
              💡 <strong>Accès Public :</strong> L'application permet de consulter toutes les opportunités sans inscription obligatoire.
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black text-xs font-bold shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Modifications enregistrées !</span>
                </>
              ) : (
                <span>Sauvegarder le profil</span>
              )}
            </button>
          </form>
        )}

        {/* LOGIN / REGISTER / FORGOT TABS */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <h3 className="text-sm font-bold text-white">Connexion à votre compte</h3>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => setAuthMode('forgot')}
                className="text-amber-400 hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
            >
              Se connecter
            </button>
          </form>
        )}

        {authMode === 'register' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <h3 className="text-sm font-bold text-white">Créer un compte DIMARIA</h3>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Nom complet</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-300 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black font-bold text-xs"
            >
              Créer mon compte
            </button>
          </form>
        )}

        {authMode === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <h3 className="text-sm font-bold text-white">Réinitialisation du mot de passe</h3>
            <p className="text-xs text-gray-400">
              Saisissez l'adresse email associée à votre compte pour recevoir le lien de réinitialisation.
            </p>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-3 py-2 rounded-xl bg-[#14141E] border border-gray-700 text-xs text-white"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
            >
              Envoyer les instructions
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="w-full text-center text-xs text-gray-400 hover:text-white"
            >
              Retour à la connexion
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
