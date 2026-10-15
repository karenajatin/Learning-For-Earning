import React, { useState } from 'react';
import { Search, Flame, CheckCircle2, Sparkles, BookOpen, Cloud, User, Lock, Smartphone } from 'lucide-react';
import { CATEGORIES } from '../data/learningDirectory';
import { ActivePage } from './Sidebar';
import { AuthState } from '../types';

interface HeaderProps {
  onSearchSelect: (query: string) => void;
  onNavigate: (page: ActivePage) => void;
  onSelectTopic: (categoryId: string) => void;
  dailyStreak: number;
  completedCount: number;
  authState: AuthState;
  onOpenLogin: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchSelect,
  onNavigate,
  onSelectTopic,
  dailyStreak,
  completedCount,
  authState,
  onOpenLogin,
  onOpenProfile,
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

  const { isLoggedIn, user } = authState;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 sm:gap-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 sm:px-6 lg:px-8 py-3 border-b border-stone-200/60">
      {/* Mobile Brand indicator */}
      <div 
        onClick={() => onNavigate('overview')}
        className="flex lg:hidden items-center gap-2 cursor-pointer shrink-0"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-stone-900 shadow-xs">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-extrabold text-xs sm:text-sm text-stone-900 hidden xs:inline">Learning For Earning</span>
      </div>

      {/* Center Search Bar */}
      <div className="relative flex-1 max-w-md xl:max-w-xl">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-stone-500 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 250)}
            onKeyDown={handleKeyDown}
            placeholder="Search free skills, Python, SEO, design..."
            className="w-full rounded-2xl border border-stone-200/80 bg-white py-2 pl-9 pr-3 text-xs font-medium text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:bg-white focus:outline-hidden shadow-xs transition-all"
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

      {/* Top Right Quick Stats & Account Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Daily Streak (hidden on very small screens) */}
        <div 
          onClick={() => onNavigate('my-topics')}
          title="Daily Learning Streak (Saved on your device)"
          className="hidden md:flex items-center gap-1.5 rounded-2xl bg-white px-2.5 py-1.5 border border-stone-200/80 shadow-xs cursor-pointer hover:border-amber-300 transition-all text-xs font-semibold text-stone-700"
        >
          <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
          <span>{dailyStreak}d</span>
        </div>

        {/* Completed Count (hidden on very small screens) */}
        <div 
          onClick={() => onNavigate('my-topics')}
          title="Completed Free Resources"
          className="hidden sm:flex items-center gap-1.5 rounded-2xl bg-emerald-50 px-2.5 py-1.5 border border-emerald-200/70 shadow-xs cursor-pointer hover:border-emerald-300 transition-all text-xs font-semibold text-emerald-800"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>{completedCount}</span>
        </div>

        {/* Small Login Button or Cloud Sync Indicator */}
        {!isLoggedIn ? (
          <button
            type="button"
            onClick={onOpenLogin}
            title="Login to save your progress on servers"
            className="flex items-center gap-1.5 rounded-xl sm:rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-stone-900 font-bold px-2.5 sm:px-3 py-1.5 text-xs shadow-xs transition-all cursor-pointer"
          >
            <Cloud className="h-3.5 w-3.5 text-stone-900" />
            <span>Login</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onOpenProfile}
            title="Synced with server • Open Profile"
            className="hidden sm:flex items-center gap-1.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold px-2.5 py-1.5 text-xs shadow-2xs transition-all cursor-pointer"
          >
            <Cloud className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold">Synced</span>
          </button>
        )}

        {/* Small Profile Button (Activates after login, prompts login if guest) */}
        <button
          type="button"
          onClick={onOpenProfile}
          title={isLoggedIn ? `Logged in as ${user?.name} (Click to edit profile & skills)` : "Profile activates after login (Click to learn more)"}
          className={`flex items-center gap-1.5 rounded-xl sm:rounded-2xl px-2.5 sm:px-3 py-1.5 text-xs font-semibold shadow-xs transition-all cursor-pointer ${
            isLoggedIn
              ? 'bg-stone-900 hover:bg-stone-800 text-white'
              : 'bg-white hover:bg-stone-100 border border-stone-200/90 text-stone-700'
          }`}
        >
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-stone-900 text-[10px] font-black">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
              <span className="hidden sm:inline max-w-[80px] truncate">{user?.name?.split(' ')[0] || 'Profile'}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-stone-500" />
              <span className="hidden sm:inline">Profile</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" title="Inactive until login"></span>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

