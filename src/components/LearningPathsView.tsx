import React, { useState } from 'react';
import { 
  Milestone, 
  ExternalLink, 
  CheckCircle2, 
  Compass, 
  ArrowRight, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { LEARNING_PATHS } from '../data/learningDirectory';
import { AdSlot } from './AdSlot';

interface LearningPathsViewProps {
  onSelectTopicByTitle: (title: string) => void;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  onSelectTopicByTitle,
}) => {
  const [activePathId, setActivePathId] = useState<string>(LEARNING_PATHS[0].id);

  const currentPath = LEARNING_PATHS.find(p => p.id === activePathId) || LEARNING_PATHS[0];

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
            Step-by-Step Learning Paths
          </h1>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
            Guided Roadmap
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          For deep, complex subjects, following the proper learning order prevents overwhelm. Start at Stage 1 and master each tier before moving forward.
        </p>
      </div>

      {/* Path Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border border-stone-200/80 shadow-2xs">
        {LEARNING_PATHS.map((path) => (
          <button
            key={path.id}
            onClick={() => setActivePathId(path.id)}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              activePathId === path.id
                ? 'bg-amber-400 text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
            }`}
          >
            {path.topic}
          </button>
        ))}
      </div>

      {/* Active Path Card */}
      <div className="rounded-[22px] bg-white p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
            Structured Sequential Curriculum
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            {currentPath.topic} Master Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {currentPath.description}
          </p>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-4 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-stone-200/80">
          {currentPath.stages.map((stage) => (
            <div
              key={stage.stageNumber}
              className="relative flex items-start gap-4 pl-2"
            >
              {/* Circle stage badge */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-xs font-black text-stone-900 shadow-2xs border-2 border-white">
                {stage.stageNumber}
              </div>

              {/* Stage content box */}
              <div className="flex-1 rounded-2xl bg-stone-50/70 p-4 sm:p-5 border border-stone-100 hover:border-amber-200 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="text-sm font-extrabold text-stone-900">
                    {stage.stageName}
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600 self-start sm:self-auto">
                    Level: {stage.level}
                  </span>
                </div>

                <div className="text-xs text-stone-700 mb-2">
                  <strong className="text-stone-900">Core Subtopics & Skills:</strong> {stage.skills}
                </div>

                <div className="rounded-xl bg-amber-50/60 p-3 text-xs text-amber-950 border border-amber-200/50 mb-3">
                  <span className="font-bold">Suggested Study Method:</span> {stage.studyMethod}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={stage.recommendedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white hover:bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 border border-stone-200 shadow-2xs transition-colors"
                  >
                    <span>Recommended Starting Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdSlot label="Educational Community Partner" />
    </div>
  );
};
