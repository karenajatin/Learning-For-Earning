import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Sparkles, 
  Cloud, 
  Plus, 
  Trash2, 
  Check, 
  Share2, 
  LogOut, 
  Briefcase, 
  Globe, 
  Github, 
  Linkedin, 
  Flame, 
  Award,
  BookOpen,
  Smartphone
} from 'lucide-react';
import { AuthState, UserProfile, UserSkill, SkillProficiency } from '../types';
import { SUGGESTED_SKILLS } from '../utils/authStorage';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  authState: AuthState;
  onOpenLogin: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
  dailyStreak: number;
  completedCount: number;
  startedCount: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  authState,
  onOpenLogin,
  onUpdateProfile,
  onLogout,
  dailyStreak,
  completedCount,
  startedCount,
}) => {
  const { isLoggedIn, user } = authState;

  // Form states for profile editing
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [earningGoal, setEarningGoal] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [skills, setSkills] = useState<UserSkill[]>([]);

  // New skill addition state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillProficiency>('Intermediate');
  const [isCopied, setIsCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setTitle(user.title || 'Aspiring Professional');
      setBio(user.bio || '');
      setEarningGoal(user.earningGoal || 'Start earning $500+/month with high-income skills');
      setPortfolioUrl(user.portfolioUrl || '');
      setGithubUrl(user.githubUrl || '');
      setLinkedinUrl(user.linkedinUrl || '');
      setSkills(user.skills || []);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  // 1. LOCKED STATE (User is not logged in)
  if (!isLoggedIn || !user) {
    return (
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="profile-locked-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      >
        <div 
          className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-stone-200 overflow-hidden text-center p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Locked Badge */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-inner">
            <Lock className="h-8 w-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            Profile Inactive
          </span>

          <h2 id="profile-locked-title" className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-snug">
            Profile Activates After Login
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
            To build your personal profile, display your custom skills showcase, and link your portfolio, please log in so your profile can be saved directly on our servers.
          </p>

          {/* Friendly Guidance Box */}
          <div className="mt-5 rounded-2xl bg-stone-50 p-4 border border-stone-200/80 text-left space-y-2 text-xs text-stone-700">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <Smartphone className="h-4 w-4 text-emerald-600" />
              <span>Your Current Device Status:</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-normal">
              You can freely browse all links and topics without logging in. Your {completedCount} completed links and {dailyStreak}-day streak are stored locally on your device right now.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99]"
            >
              <Cloud className="h-4 w-4 text-stone-900" />
              <span>Login to save your progress on servers</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-2xl text-stone-600 hover:bg-stone-100 font-medium text-xs transition-colors"
            >
              Continue Browsing as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE PROFILE STATE (User is logged in)
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase());
    if (exists) return;

    const newSkill: UserSkill = {
      id: `skill_${Date.now()}`,
      name: newSkillName.trim(),
      level: newSkillLevel,
    };

    setSkills([...skills, newSkill]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      name,
      title,
      bio,
      earningGoal,
      portfolioUrl,
      githubUrl,
      linkedinUrl,
      skills,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleCopyProfile = () => {
    const skillList = skills.map(s => `${s.name} (${s.level})`).join(', ');
    const shareText = `Candidate Profile: ${name}\nTitle: ${title}\nCareer Goal: ${earningGoal}\nKey Skills: ${skillList || 'General Web Literacy'}\nLearning For Earning Directory Verified Learner.`;
    navigator.clipboard.writeText(shareText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getLevelBadgeClass = (level: SkillProficiency) => {
    switch (level) {
      case 'Expert': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Advanced': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Intermediate': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-sky-100 text-sky-800 border-sky-200';
    }
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-stone-200 my-8 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-5 sm:p-6 shrink-0 relative flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-amber-400 text-stone-900 flex items-center justify-center font-black text-lg shadow-md">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="profile-title" className="text-base sm:text-lg font-bold text-white">
                  {name || 'Learner Profile'}
                </h2>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Server Active
                </span>
              </div>
              <p className="text-xs text-stone-400">{user.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close profile"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Progress Overview Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200/80">
            <div className="text-center p-2 rounded-xl bg-white border border-stone-200/60 shadow-2xs">
              <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-bold mb-0.5">
                <Flame className="h-3.5 w-3.5 fill-amber-500" />
                <span>Streak</span>
              </div>
              <div className="text-base font-extrabold text-stone-900">{dailyStreak} Days</div>
            </div>

            <div className="text-center p-2 rounded-xl bg-white border border-stone-200/60 shadow-2xs">
              <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-bold mb-0.5">
                <Award className="h-3.5 w-3.5" />
                <span>Finished</span>
              </div>
              <div className="text-base font-extrabold text-stone-900">{completedCount} Links</div>
            </div>

            <div className="text-center p-2 rounded-xl bg-white border border-stone-200/60 shadow-2xs">
              <div className="flex items-center justify-center gap-1 text-sky-600 text-xs font-bold mb-0.5">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Active</span>
              </div>
              <div className="text-base font-extrabold text-stone-900">{startedCount} Topics</div>
            </div>
          </div>

          {/* Section: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-stone-500" />
              Personal & Career Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-xl border border-stone-200 bg-white py-2 px-3 text-xs font-medium text-stone-800 focus:border-amber-400 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Career Title / Headline</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Frontend Developer & Freelancer"
                  className="w-full rounded-xl border border-stone-200 bg-white py-2 px-3 text-xs font-medium text-stone-800 focus:border-amber-400 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-amber-600" />
                Earning Goal
              </label>
              <input
                type="text"
                value={earningGoal}
                onChange={(e) => setEarningGoal(e.target.value)}
                placeholder="e.g. Earn $1,000/month freelancing on Upwork / Fiverr"
                className="w-full rounded-xl border border-stone-200 bg-white py-2 px-3 text-xs font-medium text-stone-800 focus:border-amber-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Bio / About Me</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of your learning journey and services you want to provide..."
                className="w-full rounded-xl border border-stone-200 bg-white py-2 px-3 text-xs font-medium text-stone-800 focus:border-amber-400 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Section: Skills Showcase ("ema user potani profile banavi sake ane potani skills batavi sake") */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  Skills Showcase ({skills.length})
                </h3>
                <p className="text-[11px] text-stone-500">
                  Highlight the skills you are learning or offering for earning.
                </p>
              </div>
            </div>

            {/* Existing Skills List */}
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs ${getLevelBadgeClass(skill.level)}`}
                  >
                    <span>{skill.name}</span>
                    <span className="text-[10px] font-bold opacity-80">({skill.level})</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="opacity-60 hover:opacity-100 hover:text-rose-600 transition-opacity ml-1"
                      title="Remove skill"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-200 p-4 text-center text-xs text-stone-500">
                No skills added yet. Add your first skill below or choose from popular suggestions!
              </div>
            )}

            {/* Add New Skill Input */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Enter skill (e.g. Python, SEO, React, Canva)..."
                className="flex-1 rounded-xl border border-stone-200 bg-white py-2 px-3 text-xs font-medium text-stone-800 focus:border-amber-400 focus:outline-hidden"
              />

              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as SkillProficiency)}
                className="rounded-xl border border-stone-200 bg-white py-2 px-3 text-xs font-medium text-stone-800 focus:border-amber-400 focus:outline-hidden"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>

              <button
                type="button"
                onClick={handleAddSkill}
                disabled={!newSkillName.trim()}
                className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Quick Skill Suggestions */}
            <div>
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                Suggested High-Income Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_SKILLS.slice(0, 8).map((sug) => {
                  const isAdded = skills.some(s => s.name.toLowerCase() === sug.name.toLowerCase());
                  return (
                    <button
                      key={sug.name}
                      type="button"
                      disabled={isAdded}
                      onClick={() => {
                        setSkills([
                          ...skills,
                          {
                            id: `skill_${Date.now()}_${Math.random()}`,
                            name: sug.name,
                            level: 'Intermediate',
                            category: sug.category,
                          }
                        ]);
                      }}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        isAdded
                          ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-default'
                          : 'bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border-stone-200'
                      }`}
                    >
                      + {sug.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section: Links & Portfolio */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Portfolio & Social Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="Portfolio URL"
                  className="w-full rounded-xl border border-stone-200 bg-white py-1.5 pl-8 pr-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-hidden"
                />
              </div>

              <div className="relative">
                <Github className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="GitHub URL"
                  className="w-full rounded-xl border border-stone-200 bg-white py-1.5 pl-8 pr-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-hidden"
                />
              </div>

              <div className="relative">
                <Linkedin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="LinkedIn URL"
                  className="w-full rounded-xl border border-stone-200 bg-white py-1.5 pl-8 pr-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-stone-50 border-t border-stone-200/80 p-4 sm:p-5 shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyProfile}
              className="flex items-center gap-1.5 py-2 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold shadow-2xs transition-all"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{isCopied ? 'Summary Copied!' : 'Copy Skills Card'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-1.5 py-2 px-3 rounded-xl hover:bg-rose-50 text-stone-500 hover:text-rose-600 text-xs font-medium transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                <Check className="h-4 w-4" />
                Saved to Servers!
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveProfile}
              className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs shadow-md transition-all active:scale-[0.99]"
            >
              <Cloud className="h-4 w-4 text-stone-900" />
              <span>Save Profile to Server</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
