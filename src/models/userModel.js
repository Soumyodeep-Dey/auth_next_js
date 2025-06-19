import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true , "Username is required"], 
    unique: true
  },
  email: { 
    type: String, 
    required: [true , "Email is required"], 
    unique: true
  },
  password: { 
    type: String, 
    required: [true , "Password is required"] 
  },
  isVarified: {
    type: Boolean, 
    default: false  // Default value is false
  },
  isAdmin: {
    type: Boolean,
    default: false  // Default value is false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
// This code defines a Mongoose schema and model for a User in a MongoDB database.
// The User model includes fields for username, email, password, and createdAt timestamp.
// The email field is unique to prevent duplicate entries.