/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * DIMARIA OPPORTUNITY - Espace Formation & Certifications
 * DIMARIA COMPANY
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TrainingCourse } from '../types';
import {
  GraduationCap,
  Award,
  ExternalLink,
  Bookmark,
  BookOpen,
  Code2,
  Sparkles,
  Megaphone,
  Briefcase,
  Languages,
} from 'lucide-react';

export const TrainingView: React.FC = () => {
  const { trainings, savedTrainingIds, toggleSaveTraining, recordLinkClick } = useApp();
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const domains = [
    { id: 'all', label: 'Toutes les formations', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'it-dev', label: 'Informatique & Dév', icon: <Code2 className="w-4 h-4 text-blue-400" /> },
    { id: 'ai', label: 'Intelligence Artificielle', icon: <Sparkles className="w-4 h-4 text-[#D4AF37]" /> },
    { id: 'marketing', label: 'Marketing Numérique', icon: <Megaphone className="w-4 h-4 text-rose-400" /> },
    { id: 'entrepreneurship', label: 'Entrepreneuriat', icon: <Briefcase className="w-4 h-4 text-emerald-400" /> },
    { id: 'languages', label: 'Langues & Digital', icon: <Languages className="w-4 h-4 text-purple-400" /> },
  ];

  const filteredTrainings = trainings.filter((t) => {
    if (selectedDomain !== 'all' && t.domain !== selectedDomain) {
      return false;
    }
    return true;
  });

  return (
    <div className="pb-24 pt-4 px-4 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="w-6 h-6 text-[#D4AF37]" />
          <h1 className="text-2xl font-black text-white font-['Cinzel',serif] tracking-wide">
            ESPACE <span className="text-[#D4AF37]">FORMATION</span>
          </h1>
        </div>
        <p className="text-xs text-gray-300">
          Formations gratuites et certifications d'excellence reconnues à l'international (Google, Harvard, Y Combinator).
        </p>
      </div>

      {/* Domain Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {domains.map((dom) => (
          <button
            key={dom.id}
            onClick={() => setSelectedDomain(dom.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
              selectedDomain === dom.id
                ? 'bg-[#D4AF37] text-black shadow-md font-bold'
                : 'bg-[#14141E] text-gray-300 border border-gray-800 hover:border-gray-600'
            }`}
          >
            {dom.icon}
            <span>{dom.label}</span>
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTrainings.map((course) => {
          const isSaved = savedTrainingIds.includes(course.id);

          return (
            <article
              key={course.id}
              className="rounded-2xl bg-[#101018] border border-gray-800 hover:border-[#D4AF37]/50 p-5 flex flex-col justify-between transition shadow-md"
            >
              <div>
                {/* Header: Provider & Bookmark */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#1B1B26] border border-gray-700 text-xs font-bold text-[#E5C07B]">
                      {course.provider}
                    </span>
                    {course.hasCertificate && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                        <Award className="w-3 h-3 text-[#D4AF37]" />
                        Certificat Inclus
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSaveTraining(course.id)}
                    aria-label={isSaved ? 'Retirer la formation des favoris' : 'Ajouter aux favoris'}
                    className={`p-2 rounded-xl transition cursor-pointer ${
                      isSaved
                        ? 'bg-[#D4AF37] text-black shadow-md'
                        : 'bg-[#161622] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
                  {course.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-4">
                  <span>⏱ {course.duration}</span>
                  <span>•</span>
                  <span>🌐 {course.language}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">100% Gratuit</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-gray-800 flex justify-end">
                <a
                  href={course.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordLinkClick(course.officialUrl)}
                  aria-label={`Accéder à la formation officielle sur ${course.provider}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-black text-xs font-bold shadow-md hover:brightness-110 transition cursor-pointer"
                >
                  <span>Accéder à la formation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
