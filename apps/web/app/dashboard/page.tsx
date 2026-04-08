"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Button } from "@repo/ui";
import { Badge } from "@repo/ui";
import { Target, FileText, TrendingUp, Users, Plus, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { dashboardService, DashboardStats } from "../../lib/services/dashboard";

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardService.getStats,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to load dashboard</h3>
            <p className="text-gray-600 mb-4">Please try refreshing the page or contact support if the problem persists.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Career Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your career progress and get personalized recommendations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resume Analysis</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.resume.hasResume ? `${stats.resume.skillsCount} skills` : "Not analyzed"}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.resume.lastAnalyzed
                  ? `Last analyzed ${new Date(stats.resume.lastAnalyzed).toLocaleDateString()}`
                  : "Upload your resume to get started"
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skill Gap</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.skillGap.hasAnalysis ? `${stats.skillGap.matchPercentage}%` : "Not analyzed"}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.skillGap.missingSkillsCount
                  ? `${stats.skillGap.missingSkillsCount} skills to improve`
                  : "Complete skill assessment"
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Career Paths</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.career.totalPaths || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.career.activePaths || 0} active, {stats?.career.completedPaths || 0} completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentor Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.mentor.totalConversations || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.mentor.lastConversation
                  ? `Last session ${new Date(stats.mentor.lastConversation).toLocaleDateString()}`
                  : "Start your first conversation"
                }
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Upload Resume</h3>
                  <p className="text-sm text-muted-foreground">Get AI-powered analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Skill Assessment</h3>
                  <p className="text-sm text-muted-foreground">Identify gaps and strengths</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Find Mentor</h3>
                  <p className="text-sm text-muted-foreground">Connect with experts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>{stats?.career.overallProgress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats?.career.overallProgress || 0}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resource Completion</span>
                    <span>{stats?.career.resourceProgress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats?.career.resourceProgress || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/resume/upload">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Resume
                  </Button>
                </Link>
                <Link href="/career/create">
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="h-4 w-4 mr-2" />
                    Create Career Path
                  </Button>
                </Link>
                <Link href="/mentor/chat">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Chat with Mentor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}