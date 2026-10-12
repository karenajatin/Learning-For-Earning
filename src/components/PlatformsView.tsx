import React, { useState } from 'react';
import { 
  Compass, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import { UNIVERSAL_PLATFORMS } from '../data/learningDirectory';
import { AdSlot } from './AdSlot';

export const PlatformsView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'free' | 'audit'>('all');

  const platforms = UNIVERSAL_PLATFORMS.filter(p => {
    if (filter === 'free') return p.accessBadge === 'Fully Free';
    if (filter === 'audit') return p.accessBadge === 'Free to Audit';
    return true;
  });

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            Top Universal Free Learning Platforms
          </h1>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            100% Free Tiers
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          These verified platforms offer comprehensive, university-level curricula, open digital textbooks, and high-quality educational software with zero mandatory fees.
        </p>
      </div>

      {/* Pro Tip on Free Audit Mode */}
      <div className="rounded-[20px] bg-amber-50/80 p-5 border border-amber-200 text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
          <HelpCircle className="h-4 w-4" />
          <span>Curator Tip: How to Use "Free to Audit" on Coursera & edX</span>
        </div>
        <p className="text-xs leading-relaxed text-amber-900/90">
          When enrolling in courses on Coursera or edX, select the <strong>"Audit Course"</strong> or <strong>"Free Track"</strong> option during registration. This gives you 100% free access to all video lectures, syllabus materials, and reading assignments. You only pay if you optionally desire a formal paper certificate.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-stone-200/80 shadow-2xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            filter === 'all' ? 'bg-amber-400 text-stone-900' : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          All Platforms ({UNIVERSAL_PLATFORMS.length})
        </button>
        <button
          onClick={() => setFilter('free')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            filter === 'free' ? 'bg-amber-400 text-stone-900' : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          100% Free Forever
        </button>
        <button
          onClick={() => setFilter('audit')}
          className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors ${
            filter === 'audit' ? 'bg-amber-400 text-stone-900' : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Free to Audit (University MOOCs)
        </button>
      </div>

      {/* Platforms Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map((plat) => (
          <div
            key={plat.id}
            className="flex flex-col justify-between rounded-[20px] bg-white p-5 sm:p-6 border border-stone-200/80 shadow-2xs hover:border-amber-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {plat.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  plat.accessBadge === 'Fully Free'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {plat.accessBadge}
                </span>
              </div>

              <h2 className="text-base font-extrabold text-stone-900">
                {plat.name}
              </h2>
              <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                {plat.bestFor}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="text-[11px] text-stone-500 font-medium">
                Rating: <strong className="text-amber-800">{plat.ratingScore}</strong> · {plat.learners}
              </div>

              <a
                href={plat.url}
                data-link-title={plat.name}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2 text-xs font-bold text-stone-900 shadow-2xs transition-colors"
              >
                <span>Visit Platform</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <AdSlot label="Open Education Sponsor" />
    </div>
  );
};
