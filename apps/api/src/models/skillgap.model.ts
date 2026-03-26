import mongoose, { Schema, Types } from "mongoose";

export interface ISkillGap {

  userId: Types.ObjectId;

  targetRole: string;

  currentSkills: string[];

  missingSkills: string[];

  matchPercentage: number;

  learningPlan: {
    skill: string;
    priority: string;
    weeks: number;
  }[];

}

const SkillGapSchema = new Schema<ISkillGap>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    targetRole: {
      type: String,
      required: true
    },

    currentSkills: [String],

    missingSkills: [String],

    matchPercentage: Number,

    learningPlan: [
      {
        skill: String,
        priority: String,
        weeks: Number
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<ISkillGap>(
  "SkillGap",
  SkillGapSchema
);