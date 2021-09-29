import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 21,
    match: [/^[A-Za-z0-9_-]*$/],
    trim: true,
  },
  about: {
    type: String,
    default: "",
    required: false,
    trim: true,
  },
  admin: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  subscribers: {
    type: [
      {
        type: mongoose.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// methods
communitySchema.methods.getSubscribersCount = async function () {
  return this.subscribers.length;
};

const Community = mongoose.model("Community", communitySchema);

export default Community;
