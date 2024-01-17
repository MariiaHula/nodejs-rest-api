const bcrypt = require("bcrypt");
const { envsConfig } = require("../configs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { httpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const { User } = require("../models/user");

const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email is already in use.");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password a invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password a invalid");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, envsConfig.secretKey, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

const current = async (req, res, next) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw httpError(400, "Invalid subscription type");
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!updatedUser) {
    throw httpError(404, "User not found");
  }

  res.status(200).json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const oldPath = req.file.path;

  const filename = `${_id}_${req.file.originalname}`;
  const ext = path.extname(filename);

  if (ext === ".exe") {
    throw httpError(400, "can't save file with extension .exe");
  }

  const newPath = path.join(avatarsDir, filename);

  (await Jimp.read(oldPath)).resize(250, 250).write(newPath);

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.status(200).json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
