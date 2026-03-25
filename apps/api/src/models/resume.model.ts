import { Schema, model, Types } from "mongoose";

export interface IResume {
  userId: Types.ObjectId;
  fileUrl: string;
  extractedText: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    extractedText: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Resume = model<IResume>("Resume", ResumeSchema);