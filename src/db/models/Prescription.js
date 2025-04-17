import mongoose, { Schema } from "mongoose";
import { nanoid } from "nanoid";

const medicationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const prescriptionSchema = new mongoose.Schema({
  prescriptionId: {
    type: String,
    required: true,
    default: () => nanoid(16),
    index: { unique: true },
  },
  userId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  medications: {
    type: [medicationSchema],
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "pending", "expired", "cancelled"],
    default: "pending",
    required: true,
  },
  vendorId: {
    type: String,
    required: true,
  },
});

export const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema,
  "prescriptions",
);
