import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    skills: [
      {
        name: String,
        level: String,
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
      },
    ],
  },
  { timestamps: true }
);

export const Resume = mongoose.model(
  "Resume",
  resumeSchema
);