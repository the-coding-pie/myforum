import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  commentator: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.ObjectId,
    ref: "Post",
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
