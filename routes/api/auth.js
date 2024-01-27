const express = require("express");

const authControllers = require("../../controllers/auth");
const { validateBodySchema } = require("../../decorators");
const { usersSchemas } = require("../../validators");
const { authenticate, upload } = require("../../middlewares");

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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

router.get("/verify/:verificationToken", authControllers.verification);
router.post(
  "/verify",
  validateBodySchema(usersSchemas.emailSchema),
  authControllers.resendMail
);

module.exports = router;
