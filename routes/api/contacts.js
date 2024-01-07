const express = require("express");

const contactsControllers = require("../../controllers/contacts");
const { validateBodySchema } = require("../../decorators");
const { contactsSchemas } = require("../../validators");
const { validateMongoId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsControllers.getAll);
router.post(
  "/",
  validateBodySchema(contactsSchemas.createContactSchema),
  contactsControllers.createContact
);

router.get("/:contactId", validateMongoId, contactsControllers.getById);
router.delete("/:contactId", validateMongoId, contactsControllers.deleteById);
router.put(
  "/:contactId",
  validateMongoId,
  validateBodySchema(contactsSchemas.createContactSchema),
  contactsControllers.updateById
);

router.patch(
  "/:contactId/favorite",
  validateMongoId,
  validateBodySchema(contactsSchemas.updateFavorite),
  contactsControllers.updateFavorite
);

module.exports = router;
