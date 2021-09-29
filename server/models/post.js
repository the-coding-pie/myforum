import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 300,
    required: true,
    trim: true,
  },
  kind: {
    type: String,
    enum: ["text", "link"],
    default: "text",
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  community: {
    type: mongoose.ObjectId,
    ref: "Community",
    required: true,
  },
  author: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
