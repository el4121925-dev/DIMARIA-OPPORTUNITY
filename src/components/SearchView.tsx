/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Global Search & Verification Engine
 * DIMARIA COMPANY
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from './OpportunityCard';
import { SUPPORTED_COUNTRIES } from '../data/initialData';
import { filterOpportunities } from '../utils/opportunityLogic';
import { OpportunityItem } from '../types';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface SearchViewProps {
  onSelectOpportunity: (item: OpportunityItem) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ onSelectOpportunity }) => {
  const {
    opportunities,
    searchHistory,
    addSearchQuery,
    clearSearchHistory,
    userProfile,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(userProfile?.country || 'ALL');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState('all');
  const [minRewardEur, setMinRewardEur] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'micro-tasks', label: 'Micro-tâches & IA' },
    { id: 'freelance', label: 'Freelance & Services' },
    { id: 'testing', label: 'Tests de sites & apps' },
    { id: 'surveys', label: 'Sondages rémunérés' },
    { id: 'online-work', label: 'Travail à distance (Support/IT)' },
    { id: 'scholarships', label: 'Bourses d\'études' },
    { id: 'affiliation', label: 'Affiliation & Partenariats' },
    { id: 'contests', label: 'Concours & Subventions' },
    { id: 'beginner-missions', label: 'Missions débutants' },
  ];

  // Perform filtering using decoupled tested logic
  const filteredResults = useMemo(() => {
    return filterOpportunities(opportunities, {
      query,
      country: selectedCountry === 'ALL' ? undefined : selectedCountry,
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      isRemote: isRemoteOnly,
      isFree: isFreeOnly,
      experienceLevel: experienceLevel === 'all' ? undefined : experienceLevel,
      minRewardEur: minRewardEur > 0 ? minRewardEur : undefined,
    });
  }, [
    opportunities,
    query,
    selectedCountry,
    selectedCategory,
    isRemoteOnly,
    isFreeOnly,
    experienceLevel,
    minRewardEur,
  ]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearchQuery(query.trim());
    }
  };

  const resetFilters = () => {
    setQuery('');
    setSelectedCountry('ALL');
    setSelectedCategory('all');
    setIsRemoteOnly(false);
    setIsFreeOnly(false);
    setExperienceLevel('all');
    setMinRewardEur(0);
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl font-black text-white font-['Cinzel',serif] tracking-wide mb-1">
          RECHERCHE <span className="text-[#D4AF37]">MONDIALE</span>
        </h1>
        <p className="text-xs text-gray-300">
          Explorez des opportunités vérifiées dans plus de 50 pays. Zéro fausse offre garantie.
        </p>
      </div>

      {/* Main Search Bar & Filter Toggle */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par mot-clé, plateforme, méthode de paiement..."
            aria-label="Recherche globale"
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#12121A] border border-gray-700 focus:border-[#D4AF37] text-sm text-white placeholder-gray-500 shadow-inner focus:outline-none transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Afficher les filtres avancés"
          className={`px-4 py-3 rounded-2xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
            showFilters || isRemoteOnly || selectedCountry !== 'ALL' || selectedCategory !== 'all'
              ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow'
              : 'bg-[#181824] text-gray-300 border-gray-800 hover:border-gray-600'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filtres</span>
        </button>
      </form>

      {/* Search History Chips */}
      {searchHistory.length > 0 && !query && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-gray-400 font-medium">Récent :</span>
          {searchHistory.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(item)}
              className="px-2.5 py-1 rounded-full bg-[#161620] hover:bg-[#1E1E2C] border border-gray-800 text-[11px] text-gray-300 transition"
            >
              {item}
            </button>
          ))}
          <button
            onClick={clearSearchHistory}
            className="text-[10px] text-gray-400 hover:text-gray-300 underline ml-1"
          >
            Effacer
          </button>
        </div>
      )}

      {/* Collapsible Advanced Filters Drawer */}
      {showFilters && (
        <div className="p-5 rounded-2xl bg-[#12121A] border border-[#D4AF37]/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5C07B] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
              Filtres Multicritères
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Réinitialiser
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Country filter */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                Pays d'éligibilité
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1A1A26] border border-gray-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              >
                {SUPPORTED_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code === 'ALL' ? 'ALL' : c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category filter */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1A1A26] border border-gray-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 mb-1">
                Niveau requis
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1A1A26] border border-gray-700 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="all">Tous niveaux acceptés</option>
                <option value="beginner">Débutant (Sans expérience)</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé / Expert</option>
              </select>
            </div>

            {/* Checkboxes: Remote & Free */}
            <div className="flex flex-col justify-end gap-2">
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRemoteOnly}
                  onChange={(e) => setIsRemoteOnly(e.target.checked)}
                  className="rounded border-gray-700 bg-gray-900 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>100% Télétravail / En ligne</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFreeOnly}
                  onChange={(e) => setIsFreeOnly(e.target.checked)}
                  className="rounded border-gray-700 bg-gray-900 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>100% Gratuit d'accès</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Results Count Header */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div>
          <strong className="text-[#F5CE62] font-bold">{filteredResults.length}</strong> opportunité(s) trouvée(s)
        </div>
        {selectedCountry !== 'ALL' && (
          <span className="px-2 py-0.5 rounded bg-[#181824] text-gray-300 border border-gray-800">
            Filtre : {selectedCountry}
          </span>
        )}
      </div>

      {/* Results Grid */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResults.map((item) => (
            <OpportunityCard key={item.id} item={item} onSelect={onSelectOpportunity} />
          ))}
        </div>
      ) : (
        <div className="py-12 px-4 rounded-2xl bg-[#12121A] border border-gray-800 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Aucune opportunité ne correspond exactement</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Essayez d'élargir les critères, de sélectionner "Tous les pays", ou de réinitialiser vos filtres.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
