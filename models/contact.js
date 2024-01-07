const { Schema, model } = require("mongoose");

const { hendleMoongooseError } = require("../helpers");

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: { type: String, unique: true },
    phone: { type: String },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", hendleMoongooseError);

const Contact = model("contact", contactsSchema);

module.exports = {
  Contact,
};
