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
import { CATEGORIES } from './data/learningDirectory';
import { 
  getStoredProgress, 
  toggleTopicStarted, 
  toggleLinkCompleted, 
  toggleBookmark,
  clearAllHistory
} from './utils/storage';
import { UserProgress } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('overview');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('programming-coding');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress);

  // Modals state
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState({ title: '', url: '' });

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
        />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onSearchSelect={handleHeaderSearch}
            onNavigate={(page) => setActivePage(page)}
            onSelectTopic={handleSelectTopic}
            dailyStreak={progress.dailyStreak}
            completedCount={progress.completedLinks.length}
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
    </div>
  );
}
