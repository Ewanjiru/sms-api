const { Contact } = require('../models/contacts');
const Sms = require('../models/sms');
const { validateContact } = require('../middleware/validation');

const createContact = () => async (req, res) => {
  try {
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const newContact = new Contact({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
    });
    const createdContact = await newContact.save();
    res.status(201).send(createdContact);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const getAllContacts = () => async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).send(contacts);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const getOneContact = () => async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send({ message: 'That contact does not exist' });
    res.status(200).send(contact);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const updateContact = () => async (req, res) => {
  try {
    const editContact = await Contact.findByIdAndUpdate(req.params.id, req.body);
    if (!editContact) return res.status(404).send({ message: 'That contact does not exist' });
    res.status(200).send({ message: 'Successfully updated' });
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const deleteContact = () => async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send({ message: 'That contact does not exist' });
    await Sms.remove({ sender: contact });
    await Contact.findOneAndRemove({ _id: req.params.id });
    res.status(200).send({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
