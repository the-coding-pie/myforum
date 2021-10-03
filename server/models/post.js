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
    enum: ["text", "url"],
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
  comments: {
    type: [
      {
        type: mongoose.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
    default: [],
  },
  upVoters: {
    type: [
      {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    default: [],
  },
  downVoters: {
    type: [
      {
        type: mongoose.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    default: [],
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

postSchema.methods.getCommentsCount = async function () {
  return this.comments.length;
};

const Post = mongoose.model("Post", postSchema);

export default Post;
