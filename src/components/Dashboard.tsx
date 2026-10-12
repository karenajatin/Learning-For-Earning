import React from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Compass, 
  Layers, 
  Code2, 
  Globe, 
  Binary, 
  Atom, 
  Languages, 
  Palette, 
  TrendingUp, 
  ShieldCheck, 
  HeartHandshake,
  Monitor,
  FileSpreadsheet,
  Brain,
  Wrench,
  GraduationCap
} from 'lucide-react';
import { Category, UniversalPlatform, UserProgress } from '../types';
import { CATEGORIES, UNIVERSAL_PLATFORMS } from '../data/learningDirectory';
import { AdSlot } from './AdSlot';

interface DashboardProps {
  progress: UserProgress;
  onSelectTopic: (categoryId: string) => void;
  onNavigateToAllTopics: () => void;
  onNavigateToPlatforms: () => void;
  onNavigateToMyTopics: () => void;
  onOpenReportModal: (title: string, url: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onSelectTopic,
  onNavigateToAllTopics,
  onNavigateToPlatforms,
  onNavigateToMyTopics,
}) => {
  const hasStartedTopics = progress.startedTopics.length > 0;

  // Determine user current topics (or starter suggestions if none started)
  const activeCategoryIds = hasStartedTopics
    ? progress.startedTopics.slice(0, 3)
    : ['web-development', 'programming-coding', 'mathematics'];

  const currentCategories = activeCategoryIds
    .map(id => CATEGORIES.find(c => c.id === id))
    .filter(Boolean) as Category[];

  // Calculate completion percentage for a category
  const getCategoryProgress = (category: Category) => {
    const allLinks = category.subTopics.flatMap(s => s.links);
    if (allLinks.length === 0) return 0;
    const completedInCat = allLinks.filter(l => progress.completedLinks.includes(l.id)).length;
    return Math.round((completedInCat / allLinks.length) * 100);
  };

  // Pastel card color mappings matching screenshot
  const pastelStyles = {
    lavender: {
      bg: 'bg-[#F0EEFF]',
      border: 'border-[#E0DAFE]',
      text: 'text-[#2E2554]',
      badge: 'bg-[#E3DEFC] text-[#3D2E7A]',
      progressBg: 'bg-[#DDD5FB]',
      progressBar: 'bg-[#7C5CFC]',
    },
    peach: {
      bg: 'bg-[#FFF0E8]',
      border: 'border-[#FED7C7]',
      text: 'text-[#4A2518]',
      badge: 'bg-[#FDDBCF] text-[#7A3622]',
      progressBg: 'bg-[#FDD5C6]',
      progressBar: 'bg-[#FF6B4A]',
    },
    sky: {
      bg: 'bg-[#EAF5FF]',
      border: 'border-[#CCE7FF]',
      text: 'text-[#16324F]',
      badge: 'bg-[#D2EAFF] text-[#1D4A7A]',
      progressBg: 'bg-[#CBE4FD]',
      progressBar: 'bg-[#2A85FF]',
    },
    mint: {
      bg: 'bg-[#EDF9F1]',
      border: 'border-[#CEF0D8]',
      text: 'text-[#1B3E26]',
      badge: 'bg-[#D2F2DC] text-[#225C37]',
      progressBg: 'bg-[#CBF0D6]',
      progressBar: 'bg-[#22C55E]',
    },
    butter: {
      bg: 'bg-[#FEF9E6]',
      border: 'border-[#FDEEB3]',
      text: 'text-[#463814]',
      badge: 'bg-[#FDF0BE] text-[#695217]',
      progressBg: 'bg-[#FCEBB8]',
      progressBar: 'bg-[#EAB308]',
    },
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Globe': return Globe;
      case 'Binary': return Binary;
      case 'Atom': return Atom;
      case 'Languages': return Languages;
      case 'Palette': return Palette;
      case 'TrendingUp': return TrendingUp;
      case 'Monitor': return Monitor;
      case 'FileSpreadsheet': return FileSpreadsheet;
      case 'Brain': return Brain;
      case 'Wrench': return Wrench;
      case 'GraduationCap': return GraduationCap;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-7 pb-16">
      {/* 1. Welcoming Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              Welcome to LearnFree Hub 👋
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Every resource is manually vetted, 100% free to learn from, and verified against paywalls. Zero subscriptions, zero fake reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToAllTopics}
            className="flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2.5 text-xs font-bold text-stone-900 shadow-sm shadow-amber-300/40 hover:bg-amber-500 transition-all cursor-pointer"
          >
            <span>Explore All 22+ Topics</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. Top Carousel / "Course in Progress" (matching visual reference screenshot) */}
      <section aria-labelledby="current-topics-heading">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <h2 id="current-topics-heading" className="text-base sm:text-lg font-bold text-stone-900">
              {hasStartedTopics ? 'Your Current Topics' : 'Featured Topics to Start'}
            </h2>
            <span className="text-[11px] font-semibold text-stone-500">
              ({progress.startedTopics.length} started)
            </span>
          </div>
          {hasStartedTopics ? (
            <button
              onClick={onNavigateToMyTopics}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors flex items-center gap-1"
            >
              View My Topics
              <ArrowRight className="h-3 w-3" />
            </button>
          ) : (
            <button
              onClick={onNavigateToAllTopics}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors flex items-center gap-1"
            >
              Browse All Topics
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* 4 Cards Grid (3 pastel category cards + 1 Yellow Progress Goal Card like screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {currentCategories.map((cat) => {
            const styles = pastelStyles[cat.cardColor] || pastelStyles.lavender;
            const percentage = getCategoryProgress(cat);
            const totalLinks = cat.subTopics.flatMap(s => s.links).length;
            const completedCount = cat.subTopics.flatMap(s => s.links).filter(l => progress.completedLinks.includes(l.id)).length;
            const Icon = getCategoryIcon(cat.icon);
            const isCategoryStarted = progress.startedTopics.includes(cat.id);

            return (
              <div
                key={cat.id}
                className={`relative flex flex-col justify-between rounded-[20px] p-5 border ${styles.bg} ${styles.border} shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer`}
                onClick={() => onSelectTopic(cat.id)}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
                      {cat.group}
                    </span>
                    <div className="p-1.5 rounded-xl bg-white/70 backdrop-blur-xs text-stone-800">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className={`text-base font-extrabold tracking-tight ${styles.text} line-clamp-1`}>
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-700/85 line-clamp-2 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/5">
                  {isCategoryStarted ? (
                    <>
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-stone-800">
                        <span className="text-[11px] font-semibold text-stone-600">Progress</span>
                        <span className="font-mono">{percentage}%</span>
                      </div>
                      <div className={`h-2 w-full rounded-full overflow-hidden ${styles.progressBg}`}>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${styles.progressBar}`}
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        />
                      </div>
                      <div className="mt-2 text-[10px] text-stone-500 font-medium flex justify-between">
                        <span>{completedCount} of {totalLinks} free links completed</span>
                        <span className="text-stone-700 font-semibold group-hover:underline">Continue →</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-semibold text-stone-600">
                        {totalLinks} Curated Links
                      </span>
                      <span className="text-xs font-extrabold text-amber-800 group-hover:underline flex items-center gap-1">
                        Start Topic →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* 4th Card: "Your Progress / Free Mission" Card (Matches the piggy bank card in screenshot) */}
          <div className="relative flex flex-col justify-between rounded-[20px] p-5 border border-amber-200 bg-gradient-to-br from-[#FFF9E6] to-[#FFF3CC] shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900">
                  {hasStartedTopics ? 'Active Learner' : 'Start Fresh'}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-amber-400 text-stone-900">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>

              <h3 className="text-base font-extrabold tracking-tight text-amber-950">
                100% Free Forever
              </h3>
              <p className="mt-1 text-xs text-amber-900/80 leading-relaxed">
                {hasStartedTopics
                  ? 'Zero fees, no trial expiration, and no subscription traps.'
                  : 'All 22+ domains are 100% free with zero paywalls. Pick a topic to track.'}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-white/70 p-2 text-xs border border-amber-200/50">
                <span className="text-amber-900 font-medium">Resources Done</span>
                <span className="font-extrabold text-stone-900 font-mono text-sm">
                  {progress.completedLinks.length}
                </span>
              </div>

              <button
                onClick={hasStartedTopics ? onNavigateToMyTopics : onNavigateToAllTopics}
                className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{hasStartedTopics ? 'Track My Learning' : 'Explore All Topics'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Placement 1 */}
      <AdSlot label="Educational Community Partner" />

      {/* 3. Bottom Two-Column Split (Popular Categories + Top Platforms) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Popular Categories (4 cols on lg) */}
        <section 
          aria-labelledby="popular-categories-heading"
          className="lg:col-span-5 rounded-[20px] bg-white p-5 md:p-6 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 id="popular-categories-heading" className="text-base font-bold text-stone-900">
              Popular Categories
            </h2>
            <button
              onClick={onNavigateToAllTopics}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900"
            >
              See All
            </button>
          </div>

          <div className="space-y-2.5">
            {CATEGORIES.slice(0, 6).map((cat) => {
              const Icon = getCategoryIcon(cat.icon);
              const totalLinks = cat.subTopics.flatMap(s => s.links).length;
              const isStarted = progress.startedTopics.includes(cat.id);

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectTopic(cat.id)}
                  className="group flex items-center justify-between p-3 rounded-2xl border border-stone-100 hover:border-amber-200 bg-stone-50/50 hover:bg-amber-50/40 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-2xs group-hover:scale-105 transition-transform text-amber-600 border border-stone-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-stone-900 group-hover:text-amber-900">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {cat.subTopics.length} Sub-topics · {totalLinks} free links
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isStarted && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    )}
                    <span className="text-stone-300 group-hover:text-amber-600 transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Top Free Platforms (7 cols on lg - replaces Top Mentors as requested) */}
        <section 
          aria-labelledby="top-platforms-heading"
          className="lg:col-span-7 rounded-[20px] bg-white p-5 md:p-6 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="top-platforms-heading" className="text-base font-bold text-stone-900">
                Top Universal Platforms
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                The world's most trusted platforms with full-access free tiers
              </p>
            </div>
            <button
              onClick={onNavigateToPlatforms}
              className="text-xs font-semibold text-amber-800 hover:text-amber-900"
            >
              View Directory
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {UNIVERSAL_PLATFORMS.slice(0, 6).map((plat) => (
              <div
                key={plat.id}
                className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 font-extrabold text-sm border border-amber-100">
                    {plat.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs font-bold text-stone-900">
                        {plat.name}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        plat.accessBadge === 'Fully Free'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                      }`}>
                        {plat.accessBadge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                      {plat.bestFor}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 mt-1">
                      <span>{plat.category}</span>
                      <span>·</span>
                      <span className="text-amber-700 font-semibold">{plat.ratingScore}</span>
                      <span>·</span>
                      <span>{plat.learners}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 sm:self-center">
                  <a
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-stone-900 transition-colors shadow-2xs"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Directory Quick Facts Bar */}
      <section className="rounded-[20px] bg-stone-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-stone-800 px-3 py-1 text-xs text-amber-400 font-semibold">
            <HeartHandshake className="h-3.5 w-3.5" />
            No Paywalls • No Subscriptions • Open Access
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
            Curated by Educators, Built for Lifelong Learners
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
            We scour thousands of online course catalogues, university syllabi, and open textbook repositories to keep only the 3–4 highest quality free resources per skill.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={onNavigateToAllTopics}
            className="rounded-xl bg-amber-400 hover:bg-amber-500 px-5 py-3 text-xs font-extrabold text-stone-900 transition-all shadow-sm"
          >
            Browse All Subjects
          </button>
        </div>
      </section>
    </div>
  );
};
