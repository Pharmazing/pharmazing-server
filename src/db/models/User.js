import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cartId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    contactNumber: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema, "users");
