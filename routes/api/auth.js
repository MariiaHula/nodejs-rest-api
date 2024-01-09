const express = require("express");

const authControllers = require("../../controllers/auth");
const { validateBodySchema } = require("../../decorators");
const { usersSchemas } = require("../../validators");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBodySchema(usersSchemas.registerSchema),
  authControllers.register
);

router.post(
  "/login",
  validateBodySchema(usersSchemas.loginSchema),
  authControllers.login
);

router.post("/logout", authenticate, authControllers.logout);

router.get("/current", authenticate, authControllers.current);

router.patch("/", authenticate, authControllers.updateSubscription);

module.exports = router;
