import React from 'react';
import { 
  BookmarkCheck, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Flame, 
  RotateCcw,
  Sparkles,
  Trash2,
  Smartphone,
  Cloud
} from 'lucide-react';
import { Category, UserProgress } from '../types';
import { CATEGORIES } from '../data/learningDirectory';
import { AdSlot } from './AdSlot';

interface MyTopicsProps {
  progress: UserProgress;
  onSelectTopic: (categoryId: string) => void;
  onNavigateToAllTopics: () => void;
  onToggleTopicStarted: (categoryId: string) => void;
  onClearAllHistory?: () => void;
}

export const MyTopics: React.FC<MyTopicsProps> = ({
  progress,
  onSelectTopic,
  onNavigateToAllTopics,
  onToggleTopicStarted,
  onClearAllHistory,
}) => {
  const startedCategories = CATEGORIES.filter(cat => 
    progress.startedTopics.includes(cat.id)
  );

  const totalLinksAcrossStarted = startedCategories
    .flatMap(c => c.subTopics.flatMap(s => s.links));
  
  const totalCompletedInStarted = totalLinksAcrossStarted
    .filter(l => progress.completedLinks.includes(l.id));

  const overallPercent = totalLinksAcrossStarted.length > 0
    ? Math.round((totalCompletedInStarted.length / totalLinksAcrossStarted.length) * 100)
    : 0;

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all history and reset progress to 0?')) {
      if (onClearAllHistory) {
        onClearAllHistory();
      }
    }
  };

  const pastelCardStyles = {
    lavender: 'bg-[#F0EEFF] border-[#E0DAFE] text-[#2D2A4A] bar-[#7C5CFC]',
    peach: 'bg-[#FFF0E8] border-[#FED7C7] text-[#4A2B20] bar-[#FF6B4A]',
    sky: 'bg-[#EAF5FF] border-[#CCE7FF] text-[#1E3A5F] bar-[#2A85FF]',
    mint: 'bg-[#EDF9F1] border-[#CEF0D8] text-[#1B3E26] bar-[#22C55E]',
    butter: 'bg-[#FEF9E6] border-[#FDEEB3] text-[#463814] bar-[#EAB308]',
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              My Learning Dashboard
            </h1>
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
              <BookmarkCheck className="h-3.5 w-3.5" />
              {startedCategories.length} Active
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            Track your ongoing skill journeys, checklist accomplishments, and weekly study streak.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {onClearAllHistory && (progress.startedTopics.length > 0 || progress.completedLinks.length > 0 || progress.dailyStreak > 0) && (
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-stone-200 px-3.5 py-2.5 text-xs font-bold text-stone-600 hover:text-red-600 hover:border-red-200 transition-colors shadow-2xs cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear History</span>
            </button>
          )}

          <button
            onClick={onNavigateToAllTopics}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-bold text-stone-900 hover:bg-amber-500 transition-colors shadow-2xs cursor-pointer"
          >
            <BookOpen className="h-4 w-4" />
            <span>Add More Topics</span>
          </button>
        </div>
      </div>

      {/* Device Storage Status Notice */}
      <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-3.5 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 text-xs text-stone-700">
          <div className="h-7 w-7 rounded-lg bg-amber-200/80 flex items-center justify-center text-amber-900 shrink-0">
            <Smartphone className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-stone-900">Device Local Storage Active: </span>
            Your learning progress is saved safely on your device. Click the <span className="font-semibold text-amber-900">Login</span> button in the top navigation bar anytime to backup your progress to our servers and activate your skills profile!
          </div>
        </div>
      </div>

      {/* Progress Metric Summary Row (4 metrics including streak) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-[20px] bg-white p-5 border border-stone-200 shadow-2xs">
          <div className="text-stone-500 text-xs font-semibold">Topics In Progress</div>
          <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono">
            {startedCategories.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Active subjects</div>
        </div>

        <div className="rounded-[20px] bg-white p-5 border border-stone-200 shadow-2xs">
          <div className="text-stone-500 text-xs font-semibold">Completed Resources</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
            {progress.completedLinks.length}
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Free lessons marked Done</div>
        </div>

        <div className="rounded-[20px] bg-white p-5 border border-stone-200 shadow-2xs">
          <div className="text-stone-500 text-xs font-semibold">Study Streak</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 font-mono flex items-center gap-1">
            <Flame className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span>{progress.dailyStreak} Days</span>
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Consecutive active days</div>
        </div>

        <div className="rounded-[20px] bg-white p-5 border border-stone-200 shadow-2xs">
          <div className="text-stone-500 text-xs font-semibold">Overall Completion</div>
          <div className="text-2xl font-extrabold text-stone-800 mt-1 font-mono">
            {overallPercent}%
          </div>
          <div className="text-[11px] text-stone-400 mt-0.5">Across active curricula</div>
        </div>
      </div>

      {/* Topics List or Empty State */}
      {startedCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {startedCategories.map((cat) => {
            const allLinks = cat.subTopics.flatMap(s => s.links);
            const completedCount = allLinks.filter(l => progress.completedLinks.includes(l.id)).length;
            const percent = allLinks.length > 0 ? Math.round((completedCount / allLinks.length) * 100) : 0;
            const themeClass = pastelCardStyles[cat.cardColor] || pastelCardStyles.lavender;

            return (
              <div
                key={cat.id}
                className={`relative flex flex-col justify-between rounded-[22px] p-6 border ${themeClass} shadow-xs hover:shadow-md transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80 text-stone-700">
                      {cat.group}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleTopicStarted(cat.id);
                      }}
                      title="Remove from My Topics"
                      className="text-stone-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-extrabold tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-700/85 line-clamp-2 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
                      <span>{completedCount} of {allLinks.length} links Done</span>
                      <span className="font-mono">{percent}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-black/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectTopic(cat.id)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-stone-50 py-2.5 text-xs font-bold text-stone-900 border border-black/10 shadow-2xs transition-colors cursor-pointer"
                  >
                    <span>Resume Learning</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[22px] bg-white p-12 text-center border border-stone-200/80 shadow-2xs space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <Sparkles className="h-7 w-7" />
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-bold text-stone-900">No active topics yet</h2>
            <p className="mt-1 text-xs text-stone-500 leading-relaxed">
              Browse our directory of 22+ topics, click "Start This Topic" on any subject that interests you, and your study progress will appear here.
            </p>
          </div>
          <button
            onClick={onNavigateToAllTopics}
            className="rounded-xl bg-amber-400 px-6 py-3 text-xs font-extrabold text-stone-900 hover:bg-amber-500 transition-colors shadow-sm"
          >
            Explore Directory & Pick a Skill
          </button>
        </div>
      )}

      {/* AdSlot */}
      <AdSlot label="Educational Community Partner" />
    </div>
  );
};
