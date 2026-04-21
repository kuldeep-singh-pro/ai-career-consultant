import { Types } from "mongoose";
import { ResumeAnalysis } from "../models/resume.analysis";
import SkillGap from "../models/skillgap.model";
import CareerPath from "../models/careerpath.model";
import ChatMessage from "../models/chat.model";
import Settings from "../models/setting.model";

export const getDashboardStats = async (
  userId: Types.ObjectId | string
) => {
  const latestResume = await ResumeAnalysis.findOne({
    userId,
  })
    .sort({ createdAt: -1 })
    .lean();

  let latestSkillGap = null;

  if (latestResume) {
    latestSkillGap = await SkillGap.findOne({
      userId,
      resumeId: latestResume.resumeId,
    })
      .sort({ createdAt: -1 })
      .lean();
  }

  const careerPaths = await CareerPath.find({
    userId,
  }).lean();

  const recentChats = await ChatMessage.find({
    userId,
  })
    .sort({ timestamp: -1 })
    .limit(5)
    .lean();

  const settings = await Settings.findOne({
    userId,
  }).lean();

  const activeCareerPaths = careerPaths.filter(
    (cp) => cp.status === "active"
  );

  const completedCareerPaths = careerPaths.filter(
    (cp) => cp.status === "completed"
  );

  const totalMilestones = careerPaths.reduce(
    (acc, cp) => acc + cp.milestones.length,
    0
  );

  const completedMilestones = careerPaths.reduce(
    (acc, cp) =>
      acc +
      cp.milestones.filter((m) => m.completed)
        .length,
    0
  );

  const totalResources = careerPaths.reduce(
    (acc, cp) =>
      acc + cp.learningResources.length,
    0
  );

  const completedResources = careerPaths.reduce(
    (acc, cp) =>
      acc +
      cp.learningResources.filter(
        (r) => r.completed
      ).length,
    0
  );

  const overallProgress =
    totalMilestones > 0
      ? Math.round(
          (completedMilestones /
            totalMilestones) *
            100
        )
      : 0;

  const resourceProgress =
    totalResources > 0
      ? Math.round(
          (completedResources /
            totalResources) *
            100
        )
      : 0;

  return {
    resume: {
      hasResume: !!latestResume,
      skillsCount:
        latestResume?.skills?.length || 0,
      lastAnalyzed:
        latestResume?.createdAt || null,
    },

    skillGap: {
      hasAnalysis: !!latestSkillGap,
      matchPercentage:
        latestSkillGap?.matchPercentage || 0,
      missingSkillsCount:
        latestSkillGap?.missingSkills
          ?.length || 0,
      lastAnalyzed:
        latestSkillGap?.createdAt || null,
    },

    career: {
      totalPaths: careerPaths.length,
      activePaths:
        activeCareerPaths.length,
      completedPaths:
        completedCareerPaths.length,
      overallProgress,
      resourceProgress,
    },

    mentor: {
      totalConversations:
        recentChats.length,
      lastConversation:
        recentChats[0]?.timestamp ||
        null,
    },

    settings: {
      isConfigured: !!settings,
      theme:
        settings?.preferences?.theme ||
        "auto",
    },
  };
};

export const getDashboardOverview =
  async (
    userId:
      | Types.ObjectId
      | string
  ) => {
    const stats =
      await getDashboardStats(
        userId
      );

    const recentPaths =
      await CareerPath.find({
        userId,
      })
        .sort({ updatedAt: -1 })
        .limit(3)
        .lean();

    const recentSkillGaps =
      await SkillGap.find({
        userId,
      })
        .sort({ createdAt: -1 })
        .limit(2)
        .lean();

    const recentChats =
      await ChatMessage.find({
        userId,
      })
        .sort({ timestamp: -1 })
        .limit(3)
        .lean();

    return {
      stats,
      recentActivity: {
        careerPaths:
          recentPaths.map(
            (cp) => ({
              id: cp._id,
              title: `${cp.currentRole} → ${cp.targetRole}`,
              progress:
                cp.progress,
              status: cp.status,
              updatedAt:
                cp.updatedAt,
            })
          ),

        skillGaps:
          recentSkillGaps.map(
            (sg) => ({
              id: sg._id,
              targetRole:
                sg.targetRole,
              matchPercentage:
                sg.matchPercentage,
              createdAt:
                sg.createdAt,
            })
          ),

        chats:
          recentChats.map(
            (chat) => ({
              id: chat._id,
              message:
                chat.message.substring(
                  0,
                  50
                ) + "...",
              timestamp:
                chat.timestamp,
            })
          ),
      },
    };
  };

export const getProgressAnalytics =
  async (
    userId:
      | Types.ObjectId
      | string
  ) => {
    const careerPaths =
      await CareerPath.find({
        userId,
      }).lean();

    const progressData =
      careerPaths.map(
        (cp) => ({
          pathId: cp._id,
          title: `${cp.currentRole} → ${cp.targetRole}`,
          progress:
            cp.progress,
          milestonesCompleted:
            cp.milestones.filter(
              (m) =>
                m.completed
            ).length,
          milestonesTotal:
            cp.milestones.length,
          resourcesCompleted:
            cp.learningResources.filter(
              (r) =>
                r.completed
            ).length,
          resourcesTotal:
            cp.learningResources
              .length,
          status: cp.status,
          startDate:
            cp.startDate,
          estimatedDuration:
            cp.estimatedDuration,
        })
      );

    const overallStats = {
      totalPaths:
        careerPaths.length,
      activePaths:
        careerPaths.filter(
          (cp) =>
            cp.status ===
            "active"
        ).length,
      completedPaths:
        careerPaths.filter(
          (cp) =>
            cp.status ===
            "completed"
        ).length,
      averageProgress:
        progressData.length > 0
          ? Math.round(
              progressData.reduce(
                (
                  acc,
                  p
                ) =>
                  acc +
                  p.progress,
                0
              ) /
                progressData.length
            )
          : 0,
    };

    return {
      progressData,
      overallStats,
    };
  };

export const getSkillAnalytics =
  async (
    userId:
      | Types.ObjectId
      | string
  ) => {
    const latestResume =
      await ResumeAnalysis.findOne(
        {
          userId,
        }
      )
        .sort({
          createdAt: -1,
        })
        .lean();

    let latestSkillGap =
      null;

    if (latestResume) {
      latestSkillGap =
        await SkillGap.findOne(
          {
            userId,
            resumeId:
              latestResume.resumeId,
          }
        )
          .sort({
            createdAt: -1,
          })
          .lean();
    }

    const careerPaths =
      await CareerPath.find({
        userId,
      }).lean();

    const currentSkills =
      latestResume?.skills ||
      [];

    const missingSkills =
      latestSkillGap
        ?.missingSkills || [];

    const requiredSkills =
      latestSkillGap
        ?.missingSkills || [];

    const allCareerSkills =
      careerPaths.flatMap(
        (cp) => [
          ...cp.currentSkills,
          ...cp.requiredSkills,
          ...cp.milestones.flatMap(
            (m) => m.skills
          ),
        ]
      );

    const uniqueSkills = [
      ...new Set([
        ...currentSkills,
        ...allCareerSkills,
      ]),
    ];

    return {
      currentSkills:
        currentSkills.length,
      requiredSkills:
        requiredSkills.length,
      missingSkills:
        missingSkills.length,
      totalUniqueSkills:
        uniqueSkills.length,
      skillCategories: {
        current:
          currentSkills,
        required:
          requiredSkills,
        missing:
          missingSkills,
      },
    };
  };