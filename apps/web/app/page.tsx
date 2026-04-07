import { Button } from "@repo/ui";
import { ArrowRight, Target, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Target className="h-4 w-4" />
            AI-Powered Career Guidance
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Transform Your Career with
            <br className="hidden sm:block" />
            AI Intelligence
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Get personalized career advice, resume optimization, skill gap analysis, and mentorship from AI-powered tools designed to accelerate your professional growth.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link href="/auth/login">
              <Button size="lg" className="gap-2 px-8">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-center">
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">AI Mentorship</h3>
            <p className="mt-2 text-muted-foreground">
              Connect with AI mentors for personalized career guidance and advice.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 text-center">
            <Target className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Resume Analysis</h3>
            <p className="mt-2 text-muted-foreground">
              Get detailed analysis and optimization suggestions for your resume.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Skill Gap Analysis</h3>
            <p className="mt-2 text-muted-foreground">
              Identify and bridge skill gaps to advance your career goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
