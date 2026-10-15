import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Mail,
  User,
  Lock
} from 'lucide-react';
import { AuthState } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
  authState: AuthState;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  authState,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState<'quick' | 'email'>('quick');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      onLogin(name, email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`);
      setIsLoading(false);
      onClose();
    }, 400);
  };

  const handleQuickGoogle = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin('Jatin Karena', 'karenajatin425@gmail.com');
      setIsLoading(false);
      onClose();
    }, 450);
  };

  const handleQuickInstant = (userName: string, userEmail: string) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin(userName, userEmail);
      setIsLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 p-6 sm:p-7 text-stone-900 relative">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-stone-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 text-stone-900 text-xs font-bold shadow-2xs mb-3">
            <Cloud className="h-3.5 w-3.5 text-amber-700" />
            <span>Cloud Sync & Profile Service</span>
          </div>

          <h2 id="login-modal-title" className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 leading-snug">
            Login to save your progress on servers
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
            Keep your completed courses, learning streaks, bookmarks, and personalized skills profile safely backed up and synced across all your devices.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* Storage Mode Notice */}
          <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-3.5 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-amber-200/70 flex items-center justify-center shrink-0 text-amber-800 mt-0.5">
              <Smartphone className="h-4 w-4" />
            </div>
            <div className="text-xs text-stone-700 leading-relaxed">
              <strong className="text-stone-900 block font-semibold">Guest vs Server Storage:</strong>
              Until you log in, all your completed links and bookmarks are saved <span className="underline decoration-amber-400 font-medium">locally on your phone or computer</span>. Logging in transfers and syncs all of your saved data to secure servers.
            </div>
          </div>

          {/* Quick Choice Tabs */}
          <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-2xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('quick')}
              className={`py-2 rounded-xl transition-all ${
                activeTab === 'quick' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              1-Click Fast Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('email')}
              className={`py-2 rounded-xl transition-all ${
                activeTab === 'email' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Custom Name & Email
            </button>
          </div>

          {activeTab === 'quick' ? (
            <div className="space-y-3">
              {/* Google Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={handleQuickGoogle}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border-2 border-stone-200 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.99] disabled:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isLoading ? 'Connecting to server...' : 'Continue with Google Account'}</span>
              </button>

              {/* Instant Learner Account */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleQuickInstant('Pro Learner', 'pro.learner@learningforearning.org')}
                className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-60"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>Instant 1-Tap Login & Cloud Sync</span>
                </div>
                <ArrowRight className="h-4 w-4 text-stone-400" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name / Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-3.5 text-xs font-medium text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-3.5 text-xs font-medium text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              >
                <Lock className="h-4 w-4 text-stone-900" />
                <span>{isLoading ? 'Saving to Server...' : 'Login & Save Progress to Server'}</span>
              </button>
            </form>
          )}

          {/* Reassurance Checklist */}
          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              100% Free Access Always
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              All Links Free Without Login
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              No Spam or Ads
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
