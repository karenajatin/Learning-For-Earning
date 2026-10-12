import React, { useState } from 'react';
import { Search, Flame, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { CATEGORIES } from '../data/learningDirectory';
import { ActivePage } from './Sidebar';

interface HeaderProps {
  onSearchSelect: (query: string) => void;
  onNavigate: (page: ActivePage) => void;
  onSelectTopic: (categoryId: string) => void;
  dailyStreak: number;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchSelect,
  onNavigate,
  onSelectTopic,
  dailyStreak,
  completedCount,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Suggestions for autocomplete
  const filteredSuggestions = searchTerm.trim().length > 1
    ? CATEGORIES.filter(cat => 
        cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.subTopics.some(sub => sub.title.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      onSearchSelect(searchTerm.trim());
      setIsFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-[#FAF8F5]/90 backdrop-blur-md px-4 lg:px-8 py-3.5 border-b border-stone-200/60">
      {/* Mobile Brand indicator */}
      <div 
        onClick={() => onNavigate('overview')}
        className="flex lg:hidden items-center gap-2 cursor-pointer"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-stone-900 shadow-xs">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="font-extrabold text-sm text-stone-900">LearnFree</span>
      </div>

      {/* Center / Left Search Bar */}
      <div className="relative flex-1 max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-stone-600 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 250)}
            onKeyDown={handleKeyDown}
            placeholder="Search topics, skills, Python, calculus, design..."
            className="w-full rounded-2xl border border-stone-200/80 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-hidden shadow-xs transition-all"
          />
        </div>

        {/* Live Autocomplete Dropdown */}
        {isFocused && filteredSuggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white p-2 shadow-xl border border-stone-200 z-50">
            <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Quick Topics
            </div>
            {filteredSuggestions.map((cat) => (
              <button
                key={cat.id}
                onMouseDown={() => {
                  onSelectTopic(cat.id);
                  setSearchTerm('');
                  setIsFocused(false);
                }}
                className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs text-stone-800 hover:bg-amber-50 hover:text-amber-900 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-3.5 w-3.5 text-amber-500" />
                  <span className="font-semibold">{cat.title}</span>
                </div>
                <span className="text-[10px] text-stone-400">{cat.subTopics.length} sections</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Top Right Quick Stats */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div 
          onClick={() => onNavigate('my-topics')}
          title="Daily Learning Streak"
          className="flex items-center gap-1.5 rounded-2xl bg-white px-3 py-1.5 border border-stone-200/80 shadow-xs cursor-pointer hover:border-amber-300 transition-all text-xs font-semibold text-stone-700"
        >
          <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
          <span className="hidden sm:inline">{dailyStreak} Day Streak</span>
          <span className="sm:hidden">{dailyStreak}d</span>
        </div>

        <div 
          onClick={() => onNavigate('my-topics')}
          title="Completed Free Resources"
          className="flex items-center gap-1.5 rounded-2xl bg-emerald-50 px-3 py-1.5 border border-emerald-200/70 shadow-xs cursor-pointer hover:border-emerald-300 transition-all text-xs font-semibold text-emerald-800"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="hidden sm:inline">{completedCount} Completed</span>
          <span className="sm:hidden">{completedCount}</span>
        </div>
      </div>
    </header>
  );
};
