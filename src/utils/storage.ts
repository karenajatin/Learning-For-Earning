import { UserProgress } from '../types';

// Bump storage key to v3 so all previous dummy/mock history in user browser is cleared
const STORAGE_KEY = 'learnfree_hub_user_progress_v3';

const DEFAULT_PROGRESS: UserProgress = {
  startedTopics: [],
  completedLinks: [],
  bookmarkedLinks: [],
  dailyStreak: 0,
  lastActiveDate: '',
  weeklyTarget: 5,
};

export function getStoredProgress(): UserProgress {
  try {
    // Clear out any obsolete mock data from previous versions
    if (localStorage.getItem('learnfree_hub_user_progress_v1')) {
      localStorage.removeItem('learnfree_hub_user_progress_v1');
    }
    if (localStorage.getItem('learnfree_hub_user_progress_v2')) {
      localStorage.removeItem('learnfree_hub_user_progress_v2');
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Clean initial state with zero history
      saveStoredProgress(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    return {
      startedTopics: Array.isArray(parsed.startedTopics) ? parsed.startedTopics : [],
      completedLinks: Array.isArray(parsed.completedLinks) ? parsed.completedLinks : [],
      bookmarkedLinks: Array.isArray(parsed.bookmarkedLinks) ? parsed.bookmarkedLinks : [],
      dailyStreak: typeof parsed.dailyStreak === 'number' ? parsed.dailyStreak : 0,
      lastActiveDate: typeof parsed.lastActiveDate === 'string' ? parsed.lastActiveDate : '',
      weeklyTarget: typeof parsed.weeklyTarget === 'number' ? parsed.weeklyTarget : 5,
    };
  } catch (err) {
    console.warn('Failed to load progress from localStorage:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveStoredProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save progress to localStorage:', err);
  }
}

export function clearAllHistory(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('learnfree_hub_user_progress_v1');
    localStorage.removeItem('learnfree_hub_user_progress_v2');
    localStorage.removeItem('learnfree_reports');
    localStorage.removeItem('learnfree_contact_msgs');
    saveStoredProgress(DEFAULT_PROGRESS);
  } catch (err) {
    console.warn('Failed to clear storage:', err);
  }
  return DEFAULT_PROGRESS;
}

export function toggleTopicStarted(categoryId: string): UserProgress {
  const current = getStoredProgress();
  const exists = current.startedTopics.includes(categoryId);
  const updated: UserProgress = {
    ...current,
    startedTopics: exists
      ? current.startedTopics.filter(id => id !== categoryId)
      : [...current.startedTopics, categoryId],
  };
  saveStoredProgress(updated);
  return updated;
}

export function toggleLinkCompleted(linkId: string): { updated: UserProgress; isNowCompleted: boolean } {
  const current = getStoredProgress();
  const exists = current.completedLinks.includes(linkId);
  const today = new Date().toISOString().split('T')[0];
  
  // Update streak if completing a new task today
  let newStreak = current.dailyStreak;
  if (!exists && current.lastActiveDate !== today) {
    newStreak += 1;
  }

  const updated: UserProgress = {
    ...current,
    completedLinks: exists
      ? current.completedLinks.filter(id => id !== linkId)
      : [...current.completedLinks, linkId],
    dailyStreak: newStreak,
    lastActiveDate: today,
  };
  saveStoredProgress(updated);
  return { updated, isNowCompleted: !exists };
}

export function toggleBookmark(linkId: string): UserProgress {
  const current = getStoredProgress();
  const exists = current.bookmarkedLinks.includes(linkId);
  const updated: UserProgress = {
    ...current,
    bookmarkedLinks: exists
      ? current.bookmarkedLinks.filter(id => id !== linkId)
      : [...current.bookmarkedLinks, linkId],
  };
  saveStoredProgress(updated);
  return updated;
}

export function resetProgress(): UserProgress {
  return clearAllHistory();
}

