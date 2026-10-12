import React, { useState } from 'react';
import { 
  Search as SearchIcon, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  Filter, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AccessType, Category, LearningLink, UserProgress } from '../types';
import { CATEGORIES } from '../data/learningDirectory';
import { AdSlot } from './AdSlot';

interface SearchViewProps {
  progress: UserProgress;
  onSelectTopic: (categoryId: string) => void;
  onToggleLinkCompleted: (linkId: string) => void;
  initialQuery?: string;
}

interface SearchResultLink extends LearningLink {
  categoryTitle: string;
  categoryId: string;
  subTopicTitle: string;
}

export const SearchView: React.FC<SearchViewProps> = ({
  progress,
  onSelectTopic,
  onToggleLinkCompleted,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [accessFilter, setAccessFilter] = useState<'All' | AccessType>('All');

  // Flatten all links for live search
  const allSearchableLinks: SearchResultLink[] = CATEGORIES.flatMap(cat =>
    cat.subTopics.flatMap(sub =>
      sub.links.map(l => ({
        ...l,
        categoryTitle: cat.title,
        categoryId: cat.id,
        subTopicTitle: sub.title,
      }))
    )
  );

  const filteredLinks = allSearchableLinks.filter(item => {
    const q = query.toLowerCase().trim();
    const matchesQuery = 
      q === '' ||
      item.title.toLowerCase().includes(q) ||
      item.whyBest.toLowerCase().includes(q) ||
      item.platform.toLowerCase().includes(q) ||
      item.categoryTitle.toLowerCase().includes(q) ||
      item.subTopicTitle.toLowerCase().includes(q);

    const matchesAccess = accessFilter === 'All' || item.access === accessFilter;

    return matchesQuery && matchesAccess;
  });

  // Also check matched categories
  const matchedCategories = query.trim() !== ''
    ? CATEGORIES.filter(c => 
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.summary.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Search Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
          Live Skill & Resource Search
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600">
          Instantly search across our entire directory of vetted free courses, platforms, textbooks, and interactive coding labs.
        </p>
      </div>

      {/* Search Input & Access Filters */}
      <div className="space-y-3 bg-white p-4 rounded-[22px] border border-stone-200/80 shadow-2xs">
        <div className="relative">
          <SearchIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords: Python, MIT, calculus, UI design, finance, prompt engineering, guitar..."
            className="w-full rounded-2xl border border-stone-200/80 bg-stone-50/50 py-3 pl-10 pr-4 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-400 focus:outline-hidden"
            autoFocus
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
          <span className="text-stone-400 text-[11px] font-semibold flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filter access:
          </span>
          {(['All', 'Fully Free', 'Free to Audit', 'Free Tier'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setAccessFilter(filter)}
              className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-colors ${
                accessFilter === filter
                  ? 'bg-amber-400 text-stone-900 shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {filter}
            </button>
          ))}
          <span className="text-[11px] text-stone-400 ml-auto font-mono">
            {filteredLinks.length} results found
          </span>
        </div>
      </div>

      {/* Matched Categories Preview */}
      {matchedCategories.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
            Matching Topics ({matchedCategories.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {matchedCategories.map(cat => (
              <div
                key={cat.id}
                onClick={() => onSelectTopic(cat.id)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/70 hover:bg-amber-100/50 transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-stone-900">{cat.title}</div>
                  <div className="text-[10px] text-stone-500">{cat.subTopics.length} sections</div>
                </div>
                <ArrowRight className="h-4 w-4 text-amber-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Links */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-stone-900">
          Resource Results
        </h2>

        {filteredLinks.length > 0 ? (
          filteredLinks.map((link) => {
            const isCompleted = progress.completedLinks.includes(link.id);

            return (
              <div
                key={`${link.categoryId}-${link.id}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-amber-300 transition-all shadow-2xs"
              >
                <div className="space-y-1 sm:max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs sm:text-sm text-stone-900">
                      {link.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      link.access === 'Fully Free'
                        ? 'bg-emerald-100 text-emerald-800'
                        : link.access === 'Free to Audit'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {link.access}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    <strong className="text-stone-700">Why it's best:</strong> {link.whyBest}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-0.5">
                    <span>Platform: <strong className="text-stone-700">{link.platform}</strong></span>
                    <span>·</span>
                    <button
                      onClick={() => onSelectTopic(link.categoryId)}
                      className="text-amber-700 font-semibold hover:underline"
                    >
                      Topic: {link.categoryTitle}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  <button
                    onClick={() => onToggleLinkCompleted(link.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-emerald-50'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{isCompleted ? 'Done ✓' : 'Mark Done'}</span>
                  </button>

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-3.5 py-2 text-xs font-bold text-stone-900 min-h-[44px] transition-colors shadow-2xs"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center bg-white rounded-[22px] border border-stone-200">
            <p className="text-sm text-stone-600">No resources found matching your search</p>
            <p className="text-xs text-stone-400 mt-1">Try broader terms like "python", "math", or "design"</p>
          </div>
        )}
      </div>

      <AdSlot label="Educational Community Partner" />
    </div>
  );
};
