import React, { useState } from 'react';
import { 
  Info, 
  CheckCircle2, 
  XCircle, 
  Compass, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const AboutWebsiteNotice: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section 
      aria-label="About This Website"
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-200/90 bg-gradient-to-br from-[#FFFDF8] via-[#FDF8EE] to-[#FBF3E2] p-5 sm:p-7 shadow-[0_4px_24px_rgba(217,119,6,0.06)]"
    >
      {/* Decorative background subtle glow */}
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-amber-200/30 blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-amber-400 text-stone-900 shadow-xs">
            <Compass className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-200/70 px-2.5 py-0.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-950">
                <Sparkles className="h-3 w-3 text-amber-800" />
                Official Guide Notice
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 mt-0.5">
              About This Website
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-white text-xs font-bold text-stone-700 border border-amber-200/80 transition-all cursor-pointer shadow-2xs"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Minimize Note' : 'Read Full Note'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Introductory statement */}
      <div className="mt-4 text-stone-800 text-sm sm:text-base leading-relaxed space-y-2">
        <p className="font-semibold text-stone-900">
          Learning For Earning does not teach skills itself. We do not host courses, videos, lessons, or exams.
        </p>
        <p className="text-stone-700 text-xs sm:text-sm">
          Instead, we act as a guide. For each topic, we carefully select a few of the best free learning websites and show you the direct links, so you can find a trustworthy place to start without searching through thousands of results.
        </p>
      </div>

      {/* Expanded details: What we do vs What we don't do */}
      {isExpanded && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* What we do */}
            <div className="rounded-2xl border border-emerald-200 bg-white/90 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-extrabold text-emerald-950 uppercase tracking-wide">
                  What we do
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                  <span>Collect and organize free learning websites by topic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                  <span>Suggest a clear path, from beginner to advanced, for difficult subjects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                  <span>Show whether each link is fully free, free to audit, or has a free tier</span>
                </li>
              </ul>
            </div>

            {/* What we don't do */}
            <div className="rounded-2xl border border-stone-200 bg-white/90 p-4 sm:p-5 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-100 text-rose-800">
                  <XCircle className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
                  What we don't do
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold shrink-0 mt-0.5">•</span>
                  <span>We do not own, run, or control the websites we link to</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold shrink-0 mt-0.5">•</span>
                  <span>We do not sell courses or certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold shrink-0 mt-0.5">•</span>
                  <span>We do not give personal medical, legal, or financial advice</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer note */}
          <div className="rounded-xl border border-amber-200/80 bg-amber-100/50 p-3.5 sm:p-4 text-xs sm:text-sm text-stone-800 leading-relaxed flex items-start gap-2.5">
            <Info className="h-4 w-4 text-amber-800 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-[13px] font-medium text-amber-950">
              All learning happens on the linked websites. Their content, prices, and terms can change, so please check each website before you begin.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
