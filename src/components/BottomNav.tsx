import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  BookmarkCheck, 
  Milestone, 
  Search 
} from 'lucide-react';
import { ActivePage } from './Sidebar';

interface BottomNavProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  myTopicsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activePage,
  onNavigate,
  myTopicsCount,
}) => {
  const items = [
    { id: 'overview' as ActivePage, label: 'Overview', icon: LayoutDashboard },
    { id: 'all-topics' as ActivePage, label: 'All Topics', icon: BookOpen },
    { 
      id: 'my-topics' as ActivePage, 
      label: 'My Topics', 
      icon: BookmarkCheck, 
      badge: myTopicsCount > 0 ? myTopicsCount : undefined 
    },
    { id: 'learning-paths' as ActivePage, label: 'Paths', icon: Milestone },
    { id: 'search' as ActivePage, label: 'Search', icon: Search },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 px-2 py-1 shadow-lg"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center min-h-[48px] min-w-[56px] py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-stone-900 font-bold' : 'text-stone-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${isActive ? 'text-amber-500' : 'text-stone-600'}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'text-amber-600 font-bold' : 'text-stone-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
