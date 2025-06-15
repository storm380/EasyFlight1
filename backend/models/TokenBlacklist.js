import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: "1h" }, // Automatically delete after 1 hour
});

export default mongoose.model("TokenBlacklist", tokenBlacklistSchema);