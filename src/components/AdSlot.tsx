import React from 'react';

interface AdSlotProps {
  label?: string;
  className?: string;
  format?: 'banner' | 'in-feed' | 'sidebar';
}

/**
 * Clean container for Google AdSense integration.
 * In production, your Google AdSense code tag is placed inside this container.
 * Styled cleanly so that it does not disrupt the layout when empty or active.
 */
export const AdSlot: React.FC<AdSlotProps> = ({ 
  label = 'Community Sponsor', 
  className = '',
  format = 'in-feed' 
}) => {
  return (
    <div 
      className={`my-6 mx-auto w-full max-w-5xl rounded-[18px] border border-amber-200/50 bg-[#FFFDF9] p-4 text-center transition-all ${className}`}
      aria-label="Advertisement Container"
    >
      {/* Google AdSense Responsive Unit - Learner Community Sponsor Slot */}
      <div className="flex flex-col items-center justify-center min-h-[90px] py-2">
        <span className="text-[11px] font-medium tracking-wider uppercase text-amber-800/60 mb-1">
          {label}
        </span>
        <div className="text-xs text-amber-900/60 max-w-md">
          Learning For Earning is supported by educational community sponsors. All learning resources listed remain 100% free to learners.
        </div>
        {/* Placeholder tag where actual <ins class="adsbygoogle" ...> will render */}
        <div className="mt-2 text-[10px] text-amber-700/40 font-mono tracking-tight">
          [ Ad Space • Responsive Banner ]
        </div>
      </div>
    </div>
  );
};
