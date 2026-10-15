import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  BookmarkCheck, 
  Milestone, 
  Compass, 
  Search, 
  Info, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

export type ActivePage = 
  | 'overview' 
  | 'all-topics' 
  | 'topic-detail' 
  | 'my-topics' 
  | 'learning-paths' 
  | 'platforms' 
  | 'search' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'disclaimer';

import { AuthState } from '../types';

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  myTopicsCount: number;
  completedLinksCount: number;
  dailyStreak: number;
  onOpenDeployment?: () => void;
  authState?: AuthState;
  onOpenLogin?: () => void;
  onOpenProfile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  myTopicsCount,
  completedLinksCount,
  dailyStreak,
  authState,
  onOpenLogin,
  onOpenProfile,
}) => {
  const mainNavItems = [
    { id: 'overview' as ActivePage, label: 'Overview', icon: LayoutDashboard },
    { id: 'all-topics' as ActivePage, label: 'All Topics', icon: BookOpen },
    { 
      id: 'my-topics' as ActivePage, 
      label: 'My Topics', 
      icon: BookmarkCheck, 
      badge: myTopicsCount > 0 ? myTopicsCount : undefined 
    },
    { id: 'learning-paths' as ActivePage, label: 'Learning Paths', icon: Milestone },
    { id: 'platforms' as ActivePage, label: 'Top Platforms', icon: Compass },
    { id: 'search' as ActivePage, label: 'Live Search', icon: Search },
  ];

  const infoNavItems = [
    { id: 'about' as ActivePage, label: 'About Us', icon: Info },
    { id: 'contact' as ActivePage, label: 'Contact & Support', icon: Mail },
    { id: 'privacy' as ActivePage, label: 'Privacy & Terms', icon: ShieldCheck },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between shrink-0 bg-white border-r border-stone-200/80 p-5 min-h-screen sticky top-0 h-screen select-none">
      <div>
        {/* Brand Header */}
        <div 
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-3 cursor-pointer group mb-7 px-2"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-sm shadow-amber-300/40 group-hover:scale-105 transition-transform">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight text-stone-900 leading-tight">
              Learning For Earning<span className="text-amber-500">.</span>
            </div>
            <div className="text-[11px] font-semibold text-stone-500 mt-0.5">
              Hub of Free Education
            </div>
          </div>
        </div>

        {/* Section: MAIN MENU */}
        <div className="mb-6">
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Main Menu
          </div>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-stone-900 shadow-sm shadow-amber-300/30'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-stone-900' : 'text-stone-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span 
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-stone-900 text-white' 
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section: SETTINGS & LEGAL */}
        <div className="mb-6">
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-stone-600">
            Directory Info
          </div>
          <nav className="space-y-1">
            {infoNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <Icon className="h-4 w-4 text-stone-600" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Account / Storage Card */}
      {authState && (
        <div className="mb-3 rounded-[18px] bg-stone-50 p-3 border border-stone-200/80">
          {authState.isLoggedIn && authState.user ? (
            <div 
              onClick={onOpenProfile}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-stone-900 font-bold text-xs shrink-0">
                  {authState.user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-600 transition-colors">
                    {authState.user.name}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Synced to Cloud
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-stone-400 group-hover:text-stone-700">Edit</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Device Storage Mode
                </span>
                <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md font-bold">
                  Guest
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-tight mb-2">
                All data is saved locally on your device.
              </p>
              <button
                type="button"
                onClick={onOpenLogin}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold transition-all shadow-2xs"
              >
                <span>Login to sync</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* User Progress Mini Badge */}
      <div className="rounded-[18px] bg-[#FAF8F5] p-3.5 border border-stone-200/80">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-stone-800 flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            {dailyStreak} Day Streak
          </span>
          <span className="text-[11px] font-semibold text-stone-700 flex items-center gap-1">
            <Award className="h-3.5 w-3.5 text-emerald-600" />
            {completedLinksCount} Done
          </span>
        </div>
        <div className="text-[11px] text-stone-600 leading-tight">
          Every resource is 100% free with zero paywalls.
        </div>
      </div>
    </aside>
  );
};
