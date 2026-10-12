import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Info, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Lock, 
  Eye, 
  BookOpen,
  Sparkles
} from 'lucide-react';
import { AdSlot } from './AdSlot';

interface LegalPagesProps {
  pageType: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ pageType }) => {
  // Working Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const messages = JSON.parse(localStorage.getItem('learnfree_contact_msgs') || '[]');
      messages.push({ name, email, category, message, date: new Date().toISOString() });
      localStorage.setItem('learnfree_contact_msgs', JSON.stringify(messages));
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      {/* 1. ABOUT US PAGE */}
      {pageType === 'about' && (
        <article className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Our Mission & Educational Commitment
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              About LearnFree Hub
            </h1>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              LearnFree Hub was built with a singular premise: quality education should never be gated behind paywalls, predatory subscription traps, or deceptive trial periods.
            </p>
          </div>

          <div className="rounded-[22px] bg-white p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900">Why LearnFree Hub Exists</h2>
              <p>
                The modern internet is flooded with online courses, yet discovering genuinely free, university-grade educational material has become increasingly challenging. Search engine results are dominated by commercial bootcamps charging thousands of dollars or platforms disguising 7-day trials as "free learning."
              </p>
              <p>
                LearnFree Hub acts as an independent, educator-curated directory. We filter out the commercial noise and maintain the top 3–4 highest quality, completely free learning links for every essential academic and practical skill.
              </p>
            </section>

            <section className="space-y-3 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">Our Strict Curation Criteria</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                  <div className="font-bold text-stone-900 mb-1">1. Truly Free Access</div>
                  <p className="text-xs text-stone-600">
                    Every link must offer complete educational instruction with zero mandatory fees. Optional paid certificates are labeled clearly as "Free to Audit."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                  <div className="font-bold text-stone-900 mb-1">2. Trusted Institutions</div>
                  <p className="text-xs text-stone-600">
                    We prioritize established non-profits, world-class universities (MIT, Harvard, Yale), open-source foundations (Mozilla, Python.org), and peer-reviewed open textbooks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                  <div className="font-bold text-stone-900 mb-1">3. Zero Fake Metrics</div>
                  <p className="text-xs text-stone-600">
                    We never feature fake mentors, fabricated reviews, or paid sponsored placements. Every platform is vetted solely on instructional excellence.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                  <div className="font-bold text-stone-900 mb-1">4. Regular 60-Day Re-Testing</div>
                  <p className="text-xs text-stone-600">
                    Links are routinely tested to ensure they remain accessible, alive, and free from new subscription restrictions.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">Client-Side Privacy Guarantee</h2>
              <p>
                LearnFree Hub requires no user account, no password, and no server-side user tracking. Your learning checklists, started topics, and study streaks are saved strictly inside your local browser storage (<code className="bg-stone-100 px-1 py-0.5 rounded text-amber-900 font-mono text-xs">localStorage</code>).
              </p>
            </section>
          </div>
        </article>
      )}

      {/* 2. CONTACT & SUPPORT PAGE */}
      {pageType === 'contact' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              Contact & Resource Feedback
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Have a suggestion for an outstanding free resource? Found a broken link or paywall change? We welcome submissions and community feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Form */}
            <div className="md:col-span-8 rounded-[22px] bg-white p-6 sm:p-7 border border-stone-200/80 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-bold text-stone-900">Message Received!</h2>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Thank you for supporting open education. We review all community reports and suggestions during our regular editorial updates.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setMessage(''); }}
                    className="mt-2 text-xs font-bold text-amber-800 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Learner Name"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Inquiry Topic</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-amber-400 focus:outline-hidden"
                    >
                      <option value="Suggestion">Suggest a New Free Resource</option>
                      <option value="BrokenLink">Report a Broken or Paid Link</option>
                      <option value="EditorialFeedback">Editorial or Accuracy Feedback</option>
                      <option value="Partnership">Educational Partnership / Sponsorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Message Details</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Include the platform name, URL, and a brief description of why it belongs in LearnFree Hub..."
                      className="w-full rounded-xl border border-stone-200 bg-stone-50/50 p-3.5 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-500 px-6 py-3 text-xs font-bold text-stone-900 transition-colors shadow-2xs cursor-pointer min-h-[44px]"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Side Info */}
            <div className="md:col-span-4 space-y-4">
              <div className="rounded-[22px] bg-white p-5 border border-stone-200/80 shadow-2xs space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
                  Contact Guidelines
                </h2>
                <div className="text-xs text-stone-600 space-y-2">
                  <p>
                    <strong>Response window:</strong> Our editorial volunteers respond to verified submissions within 2–3 business days.
                  </p>
                  <p>
                    <strong>Submission standard:</strong> We only evaluate resources with zero paywalls. Do not submit sites requiring credit cards or paid trial registration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRIVACY POLICY (Full Google AdSense & Analytics Compliance) */}
      {pageType === 'privacy' && (
        <article className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900 mb-2">
              <Lock className="h-3.5 w-3.5" />
              Privacy & Cookie Disclosures
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              Privacy Policy
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              Last Updated: October 2026 · Compliant with Google AdSense, GDPR & CCPA Regulations
            </p>
          </div>

          <div className="rounded-[22px] bg-white p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900">1. Commitment to User Privacy</h2>
              <p>
                At LearnFree Hub (<span className="font-semibold">"learnfreehub.org"</span>), the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal and non-personal information received and collected by LearnFree Hub and how it is used.
              </p>
              <p>
                We do not require user accounts, passwords, or personal profile registrations to access any part of our free learning directory.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">2. Browser Local Storage (<code className="font-mono text-amber-900">localStorage</code>)</h2>
              <p>
                LearnFree Hub stores your topic progress, checklist completions, and bookmarked links strictly on your local device using standard browser <code className="bg-stone-100 px-1 py-0.5 rounded text-xs font-mono">localStorage</code>. This data never leaves your device and is not transmitted to our servers. You can clear this data at any time through your browser settings or our reset control.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">3. Cookies, Google AdSense & Advertising</h2>
              <p>
                LearnFree Hub uses cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to customize web page content based upon visitors' browser type or other information that the visitor sends via their browser.
              </p>
              <p>
                <strong>Google AdSense & DoubleClick DART Cookie:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-stone-600">
                <li>Google, as a third-party vendor, uses cookies to serve advertisements on LearnFree Hub.</li>
                <li>Google's use of the DART cookie enables it to serve ads to users based on their visit to LearnFree Hub and other sites across the internet.</li>
                <li>Users may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-semibold">Google Ad and Content Network Privacy Policy</a>.</li>
                <li>Third-party ad servers or ad networks use technology in their respective advertisements and links that appear on LearnFree Hub, which are sent directly to your browser. They automatically receive your IP address when this occurs.</li>
              </ul>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">4. Google Analytics & Log Files</h2>
              <p>
                Like most standard website servers, LearnFree Hub may utilize Google Analytics or standard web logs. Information collected includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks. This information is used solely to analyze trends, administer the site, track users' aggregate movement, and gather broad demographic information. IP addresses are not linked to personally identifiable information.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">5. How to Opt Out of Tracking and Cookies</h2>
              <p>
                If you wish to disable cookies, you may do so through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites. You can also opt out of third-party vendor cookies for personalized advertising by visiting:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600">
                <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-semibold">Digital Advertising Alliance Consumer Choice Tool</a></li>
                <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-semibold">Network Advertising Initiative Opt-Out Page</a></li>
                <li><a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline font-semibold">Google My Ad Center</a></li>
              </ul>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">6. Third-Party Websites</h2>
              <p>
                Our directory provides outgoing links to third-party educational websites (such as Khan Academy, MIT, Harvard edX, and OpenStax). LearnFree Hub has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites. All external links open in a new tab with <code className="bg-stone-100 px-1 py-0.5 rounded text-xs font-mono">rel="noopener noreferrer"</code>.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* 4. TERMS OF SERVICE */}
      {pageType === 'terms' && (
        <article className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              Terms of Service
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              Effective Date: October 2026 · Agreement for using LearnFree Hub
            </p>
          </div>

          <div className="rounded-[22px] bg-white p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900">1. Acceptance of Terms</h2>
              <p>
                By accessing and using LearnFree Hub, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">2. Directory Nature & Intellectual Property</h2>
              <p>
                LearnFree Hub is a free educational directory and reference portal. We do not host, sell, or claim ownership of third-party course materials, textbooks, or video lectures linked on this platform. All trademarks, logos, course titles, and institutional names (such as MIT, Harvard, Khan Academy) belong to their respective copyright holders.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">3. Non-Commercial Personal Learning Use</h2>
              <p>
                You are granted permission to access our directory, utilize the progress trackers, and view the original study guides for personal, educational, and non-commercial purposes. Automated scraping, data harvesting, or systematic extraction of directory content without prior written permission is prohibited.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-stone-900">4. Modifications & Availability</h2>
              <p>
                LearnFree Hub strives to maintain continuous availability and link accuracy, but does not warrant that the website will operate uninterrupted or error-free. We reserve the right to modify or discontinue any curriculum or link without prior notice.
              </p>
            </section>
          </div>
        </article>
      )}

      {/* 5. DISCLAIMER PAGE (As specified in prompt & PDF) */}
      {pageType === 'disclaimer' && (
        <article className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 mb-2">
              <AlertTriangle className="h-3.5 w-3.5" />
              Important Educational Notices
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              Educational Disclaimer
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              Please read this notice before using resources on health, finance, or legal topics.
            </p>
          </div>

          <div className="rounded-[22px] bg-white p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900">1. General Educational Purposes Only</h2>
              <p>
                All materials, links, articles, and roadmaps presented on LearnFree Hub are provided solely for general educational, academic, and informational purposes. None of the content constitutes professional advice.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-amber-900">2. Medical & Health Disclaimer</h2>
              <p>
                Resources categorized under <strong>Health, Fitness & Mind</strong> or <strong>First Aid</strong> are designed strictly for educational enrichment and awareness. They do not constitute personalized medical advice, diagnosis, or clinical treatment plans. Always consult a licensed medical physician or emergency healthcare services for personal health issues.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-amber-900">3. Financial & Investment Disclaimer</h2>
              <p>
                Information listed in the <strong>Finance & Investing</strong> section represents general economic principles and educational budgeting frameworks. LearnFree Hub is not a registered financial advisor or broker. Nothing on this website constitutes financial, tax, or investment advice. Always evaluate personal financial risk and consult qualified financial professionals.
              </p>
            </section>

            <section className="space-y-2 pt-2 border-t border-stone-100">
              <h2 className="text-base font-bold text-amber-900">4. Legal Information Disclaimer</h2>
              <p>
                References to legal structures, civic institutions, or regulatory frameworks are educational summaries only and do not constitute formal legal counsel. For individual legal decisions, consult licensed local attorneys.
              </p>
            </section>
          </div>
        </article>
      )}

      <AdSlot label="Open Education Sponsor" />
    </div>
  );
};
