import React, { useEffect } from 'react';
import { ExternalLink, AlertTriangle, X, Check, ArrowRight } from 'lucide-react';

interface ExternalLinkConfirmModalProps {
  isOpen: boolean;
  targetUrl: string;
  targetTitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ExternalLinkConfirmModal: React.FC<ExternalLinkConfirmModalProps> = ({
  isOpen,
  targetUrl,
  targetTitle,
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key press, confirm on Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  // Format clean domain from targetUrl
  let domain = '';
  try {
    domain = new URL(targetUrl).hostname.replace('www.', '');
  } catch {
    domain = targetUrl;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="external-link-modal-title"
      onClick={onCancel}
    >
      <div 
        className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-stone-200 text-stone-900 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
              <ExternalLink className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                External Link Notice
              </span>
              <h2 id="external-link-modal-title" className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">
                You Are Leaving Our Website
              </h2>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Warning Message */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-stone-900">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm sm:text-base font-bold text-amber-950 leading-snug">
                You are leaving our website and entering an external website.
              </p>
              <p className="text-xs text-stone-600 mt-1">
                All learning, content, accounts, and policies belong directly to the external provider.
              </p>
            </div>
          </div>
        </div>

        {/* Destination Details */}
        <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Destination Platform
          </div>
          {targetTitle && (
            <div className="text-sm font-extrabold text-stone-900 truncate">
              {targetTitle}
            </div>
          )}
          <div className="text-xs font-mono text-amber-800 bg-white px-3 py-1.5 rounded-lg border border-stone-200 truncate flex items-center gap-1.5">
            <span className="shrink-0 font-sans font-semibold text-stone-500">URL:</span>
            <span className="truncate">{targetUrl}</span>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed pt-1">
            Learning For Earning does not own or control third-party content. All learning, privacy policies, and terms apply to the destination provider (<span className="font-semibold text-stone-700">{domain}</span>).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-700 font-bold text-xs sm:text-sm hover:bg-stone-50 transition-colors cursor-pointer"
          >
            No, Stay Here (Cancel)
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-900 font-extrabold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
          >
            <Check className="h-4 w-4 text-stone-900" />
            <span>Yes, Proceed to Website</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
