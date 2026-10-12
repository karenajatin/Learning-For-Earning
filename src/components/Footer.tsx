import React from 'react';
import { Sparkles, Heart, Shield, Lock, ExternalLink, HelpCircle } from 'lucide-react';
import { ActivePage } from './Sidebar';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenDeployment?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 border-t border-stone-200/80 bg-white py-12 px-4 sm:px-8 text-stone-600">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
          <div>
            <div 
              onClick={() => onNavigate('overview')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-stone-900 font-black text-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-extrabold text-stone-900 tracking-tight">
                Learning For Earning
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500 max-w-sm">
              The premier free learning directory connecting students, professionals, and adults to the world's finest open educational resources.
            </p>
          </div>

          {/* Quick Legal Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-stone-600">
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Contact & Report
            </button>
            <button 
              onClick={() => onNavigate('privacy')} 
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate('terms')} 
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button 
              onClick={() => onNavigate('disclaimer')} 
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Educational Disclaimer
            </button>
          </div>
        </div>

        {/* Bottom Attribution & Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            © {new Date().getFullYear()} Learning For Earning. All recommended third-party course materials and trademarks belong to their respective institutions.
          </div>
          <div className="flex items-center gap-1.5 text-stone-600">
            <span>Built for open lifelong learning</span>
            <span>·</span>
            <span className="text-emerald-700 font-semibold">100% Free Forever</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
