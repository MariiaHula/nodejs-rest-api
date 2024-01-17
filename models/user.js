const { Schema, model } = require("mongoose");

const { handleMoongooseError } = require("../helpers");

const validateEmailRegex = /^\S+@\S+\.\S+$/;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: validateEmailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.post("save", handleMoongooseError);

const User = model("user", usersSchema);

module.exports = {
  User,
};
