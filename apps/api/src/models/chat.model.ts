import mongoose, { Schema, Types } from "mongoose";

export interface IChatMessage {
  userId: Types.ObjectId;
  message: string;
  response: string;
  timestamp: Date;
  sessionId: string;
  messageType: "user" | "assistant";
  context?: {
    currentModule?: string;
    userSkills?: string[];
    careerGoals?: string;
  };
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    sessionId: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    context: {
      currentModule: String,
      userSkills: [String],
      careerGoals: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IChatMessage>(
  "ChatMessage",
  ChatMessageSchema
);
