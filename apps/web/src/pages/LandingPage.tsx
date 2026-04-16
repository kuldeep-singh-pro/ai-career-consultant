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
  ChevronRight,
  Globe,
  Lock,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      title: 'Upload Resume',
      description: 'Drag and drop your resume. Our AI analyzes skills, experience, and career potential instantly.',
      icon: Bookmark,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'AI Analysis',
      description: 'Get detailed skill assessment, gap analysis, and personalized recommendations for growth.',
      icon: Sparkles,
      color: 'text-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Career Roadmap',
      description: 'Receive a structured, step-by-step career path tailored to your goals and current skills.',
      icon: Map,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20'
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
    { title: 'Frontend Developer', salary: '$80-140K', level: 'Intermediate', skills: 'React, CSS, JavaScript', accent: 'border-b-blue-500' },
    { title: 'Backend Developer', salary: '$85-150K', level: 'Advanced', skills: 'Node.js, Databases, APIs', accent: 'border-b-indigo-500' },
    { title: 'Full Stack Engineer', salary: '$100-160K', level: 'Advanced', skills: 'Full Stack Tech', accent: 'border-b-purple-500' },
    { title: 'AI Engineer', salary: '$120-200K', level: 'Very Hard', skills: 'ML, Python, Deep Learning', accent: 'border-b-rose-500' },
    { title: 'Data Scientist', salary: '$100-170K', level: 'Hard', skills: 'Python, SQL, ML', accent: 'border-b-emerald-500' },
    { title: 'DevOps Engineer', salary: '$95-155K', level: 'Advanced', skills: 'Docker, Kubernetes, AWS', accent: 'border-b-amber-500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Career AI</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 dark:text-slate-400">
              <a href="#" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Pathways</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/login')} className="hidden sm:block text-sm font-black uppercase tracking-widest px-4 py-2 hover:text-blue-600 transition-colors">
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="rounded-xl bg-slate-900 dark:bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white dark:text-slate-900 shadow-xl shadow-slate-900/10 transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        <section className="relative pt-20 pb-16 text-center lg:pt-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 opacity-30 blur-[120px] bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full" />
          
          <div className="mx-auto mb-8 flex max-w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-blue-700 dark:border-blue-900/50 dark:bg-blue-900/20 dark:text-blue-400">
            <ShieldCheck className="h-4 w-4" /> Trusted by 2,000+ developers
          </div>
          
          <h1 className="mx-auto max-w-4xl text-6xl font-black tracking-tight sm:text-7xl lg:text-8xl bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Build Your Future With AI Guidance
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
            The all-in-one platform to upload your resume, detect skill gaps, and generate hyper-personalized career roadmaps powered by Gemini.
          </p>
          
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/register')}
              className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-2xl shadow-blue-500/40 transition-all hover:bg-blue-700 hover:scale-105 active:scale-95"
            >
              Try Demo Now <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-8 py-4 text-sm font-black uppercase tracking-widest transition-all hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 active:scale-95"
            >
              Member Login
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto opacity-60">
            <div className="flex flex-col items-center gap-2">
              <Users className="h-6 w-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Global Community</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="h-6 w-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">4.9/5 User Rating</span>
            </div>
            <div className="hidden md:flex flex-col items-center gap-2">
              <Globe className="h-6 w-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Anytime, Anywhere</span>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">The Workflow</h2>
            <h3 className="text-4xl font-black tracking-tighter sm:text-5xl">How It Works</h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group relative rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-10 shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl">
                  <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-3xl ${item.bg} ${item.color} transition-transform group-hover:rotate-6`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter">{item.title}</h3>
                  <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-32 py-20 bg-slate-900 dark:bg-slate-950 rounded-[3rem] px-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 text-center mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-4">The Toolkit</h2>
            <h3 className="text-4xl font-black tracking-tighter sm:text-5xl">Powerful Features</h3>
          </div>
          <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureGrid.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Market Potential</h2>
            <h3 className="text-4xl font-black tracking-tighter sm:text-5xl">Career Paths Available</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {careerPaths.map((path) => (
              <div key={path.title} className={`group rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-sm transition-all hover:shadow-xl border-b-4 ${path.accent}`}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-black tracking-tighter">{path.title}</h3>
                  <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-400">Salary</span>
                    <span className="text-blue-600">{path.salary}</span>
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-400">Level</span>
                    <span className="text-slate-900 dark:text-white">{path.level}</span>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Core Skills</p>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">{path.skills}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32 relative group overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-20 text-center text-white shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <Zap size={200} />
          </div>
          <p className="relative z-10 text-xs font-black uppercase tracking-[0.4em] text-blue-100">Future Ready</p>
          <h2 className="relative z-10 mt-6 text-4xl font-black tracking-tight sm:text-6xl max-w-4xl mx-auto">
            Ready to Transform Your Professional Journey?
          </h2>
          <p className="relative z-10 mt-8 text-blue-100 max-w-xl mx-auto font-medium">
            Join thousands of developers leveling up their careers with real-time AI mentorship and automated roadmaps.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="relative z-10 mt-12 inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-sm font-black uppercase tracking-widest text-blue-600 shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Start Your Journey <ArrowRight className="h-5 w-5" />
          </button>
        </section>
      </main>

      <footer className="mt-32 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase">Career AI</span>
            </div>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Next-generation career guidance platform. Analyzing millions of data points to build your roadmap to the top.
            </p>
            <div className="mt-8 flex gap-4">
              <div className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Globe size={18} className="text-slate-400" />
              </div>
              <div className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Lock size={18} className="text-slate-400" />
              </div>
            </div>
          </div>
          <div>
            <p className="font-black text-xs uppercase tracking-widest mb-6">Product</p>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Analyzer</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Roadmaps</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">AI Mentor</li>
            </ul>
          </div>
          <div>
            <p className="font-black text-xs uppercase tracking-widest mb-6">Company</p>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Research</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>
          <div>
            <p className="font-black text-xs uppercase tracking-widest mb-6">Legal</p>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Terms</li>
              <li className="hover:text-blue-600 cursor-pointer transition-colors">Safety</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-7xl px-6 border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">© 2026 AI Career Consultant</p>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-400">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">GitHub</span>
          </div>
        </div>
      </footer>
    </div>
  );
};