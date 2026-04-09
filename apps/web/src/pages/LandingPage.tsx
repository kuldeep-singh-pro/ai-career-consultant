import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Star,
  Users,
  Map,
  MessageCircle,
  TrendingUp,
  Bookmark,
  Zap,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      title: 'Upload Resume',
      description: 'Drag and drop your resume. Our AI analyzes skills, experience, and career potential instantly.',
      icon: Bookmark,
    },
    {
      title: 'AI Analysis',
      description: 'Get detailed skill assessment, gap analysis, and personalized recommendations for growth.',
      icon: Sparkles,
    },
    {
      title: 'Career Roadmap',
      description: 'Receive a structured, step-by-step career path tailored to your goals and current skills.',
      icon: Map,
    },
  ];

  const featureGrid = [
    {
      title: 'Resume Analyzer',
      description: 'AI-powered analysis of your resume with scoring and improvement suggestions.',
      icon: Bookmark,
    },
    {
      title: 'Skill Gap Detection',
      description: 'Identify missing skills for your target role with priority recommendations.',
      icon: Sparkles,
    },
    {
      title: 'Career Paths',
      description: 'Explore 6+ career tracks: Frontend, Backend, Full Stack, AI Engineer, Data Science, DevOps.',
      icon: Map,
    },
    {
      title: 'Roadmap Generator',
      description: 'Get a structured roadmap from beginner to job-ready with timelines and milestones.',
      icon: TrendingUp,
    },
    {
      title: 'AI Mentor Chat',
      description: 'Chat with your AI mentor for real-time guidance, career advice, and learning tips.',
      icon: MessageCircle,
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning progress, skill development, and career advancement journey.',
      icon: Zap,
    },
  ];

  const careerPaths = [
    { title: 'Frontend Developer', salary: '$80-140K', level: 'Intermediate', skills: 'React, CSS, JavaScript' },
    { title: 'Backend Developer', salary: '$85-150K', level: 'Advanced', skills: 'Node.js, Databases, APIs' },
    { title: 'Full Stack Engineer', salary: '$100-160K', level: 'Advanced', skills: 'Full Stack Tech' },
    { title: 'AI Engineer', salary: '$120-200K', level: 'Very Hard', skills: 'ML, Python, Deep Learning' },
    { title: 'Data Scientist', salary: '$100-170K', level: 'Hard', skills: 'Python, SQL, ML' },
    { title: 'DevOps Engineer', salary: '$95-155K', level: 'Advanced', skills: 'Docker, Kubernetes, AWS' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold">AI Career Consultant</div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <button onClick={() => navigate('/login')} className="rounded-full px-4 py-2 transition hover:bg-slate-100">
              Sign In
            </button>
            <button
              onClick={() => navigate('/register')}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold transition hover:bg-slate-100"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <section className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
            <ShieldCheck className="h-4 w-4" /> Free to get started
          </p>
          <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">Your AI Career Mentor That Builds Your Future</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Upload your resume, detect skill gaps, generate personalized career roadmaps, and chat with your AI mentor for real-time guidance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/register')}
              className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try Demo
            </button>
            <button
              onClick={() => navigate('/login')}
              className="rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Sign In
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" /> 2,000+ students & developers
            </div>
            <div className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 text-slate-400" /> 4.9/5 average rating
            </div>
            <div className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-slate-400" /> Free to get started
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center text-3xl font-semibold">How It Works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center text-3xl font-semibold">Powerful Features</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featureGrid.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center text-3xl font-semibold">What Users Are Saying</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Sarah Chen',
                role: 'Student',
                quote: 'AI Career Consultant helped me identify my skill gaps and created a clear path to becoming a Full Stack Developer. Highly recommended!',
              },
              {
                name: 'Marcus Johnson',
                role: 'Software Engineer',
                quote: 'The roadmap was incredibly detailed and the AI mentor is always available for quick questions. Worth every penny!',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Career Switcher',
                quote: 'I used AI Career Consultant to transition from finance to tech. The skill gap analysis was a game-changer for my preparation.',
              },
            ].map((item) => (
              <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">{item.name[0]}</div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-600">{item.quote}</p>
                <div className="mt-6 flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-center text-3xl font-semibold">Career Paths Available</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {careerPaths.map((path) => (
              <div key={path.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-xl font-semibold">{path.title}</h3>
                <p className="mt-4 text-sm text-slate-500">{path.salary}</p>
                <p className="mt-2 text-sm text-slate-500">{path.level}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{path.skills}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Ready to Transform Your Career?</p>
          <h2 className="mt-4 text-3xl font-semibold">Join thousands of students and developers already using AI Career Consultant to build their futures</h2>
          <button
            onClick={() => navigate('/register')}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Schedule Demo <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-12 text-slate-700">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          <div>
            <p className="font-semibold">AI Career Consultant</p>
            <p className="mt-4 text-sm text-slate-500">Empower your career journey with AI-powered guidance and personalized learning paths.</p>
          </div>
          <div>
            <p className="font-semibold">Product</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>Features</li>
              <li>Pricing</li>
              <li>Security</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Company</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>About</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Resources</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li>Docs</li>
              <li>API</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl px-6 text-center text-sm text-slate-400">© 2026 AI Career Consultant. All rights reserved.</p>
      </footer>
    </div>
  );
};
