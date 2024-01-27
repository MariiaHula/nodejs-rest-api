const Joi = require("joi");

const validateEmailRegex = /^\S+@\S+\.\S+$/;

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().pattern(validateEmailRegex).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().pattern(validateEmailRegex).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(validateEmailRegex).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  emailSchema,
};
