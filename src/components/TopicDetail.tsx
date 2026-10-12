import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  CheckCircle2, 
  PlusCircle, 
  BookOpen, 
  Flag, 
  Sparkles, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';
import { Category, LearningLink, UserProgress } from '../types';
import { AdSlot } from './AdSlot';

interface TopicDetailProps {
  category: Category;
  progress: UserProgress;
  onBack: () => void;
  onToggleTopicStarted: (categoryId: string) => void;
  onToggleLinkCompleted: (linkId: string) => void;
  onToggleBookmark: (linkId: string) => void;
  onOpenReportModal: (title: string, url: string) => void;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({
  category,
  progress,
  onBack,
  onToggleTopicStarted,
  onToggleLinkCompleted,
  onToggleBookmark,
  onOpenReportModal,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const isStarted = progress.startedTopics.includes(category.id);
  const allLinks = category.subTopics.flatMap(st => st.links);
  const completedLinksInCat = allLinks.filter(l => progress.completedLinks.includes(l.id));
  const progressPercent = allLinks.length > 0 
    ? Math.round((completedLinksInCat.length / allLinks.length) * 100) 
    : 0;

  const handleLinkDoneClick = (linkId: string) => {
    const isCurrentlyDone = progress.completedLinks.includes(linkId);
    onToggleLinkCompleted(linkId);

    // If marking as done, fire celebratory confetti
    if (!isCurrentlyDone) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899'],
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${category.title} – Free Learning Guide`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const pastelThemes = {
    lavender: 'bg-[#F0EEFF] border-[#E0DAFE] text-[#2D2A4A]',
    peach: 'bg-[#FFF0E8] border-[#FED7C7] text-[#4A2B20]',
    sky: 'bg-[#EAF5FF] border-[#CCE7FF] text-[#1E3A5F]',
    mint: 'bg-[#EDF9F1] border-[#CEF0D8] text-[#1B3E26]',
    butter: 'bg-[#FEF9E6] border-[#FDEEB3] text-[#463814]',
  };

  const badgeTheme = pastelThemes[category.cardColor] || pastelThemes.lavender;

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-stone-700 border border-stone-200/80 shadow-2xs hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Topics</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-stone-600 border border-stone-200/80 shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copiedLink ? 'Copied URL!' : 'Share'}</span>
          </button>

          <button
            onClick={() => onToggleTopicStarted(category.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm cursor-pointer min-h-[44px] ${
              isStarted
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200'
                : 'bg-amber-400 text-stone-900 hover:bg-amber-500 shadow-amber-300/40'
            }`}
          >
            {isStarted ? (
              <>
                <Check className="h-4 w-4" />
                <span>Topic In Progress</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                <span>Start This Topic</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Topic Hero Card */}
      <div className={`rounded-[22px] p-6 sm:p-8 border ${badgeTheme} shadow-sm`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 text-stone-800 shadow-2xs">
                {category.group}
              </span>
              <span className="text-xs text-stone-600 font-medium">
                {category.subTopics.length} Sub-topics · {allLinks.length} Free Resources
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {category.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed">
              {category.summary}
            </p>
          </div>

          {/* Overall Progress Meter */}
          <div className="rounded-2xl bg-white/80 p-4 border border-black/5 min-w-[200px] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5 text-stone-800">
              <span className="text-stone-600">Your Progress</span>
              <span className="font-mono text-sm">{progressPercent}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-black/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-stone-600 font-medium">
              {completedLinksInCat.length} of {allLinks.length} completed
            </div>
          </div>
        </div>
      </div>

      {/* Original Written "How To Learn This" Educational Guide (Google AdSense Required Original Content) */}
      <section 
        aria-labelledby="how-to-learn-heading"
        className="rounded-[20px] bg-white p-6 sm:p-7 border border-amber-200/80 shadow-2xs space-y-3"
      >
        <div className="flex items-center gap-2.5 text-amber-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h2 id="how-to-learn-heading" className="text-sm sm:text-base font-extrabold tracking-tight">
              Curator Study Guide: How to Learn {category.title}
            </h2>
            <p className="text-[11px] text-stone-500">
              Evidence-based study methodology written by educators
            </p>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal bg-stone-50/60 p-4 rounded-xl border border-stone-100">
          <p>{category.howToLearnGuide}</p>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
          <GraduationCap className="h-3.5 w-3.5 text-amber-600" />
          <span>Curator Tip: Work through one sub-topic at a time and mark each completed link below to keep track of your progress.</span>
        </div>
      </section>

      {/* AdSense In-Article Slot */}
      <AdSlot label="Curriculum Sponsor" />

      {/* Sub-Topics & Curated Links */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
          <span>Curated Free Resources by Sub-Topic</span>
          <span className="text-xs font-normal text-stone-500">
            (Strictly 3–4 best free links per section)
          </span>
        </h2>

        {category.subTopics.map((subTopic, subIdx) => (
          <section
            key={subTopic.id}
            aria-labelledby={`subtopic-heading-${subTopic.id}`}
            className="rounded-[20px] bg-white p-5 sm:p-6 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          >
            <div className="mb-4 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-[11px] font-extrabold text-amber-800">
                  {subIdx + 1}
                </span>
                <h3 id={`subtopic-heading-${subTopic.id}`} className="text-base font-bold text-stone-900">
                  {subTopic.title}
                </h3>
              </div>
              {subTopic.description && (
                <p className="mt-1 text-xs text-stone-500 pl-8">
                  {subTopic.description}
                </p>
              )}
            </div>

            {/* Links Stack */}
            <div className="space-y-3">
              {subTopic.links.map((link) => {
                const isCompleted = progress.completedLinks.includes(link.id);
                const isBookmarked = progress.bookmarkedLinks.includes(link.id);

                return (
                  <div
                    key={link.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${
                      isCompleted
                        ? 'bg-emerald-50/40 border-emerald-200/70'
                        : 'bg-stone-50/40 border-stone-100 hover:border-amber-200 hover:bg-amber-50/20'
                    }`}
                  >
                    {/* Link Info */}
                    <div className="space-y-1 sm:max-w-xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-xs sm:text-sm text-stone-900">
                          {link.title}
                        </span>
                        
                        {/* Access Badge */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          link.access === 'Fully Free'
                            ? 'bg-emerald-100 text-emerald-800'
                            : link.access === 'Free to Audit'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {link.access}
                        </span>

                        {link.level && (
                          <span className="text-[10px] font-medium text-stone-500">
                            {link.level}
                          </span>
                        )}

                        {link.format && (
                          <span className="text-[10px] font-medium text-stone-400">
                            · {link.format}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed">
                        <strong className="text-stone-700">Why it's best:</strong> {link.whyBest}
                      </p>

                      <div className="text-[11px] text-stone-500">
                        Platform: <span className="font-medium text-stone-700">{link.platform}</span>
                      </div>
                    </div>

                    {/* Actions: Done tick button + Visit button + Bookmark + Report */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200/50 justify-between sm:justify-end">
                      {/* Done Toggle Button (Min 44px touch target on mobile) */}
                      <button
                        onClick={() => handleLinkDoneClick(link.id)}
                        className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold min-h-[44px] transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-stone-200 text-stone-700 hover:border-emerald-400 hover:text-emerald-700'
                        }`}
                        aria-label={`Mark ${link.title} as completed`}
                      >
                        <CheckCircle2 className={`h-4 w-4 ${isCompleted ? 'text-white' : 'text-stone-400'}`} />
                        <span>{isCompleted ? 'Done ✓' : 'Mark Done'}</span>
                      </button>

                      {/* Visit Link (External in new tab) */}
                      <a
                        href={link.url}
                        data-link-title={link.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-4 py-2 text-xs font-bold text-stone-900 min-h-[44px] transition-colors shadow-2xs"
                      >
                        <span>Visit</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>

                      {/* Bookmark Icon */}
                      <button
                        onClick={() => onToggleBookmark(link.id)}
                        title={isBookmarked ? 'Remove Bookmark' : 'Bookmark this link'}
                        className={`p-2.5 rounded-xl border min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors ${
                          isBookmarked 
                            ? 'bg-amber-50 border-amber-300 text-amber-700' 
                            : 'bg-white border-stone-200 text-stone-400 hover:text-stone-700'
                        }`}
                      >
                        {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      </button>

                      {/* Report Broken Link button */}
                      <button
                        onClick={() => onOpenReportModal(link.title, link.url)}
                        title="Report broken or changed link"
                        className="p-2.5 rounded-xl text-stone-400 hover:text-red-500 hover:bg-stone-50 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                      >
                        <Flag className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
