import CareerPath from "../models/careerpath.model";

export const createCareerPath = async (data: {
  userId: string;
  title: string;
  description: string;
  milestones: any[];
  currentRole: string;
  currentSkills: string[];
  matchPercentage: number;
}) => {
  return CareerPath.create({
    userId: data.userId,
    targetRole: data.title,
    currentRole: data.currentRole,
    description: data.description,
    milestones: data.milestones,
    currentSkills: data.currentSkills,
    matchPercentage: data.matchPercentage,
    status: "active",
    progress: 0,
  });
};

export const getCareerPathsWithProgress = async (userId: string) => {
  return CareerPath.find({ userId }).sort({ createdAt: -1 });
};

export const deleteCareerPathById = async (careerPathId: string, userId: string) => {
  return CareerPath.findOneAndDelete({ _id: careerPathId, userId });
};

export const updateMilestoneStatus = async (
  careerPathId: string,
  milestoneIndex: number,
  completed: boolean
) => {
  const careerPath = await CareerPath.findById(careerPathId);
  if (!careerPath) throw new Error("Not found");
  careerPath.milestones[milestoneIndex].completed = completed;
  const done = careerPath.milestones.filter((m) => m.completed).length;
  careerPath.progress = Math.round((done / careerPath.milestones.length) * 100);
  return careerPath.save();
};

export const updateCareerStatus = async (id: string, status: string) => {
  return CareerPath.findByIdAndUpdate(id, { status }, { new: true });
};

export const refreshCareerProgress = async (id: string, progress: number) => {
  return CareerPath.findByIdAndUpdate(id, { progress }, { new: true });
};