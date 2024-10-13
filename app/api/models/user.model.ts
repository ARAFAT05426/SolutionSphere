import mongoose, { Document, Schema } from "mongoose";

type IUser = Document & {
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
  status: string;
};

// Define the user schema
const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    default: ""
  },
  username: {
    type: String,
    required: true,
    default: () => `user_${Math.random().toString(36).substring(2, 8)}`
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  status: {
    type: String,
    required: true,
    default: "active"
  }
});

// Check if the User model is already defined
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
