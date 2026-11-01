/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Espace Favoris & Historique
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from './OpportunityCard';
import { OpportunityItem } from '../types';
import {
  Bookmark,
  History,
  GraduationCap,
  ExternalLink,
  Trash2,
  Briefcase,
} from 'lucide-react';

interface FavoritesViewProps {
  onSelectOpportunity: (item: OpportunityItem) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ onSelectOpportunity }) => {
  const {
    opportunities,
    trainings,
    savedOpportunityIds,
    savedTrainingIds,
    recentlyViewedIds,
    searchHistory,
    clearSearchHistory,
    toggleSaveTraining,
    recordLinkClick,
    setActiveTab,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'opps' | 'trainings' | 'history'>('opps');

  const savedOpportunities = opportunities.filter((op) => savedOpportunityIds.includes(op.id));
  const savedCourses = trainings.filter((t) => savedTrainingIds.includes(t.id));
  const recentlyViewed = opportunities.filter((op) => recentlyViewedIds.includes(op.id));

  return (
    <div className="pb-24 pt-4 px-4 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Bookmark className="w-6 h-6 text-[#D4AF37]" />
          <h1 className="text-2xl font-black text-white font-['Cinzel',serif] tracking-wide">
            ESPACE <span className="text-[#D4AF37]">FAVORIS</span>
          </h1>
        </div>
        <p className="text-xs text-gray-300">
          Retrouvez vos opportunités sauvegardées, formations favorites et historique de navigation.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
        <button
          onClick={() => setActiveSubTab('opps')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeSubTab === 'opps'
              ? 'bg-[#D4AF37] text-black shadow'
              : 'bg-[#14141E] text-gray-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Opportunités ({savedOpportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('trainings')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeSubTab === 'trainings'
              ? 'bg-[#D4AF37] text-black shadow'
              : 'bg-[#14141E] text-gray-400 hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Formations ({savedCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeSubTab === 'history'
              ? 'bg-[#D4AF37] text-black shadow'
              : 'bg-[#14141E] text-gray-400 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Historique récent</span>
        </button>
      </div>

      {/* Tab: Saved Opportunities */}
      {activeSubTab === 'opps' && (
        <div>
          {savedOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedOpportunities.map((op) => (
                <OpportunityCard key={op.id} item={op} onSelect={onSelectOpportunity} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl bg-[#12121A] border border-gray-800 space-y-3">
              <Bookmark className="w-8 h-8 text-gray-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Aucune opportunité enregistrée</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Appuyez sur l'icône de marque-page sur une offre pour la conserver ici.
              </p>
              <button
                onClick={() => setActiveTab('search')}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs"
              >
                Explorer le catalogue
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Saved Trainings */}
      {activeSubTab === 'trainings' && (
        <div>
          {savedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedCourses.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl bg-[#12121A] border border-gray-800 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#E5C07B]">{c.provider}</span>
                      <button
                        onClick={() => toggleSaveTraining(c.id)}
                        className="text-gray-400 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{c.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">{c.description}</p>
                  </div>
                  <a
                    href={c.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordLinkClick(c.officialUrl)}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold"
                  >
                    <span>Accéder</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl bg-[#12121A] border border-gray-800 space-y-3">
              <GraduationCap className="w-8 h-8 text-gray-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Aucune formation sauvegardée</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Consultez l'espace Formations pour ajouter des cours officiels à votre bibliothèque.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Recently Viewed & Search History */}
      {activeSubTab === 'history' && (
        <div className="space-y-6">
          {/* Searches */}
          <div className="rounded-2xl bg-[#12121A] border border-gray-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#E5C07B] flex items-center gap-1.5">
                <History className="w-4 h-4 text-[#D4AF37]" />
                Recherches récentes
              </h3>
              {searchHistory.length > 0 && (
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-rose-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Tout effacer
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#1A1A26] border border-gray-800 text-xs text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Recently Viewed Opportunities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Opportunités récemment ouvertes ({recentlyViewed.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentlyViewed.map((op) => (
                <OpportunityCard key={op.id} item={op} onSelect={onSelectOpportunity} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
