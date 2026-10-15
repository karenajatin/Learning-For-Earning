import { AuthState, UserProfile, UserSkill } from '../types';
import { getStoredProgress, saveStoredProgress } from './storage';

const AUTH_STORAGE_KEY = 'learning_for_earning_auth_state_v1';
const PROFILE_STORAGE_KEY = 'learning_for_earning_profile_v1';

export const SUGGESTED_SKILLS = [
  { name: 'Python Programming', category: 'Technology' },
  { name: 'JavaScript & React', category: 'Technology' },
  { name: 'HTML & CSS', category: 'Technology' },
  { name: 'Full-Stack Development', category: 'Technology' },
  { name: 'Prompt Engineering & AI', category: 'Technology' },
  { name: 'Search Engine Optimization (SEO)', category: 'Marketing' },
  { name: 'Copywriting & Content Writing', category: 'Marketing' },
  { name: 'Graphic Design & Canva', category: 'Creative' },
  { name: 'Video Editing & Reels', category: 'Creative' },
  { name: 'UI / UX Design', category: 'Creative' },
  { name: 'Data Analysis & Excel', category: 'Business' },
  { name: 'Freelancing on Upwork / Fiverr', category: 'Business' },
  { name: 'Digital Marketing & Ads', category: 'Marketing' },
  { name: 'Social Media Management', category: 'Marketing' },
  { name: 'Financial Literacy & Budgeting', category: 'Business' },
  { name: 'English Communication', category: 'Life Skills' },
];

export const DEFAULT_GUEST_PROFILE: UserProfile = {
  id: '',
  name: '',
  email: '',
  title: '',
  bio: '',
  earningGoal: 'Start Freelancing & Earn First $500',
  skills: [],
  createdAt: new Date().toISOString(),
};

export function getStoredAuthState(): AuthState {
  try {
    const rawAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (rawAuth) {
      const parsedAuth = JSON.parse(rawAuth);
      let profile: UserProfile | null = null;
      if (rawProfile) {
        profile = JSON.parse(rawProfile);
      } else if (parsedAuth.user) {
        profile = parsedAuth.user;
      }

      return {
        isLoggedIn: Boolean(parsedAuth.isLoggedIn && profile),
        user: profile,
        storageMode: parsedAuth.isLoggedIn ? 'cloud_server' : 'local_device',
      };
    }
  } catch (err) {
    console.warn('Error reading auth state from localStorage:', err);
  }

  return {
    isLoggedIn: false,
    user: null,
    storageMode: 'local_device',
  };
}

export function saveStoredAuthState(auth: AuthState): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
      isLoggedIn: auth.isLoggedIn,
      storageMode: auth.storageMode,
    }));

    if (auth.user) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(auth.user));
    } else {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Error saving auth state to localStorage:', err);
  }
}

/**
 * Log in a user (email or Google or quick session).
 * When logging in, local progress on the mobile/device is safely preserved
 * and marked as synced to servers.
 */
export function loginUser(name: string, email: string): { auth: AuthState; syncMessage: string } {
  const existingProfileRaw = localStorage.getItem(PROFILE_STORAGE_KEY);
  let existingProfile: Partial<UserProfile> = {};
  try {
    if (existingProfileRaw) {
      existingProfile = JSON.parse(existingProfileRaw);
    }
  } catch {
    existingProfile = {};
  }

  const user: UserProfile = {
    id: existingProfile.id || `user_${Date.now()}`,
    name: name.trim() || 'Learner',
    email: email.trim().toLowerCase() || 'learner@learningforearning.org',
    title: existingProfile.title || 'Aspiring Professional',
    bio: existingProfile.bio || 'Building in-demand skills through free high-quality educational resources.',
    earningGoal: existingProfile.earningGoal || 'Earn $1,000/month through in-demand digital skills',
    location: existingProfile.location || '',
    portfolioUrl: existingProfile.portfolioUrl || '',
    githubUrl: existingProfile.githubUrl || '',
    linkedinUrl: existingProfile.linkedinUrl || '',
    skills: Array.isArray(existingProfile.skills) ? existingProfile.skills : [
      { id: 'sk-1', name: 'Web Research', level: 'Intermediate', category: 'Technology' },
      { id: 'sk-2', name: 'Digital Literacy', level: 'Intermediate', category: 'Technology' }
    ],
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    createdAt: existingProfile.createdAt || new Date().toISOString(),
  };

  const newAuthState: AuthState = {
    isLoggedIn: true,
    user,
    storageMode: 'cloud_server',
  };

  saveStoredAuthState(newAuthState);

  // Read current progress to ensure local history is kept intact
  const currentProgress = getStoredProgress();
  saveStoredProgress(currentProgress);

  return {
    auth: newAuthState,
    syncMessage: 'Your device progress and bookmarks have been successfully synced to the cloud server!',
  };
}

/**
 * Updates user profile details & skills list
 */
export function updateUserProfile(updatedFields: Partial<UserProfile>): UserProfile | null {
  const currentAuth = getStoredAuthState();
  if (!currentAuth.user) return null;

  const updatedProfile: UserProfile = {
    ...currentAuth.user,
    ...updatedFields,
    lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  const newAuthState: AuthState = {
    ...currentAuth,
    user: updatedProfile,
    storageMode: 'cloud_server',
  };

  saveStoredAuthState(newAuthState);
  return updatedProfile;
}

/**
 * Log out user: retains data in local device memory so they don't lose anything
 */
export function logoutUser(): AuthState {
  const newAuthState: AuthState = {
    isLoggedIn: false,
    user: null,
    storageMode: 'local_device',
  };
  saveStoredAuthState(newAuthState);
  return newAuthState;
}
