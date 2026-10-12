import React, { useState } from 'react';
import { 
  Code2, 
  Globe, 
  Binary, 
  Atom, 
  Languages, 
  Palette, 
  TrendingUp, 
  Briefcase, 
  Shield, 
  Music, 
  BookOpen, 
  HeartPulse, 
  GraduationCap, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Category, CategoryGroup, UserProgress } from '../types';
import { CATEGORIES } from '../data/learningDirectory';
import { AdSlot } from './AdSlot';

interface AllTopicsProps {
  progress: UserProgress;
  onSelectTopic: (categoryId: string) => void;
}

export const AllTopics: React.FC<AllTopicsProps> = ({
  progress,
  onSelectTopic,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const groups = ['All', 'Technology', 'Academics', 'Creative', 'Business', 'Life Skills'];

  const filteredCategories = CATEGORIES.filter(cat => {
    const matchesGroup = selectedGroup === 'All' || cat.group === selectedGroup;
    const matchesSearch = 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subTopics.some(st => st.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGroup && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Globe': return Globe;
      case 'Binary': return Binary;
      case 'Atom': return Atom;
      case 'Languages': return Languages;
      case 'Palette': return Palette;
      case 'TrendingUp': return TrendingUp;
      case 'Briefcase': return Briefcase;
      case 'Shield': return Shield;
      case 'Music': return Music;
      case 'BookOpen': return BookOpen;
      case 'HeartPulse': return HeartPulse;
      case 'GraduationCap': return GraduationCap;
      default: return Sparkles;
    }
  };

  const pastelCardStyles = {
    lavender: 'bg-[#F0EEFF] border-[#E0DAFE] text-[#2D2A4A]',
    peach: 'bg-[#FFF0E8] border-[#FED7C7] text-[#4A2B20]',
    sky: 'bg-[#EAF5FF] border-[#CCE7FF] text-[#1E3A5F]',
    mint: 'bg-[#EDF9F1] border-[#CEF0D8] text-[#1B3E26]',
    butter: 'bg-[#FEF9E6] border-[#FDEEB3] text-[#463814]',
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
          All Learning Topics & Skills
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Browse our structured directory across {CATEGORIES.length} comprehensive categories. Every topic features a curated roadmap, an original study guide, and top-tier free links.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200/80 shadow-2xs">
        {/* Domain Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="h-4 w-4 text-stone-400 ml-1.5 mr-0.5 shrink-0" />
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedGroup === group
                  ? 'bg-amber-400 text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Local Search */}
        <div className="w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter categories..."
            className="w-full rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-1.5 text-xs text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-amber-400 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredCategories.map((cat) => {
          const Icon = getCategoryIcon(cat.icon);
          const isStarted = progress.startedTopics.includes(cat.id);
          const colorClass = pastelCardStyles[cat.cardColor] || pastelCardStyles.lavender;
          const totalLinks = cat.subTopics.flatMap(s => s.links).length;
          const completedCount = cat.subTopics.flatMap(s => s.links).filter(l => progress.completedLinks.includes(l.id)).length;
          const percent = totalLinks > 0 ? Math.round((completedCount / totalLinks) * 100) : 0;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectTopic(cat.id)}
              className={`group flex flex-col justify-between rounded-[20px] p-6 border ${colorClass} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 text-stone-700 shadow-2xs">
                    {cat.group}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isStarted && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="h-3 w-3" />
                        Started
                      </span>
                    )}
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-2xs text-stone-900 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <h2 className="text-lg font-extrabold tracking-tight group-hover:text-amber-900 transition-colors">
                  {cat.title}
                </h2>
                <p className="mt-2 text-xs text-stone-700/85 leading-relaxed line-clamp-3">
                  {cat.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-stone-600">
                    {cat.subTopics.length} Sub-topics · {totalLinks} free links
                  </div>
                  {isStarted && (
                    <div className="text-[10px] font-bold text-emerald-700 font-mono mt-0.5">
                      {completedCount}/{totalLinks} Completed ({percent}%)
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="py-16 text-center bg-white rounded-[20px] border border-stone-200">
          <p className="text-sm text-stone-500">No categories matching "{searchQuery}"</p>
          <button
            onClick={() => { setSelectedGroup('All'); setSearchQuery(''); }}
            className="mt-3 text-xs font-bold text-amber-700 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Community AdSlot */}
      <AdSlot label="Open Education Sponsor" />
    </div>
  );
};
