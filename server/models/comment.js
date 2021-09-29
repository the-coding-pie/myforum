import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true
  },
  commentator: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentShcema);

export default Comment;
