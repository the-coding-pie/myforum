import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

// schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: [/^[A-Za-z0-9_-]*$/],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

// before saving a user, create a hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  //   hash password
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
});

// methods
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// model
export const User = mongoose.model("User", userSchema);
