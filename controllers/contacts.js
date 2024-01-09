const { httpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  let query = { owner };

  if (favorite === "true") {
    query = { ...query, favorite: true };
  }
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(query, "", { skip, limit });
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw httpError(404, `Contact with id ${contactId} not found`);
  }
  res.json(contact);
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const body = req.body;
  const newContact = await Contact.create({ ...body, owner });
  res.status(201).json(newContact);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updateContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updateContact) {
    throw httpError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json(updateContact);
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updateContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updateContact) {
    throw httpError(404, `Contact with id ${contactId} not found`);
  }
  res.status(200).json(updateContact);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const deletedContact = await Contact.findByIdAndDelete(contactId);
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
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
