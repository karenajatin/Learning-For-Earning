/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActivePage, Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AllTopics } from './components/AllTopics';
import { TopicDetail } from './components/TopicDetail';
import { MyTopics } from './components/MyTopics';
import { SearchView } from './components/SearchView';
import { LearningPathsView } from './components/LearningPathsView';
import { PlatformsView } from './components/PlatformsView';
import { LegalPages } from './components/LegalPages';
import { Footer } from './components/Footer';
import { ReportModal } from './components/ReportModal';
import { ExternalLinkConfirmModal } from './components/ExternalLinkConfirmModal';
import { LoginModal } from './components/LoginModal';
import { ProfileModal } from './components/ProfileModal';
import { CATEGORIES } from './data/learningDirectory';
import { 
  getStoredProgress, 
  toggleTopicStarted, 
  toggleLinkCompleted, 
  toggleBookmark,
  clearAllHistory
} from './utils/storage';
import { 
  getStoredAuthState, 
  loginUser, 
  updateUserProfile, 
  logoutUser 
} from './utils/authStorage';
import { UserProgress, AuthState, UserProfile } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('overview');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('programming-coding');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress);

  // Authentication & Profile state
  const [authState, setAuthState] = useState<AuthState>(getStoredAuthState);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Modals state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState({ title: '', url: '' });
  const [pendingExternalLink, setPendingExternalLink] = useState<{ url: string; title?: string } | null>(null);

  const handleLogin = (name: string, email: string) => {
    const { auth, syncMessage } = loginUser(name, email);
    setAuthState(auth);
    setSyncToast(syncMessage);
    setTimeout(() => setSyncToast(null), 4500);
  };

  const handleUpdateProfile = (updatedFields: Partial<UserProfile>) => {
    const updated = updateUserProfile(updatedFields);
    if (updated) {
      setAuthState(prev => ({ ...prev, user: updated }));
    }
  };

  const handleLogout = () => {
    const newAuth = logoutUser();
    setAuthState(newAuth);
    setSyncToast("Logged out. Your learning progress remains safely saved on this device.");
    setTimeout(() => setSyncToast(null), 4000);
  };

  // Intercept all external link clicks to show confirmation modal
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore local hash, mailto, tel, javascript
      if (
        href.startsWith('#') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Check if it's an external URL
      if (href.startsWith('http://') || href.startsWith('https://')) {
        try {
          const urlObj = new URL(href, window.location.href);
          if (urlObj.origin !== window.location.origin) {
            // Prevent immediate navigation
            e.preventDefault();
            e.stopPropagation();

            const title = 
              anchor.getAttribute('data-link-title') || 
              anchor.getAttribute('title') || 
              anchor.getAttribute('aria-label') || 
              anchor.textContent?.trim() || 
              urlObj.hostname;

            setPendingExternalLink({ url: href, title });
          }
        } catch {
          // If URL parsing fails, let standard navigation happen
        }
      }
    };

    // Capture phase listener to intercept before child handlers or default link clicks
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  const handleConfirmExternalLink = () => {
    if (pendingExternalLink?.url) {
      window.open(pendingExternalLink.url, '_blank', 'noopener,noreferrer');
    }
    setPendingExternalLink(null);
  };

  const handleCancelExternalLink = () => {
    setPendingExternalLink(null);
  };

  // Sync state from storage
  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedCategoryId]);

  const handleSelectTopic = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setActivePage('topic-detail');
  };

  const handleHeaderSearch = (query: string) => {
    setSearchQuery(query);
    setActivePage('search');
  };

  const handleToggleTopic = (categoryId: string) => {
    const updated = toggleTopicStarted(categoryId);
    setProgress(updated);
  };

  const handleToggleLink = (linkId: string) => {
    const { updated } = toggleLinkCompleted(linkId);
    setProgress(updated);
  };

  const handleToggleBookmark = (linkId: string) => {
    const updated = toggleBookmark(linkId);
    setProgress(updated);
  };

  const handleClearAllHistory = () => {
    const blank = clearAllHistory();
    setProgress(blank);
  };

  const handleOpenReportModal = (title: string, url: string) => {
    setReportTarget({ title, url });
    setIsReportOpen(true);
  };

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategoryId) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] flex flex-col font-sans antialiased">
      <div className="flex flex-1 w-full">
        {/* Desktop Left Sidebar (Eduhouse style) */}
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => setActivePage(page)}
          myTopicsCount={progress.startedTopics.length}
          completedLinksCount={progress.completedLinks.length}
          dailyStreak={progress.dailyStreak}
          authState={authState}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onSearchSelect={handleHeaderSearch}
            onNavigate={(page) => setActivePage(page)}
            onSelectTopic={handleSelectTopic}
            dailyStreak={progress.dailyStreak}
            completedCount={progress.completedLinks.length}
            authState={authState}
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
          />

          <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-6 max-w-7xl w-full mx-auto">
            {activePage === 'overview' && (
              <Dashboard
                progress={progress}
                onSelectTopic={handleSelectTopic}
                onNavigateToAllTopics={() => setActivePage('all-topics')}
                onNavigateToPlatforms={() => setActivePage('platforms')}
                onNavigateToMyTopics={() => setActivePage('my-topics')}
                onOpenReportModal={handleOpenReportModal}
              />
            )}

            {activePage === 'all-topics' && (
              <AllTopics
                progress={progress}
                onSelectTopic={handleSelectTopic}
              />
            )}

            {activePage === 'topic-detail' && (
              <TopicDetail
                category={currentCategory}
                progress={progress}
                onBack={() => setActivePage('all-topics')}
                onToggleTopicStarted={handleToggleTopic}
                onToggleLinkCompleted={handleToggleLink}
                onToggleBookmark={handleToggleBookmark}
                onOpenReportModal={handleOpenReportModal}
              />
            )}

            {activePage === 'my-topics' && (
              <MyTopics
                progress={progress}
                onSelectTopic={handleSelectTopic}
                onNavigateToAllTopics={() => setActivePage('all-topics')}
                onToggleTopicStarted={handleToggleTopic}
                onClearAllHistory={handleClearAllHistory}
              />
            )}

            {activePage === 'search' && (
              <SearchView
                progress={progress}
                onSelectTopic={handleSelectTopic}
                onToggleLinkCompleted={handleToggleLink}
                initialQuery={searchQuery}
              />
            )}

            {activePage === 'learning-paths' && (
              <LearningPathsView
                onSelectTopicByTitle={(title) => {
                  const match = CATEGORIES.find(c => c.title.toLowerCase().includes(title.toLowerCase()));
                  if (match) handleSelectTopic(match.id);
                  else setActivePage('all-topics');
                }}
              />
            )}

            {activePage === 'platforms' && (
              <PlatformsView />
            )}

            {(activePage === 'about' ||
              activePage === 'contact' ||
              activePage === 'privacy' ||
              activePage === 'terms' ||
              activePage === 'disclaimer') && (
              <LegalPages pageType={activePage} />
            )}
          </main>

          {/* Footer with legal navigation */}
          <Footer
            onNavigate={(page) => setActivePage(page)}
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (min 44px touch targets) */}
      <BottomNav
        activePage={activePage}
        onNavigate={(page) => setActivePage(page)}
        myTopicsCount={progress.startedTopics.length}
      />

      {/* Modals */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        linkTitle={reportTarget.title}
        linkUrl={reportTarget.url}
      />

      <ExternalLinkConfirmModal
        isOpen={!!pendingExternalLink}
        targetUrl={pendingExternalLink?.url || ''}
        targetTitle={pendingExternalLink?.title}
        onConfirm={handleConfirmExternalLink}
        onCancel={handleCancelExternalLink}
      />

      {/* Cloud Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
        authState={authState}
      />

      {/* Profile & Skills Showcase Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        authState={authState}
        onOpenLogin={() => setIsLoginOpen(true)}
        onUpdateProfile={handleUpdateProfile}
        onLogout={handleLogout}
        dailyStreak={progress.dailyStreak}
        completedCount={progress.completedLinks.length}
        startedCount={progress.startedTopics.length}
      />

      {/* Sync Toast Notification */}
      {syncToast && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-16 lg:bottom-6 right-4 z-50 flex items-center gap-2.5 rounded-2xl bg-stone-900 text-white px-4 py-3 shadow-2xl border border-stone-700 text-xs font-semibold animate-in slide-in-from-bottom duration-300 max-w-sm"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping"></span>
          <span>{syncToast}</span>
        </div>
      )}
    </div>
  );
}
