const express = require("express");

const contactsControllers = require("../../controllers/contacts");
const { validateBodySchema } = require("../../decorators");
const { contactsSchemas } = require("../../validators");

const router = express.Router();

router.get("/", contactsControllers.getAll);
router.post(
  "/",
  validateBodySchema(contactsSchemas.createContactSchema),
  contactsControllers.createContact
);

router.get("/:contactId", contactsControllers.getById);
router.delete("/:contactId", contactsControllers.deleteById);
router.put(
  "/:contactId",
  validateBodySchema(contactsSchemas.createContactSchema),
  contactsControllers.updateById
);

module.exports = router;
