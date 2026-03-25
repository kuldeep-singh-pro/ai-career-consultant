import mongoose, { Schema, Document } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: string;
  type: "verify" | "reset";
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    otp: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["verify", "reset"],
      required: true,
      index: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }
    }
  },
  {
    timestamps: true
  }
);

export const OTP = mongoose.model<IOTP>("OTP", otpSchema);