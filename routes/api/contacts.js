const express = require("express");

const contactsControllers = require("../../controllers/contacts");
const { validateBodySchema } = require("../../decorators");
const { contactsSchemas } = require("../../validators");
const { validateMongoId } = require("../../middlewares");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, contactsControllers.getAll);
router.post(
  "/",
  authenticate,
  validateBodySchema(contactsSchemas.createContactSchema),
  contactsControllers.createContact
);

router.get(
  "/:contactId",
  authenticate,
  validateMongoId,
  contactsControllers.getById
);
router.delete(
  "/:contactId",
  authenticate,
  validateMongoId,
  contactsControllers.deleteById
);
router.put(
  "/:contactId",
  authenticate,
  validateMongoId,
  validateBodySchema(contactsSchemas.createContactSchema),
  contactsControllers.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateMongoId,
  validateBodySchema(contactsSchemas.updateFavorite),
  contactsControllers.updateFavorite
);

module.exports = router;
