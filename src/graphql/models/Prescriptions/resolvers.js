import { Prescription } from "../../../db/models/Prescription.js";
import { User } from "../../../db/models/User.js"; // Assuming a User model exists
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

export const createPrescriptionResolver = async (_, { prescription }) => {
  try {
    const userId = prescription.userId; // Convert to ObjectId
    // console.log("userId", userId);
    const userExists = await User.findOne({ userId });
    if (!userExists) {
      throw new Error("User ID does not exist");
    }

    const newPrescription = new Prescription({ ...prescription, userId });
    await newPrescription.save();
    return newPrescription;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editPrescriptionResolver = async (_, { prescription }) => {
  const updatedPrescription = await Prescription.findByIdAndUpdate(
    prescription.id,
    { ...prescription },
    { new: true },
  );
  if (!updatedPrescription) {
    throw new Error("Prescription not found");
  }
  return updatedPrescription;
};

export const deletePrescriptionResolver = async (_, { prescription }) => {
  const deletedPrescription = await Prescription.findByIdAndDelete(
    prescription.id,
  );
  if (!deletedPrescription) {
    throw new Error("Prescription not found");
  }
  return { success: "Prescription deleted successfully" };
};

export const getPrescriptionResolver = async (_, { id, userId, vendorId }) => {
  const filter = { _id: id };
  if (userId) {
    try {
      filter.userId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId
    } catch {
      throw new Error("Invalid User ID format");
    }
  }
  if (vendorId) filter.vendorId = vendorId;

  const prescription = await Prescription.findOne(filter);
  if (!prescription) {
    throw new Error("Prescription not found");
  }
  return prescription;
};

export const getAllPrescriptionsResolver = async (_, { userId, vendorId }) => {
  const filter = {};
  if (userId) {
    try {
      filter.userId = userId; // Convert to ObjectId
    } catch {
      throw new Error("Invalid User ID format");
    }
  }
  if (vendorId) filter.vendorId = vendorId;

  return await Prescription.find(filter);
};
