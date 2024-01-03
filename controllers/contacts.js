const contactsFunctions = require("../models/contacts");
const { httpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getAll = async (req, res, next) => {
  const contacts = await contactsFunctions.listContacts();
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsFunctions.getContactById(contactId);
  if (!contact) {
    throw httpError(404, `Contact with id ${contactId} not found`);
  }
  res.json(contact);
};

const createContact = async (req, res, next) => {
  const body = req.body;
  const newContact = await contactsFunctions.addContact(body);
  res.status(201).json(newContact);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const updateContact = await contactsFunctions.updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!updateContact) {
    throw httpError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json(updateContact);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const deletedContact = await contactsFunctions.removeContact(contactId);
  if (!deletedContact) {
    throw httpError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json(`Contact with id ${contactId} deleted`);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  createContact: ctrlWrapper(createContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
