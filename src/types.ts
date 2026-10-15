export type AccessType = 'Fully Free' | 'Free to Audit' | 'Free Tier';
export type DifficultyLevel = 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
export type CategoryGroup = 'Technology' | 'Academics' | 'Creative' | 'Business' | 'Life Skills' | 'Universal';
export type PastelColor = 'lavender' | 'peach' | 'sky' | 'mint' | 'butter';

export interface LearningLink {
  id: string;
  title: string;
  url: string;
  platform: string;
  whyBest: string;
  access: AccessType;
  level?: DifficultyLevel;
  format?: 'Course' | 'Interactive' | 'Textbook' | 'Video' | 'Documentation' | 'Practice';
}

export interface SubTopic {
  id: string;
  title: string;
  description?: string;
  links: LearningLink[];
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  icon: string;
  group: CategoryGroup;
  cardColor: PastelColor;
  summary: string;
  howToLearnGuide: string; // 120-200 words original high-value guide for AdSense compliance
  subTopics: SubTopic[];
  totalResources?: number;
}

export interface UniversalPlatform {
  id: string;
  name: string;
  url: string;
  bestFor: string;
  accessBadge: AccessType;
  category: string;
  ratingScore: string;
  learners: string;
}

export interface LearningPathStage {
  stageNumber: number;
  stageName: string;
  skills: string;
  recommendedLink: string;
  level: string;
  studyMethod: string;
}

export interface LearningPath {
  id: string;
  topic: string;
  description: string;
  stages: LearningPathStage[];
}

export interface UserProgress {
  startedTopics: string[]; // category ids
  completedLinks: string[]; // link ids
  bookmarkedLinks: string[]; // link ids
  dailyStreak: number;
  lastActiveDate: string;
  weeklyTarget: number;
}

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface UserSkill {
  id: string;
  name: string;
  level: SkillProficiency;
  category?: string;
  verified?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string; // e.g. "Full Stack Developer", "Digital Marketer"
  bio: string;
  avatarSeed?: string;
  earningGoal: string; // e.g. "$1,000/month", "Freelance Work", "First Remote Job"
  location?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  skills: UserSkill[];
  lastSyncedAt?: string;
  createdAt: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  storageMode: 'local_device' | 'cloud_server';
}

