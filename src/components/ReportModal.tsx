import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Send } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkTitle?: string;
  linkUrl?: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  linkTitle = '',
  linkUrl = '',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [reportType, setReportType] = useState('broken-link');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate safe report logging in localStorage
    try {
      const reports = JSON.parse(localStorage.getItem('learnfree_reports') || '[]');
      reports.push({
        type: reportType,
        linkTitle,
        linkUrl,
        details,
        email,
        date: new Date().toISOString(),
      });
      localStorage.setItem('learnfree_reports', JSON.stringify(reports));
    } catch {
      // ignore
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-[20px] bg-white p-6 shadow-xl border border-stone-200">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Thank you!</h3>
            <p className="mt-1 text-sm text-stone-600">
              Your report has been received. Our team regularly tests and verifies all links every 60 days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900">Report Resource / Broken Link</h3>
            </div>

            {linkTitle && (
              <div className="mb-4 rounded-xl bg-amber-50/70 p-3 text-xs text-amber-950 border border-amber-200/50">
                <span className="font-semibold">Resource:</span> {linkTitle}
                {linkUrl && <div className="text-[11px] text-stone-500 truncate mt-0.5">{linkUrl}</div>}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Issue Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs text-stone-800 focus:border-amber-400 focus:outline-hidden"
                >
                  <option value="broken-link">Broken or 404 Link</option>
                  <option value="paywall-detected">Site Now Requires Payment / Subscription</option>
                  <option value="outdated-content">Outdated Content / Discontinued Course</option>
                  <option value="suggest-better">Suggest a Better Free Alternative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Details (Optional)</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us what went wrong or suggest an alternative free URL..."
                  rows={3}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-3 text-xs text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="If you would like confirmation"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-stone-200 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
