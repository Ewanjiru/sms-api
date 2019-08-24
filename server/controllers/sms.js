const Sms = require('../models/sms');
const { Contact } = require('../models/contacts');
const { validateSms } = require('../middleware/validation');

const createSms = () => async (req, res) => {
  const { error } = validateSms(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const sender = await Contact.findById(req.body.senderId);
    const recipient = await Contact.findById(req.body.recipientId);
    const newSms = new Sms({
      recipient,
      message: req.body.message,
      status: 'sent',
      sender,
    });
    const createdSms = await newSms.save();
    res.status(201).send(createdSms);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllSmsOrByContact = () => async (req, res) => {
  try {
    if (!Object.keys(req.query).length) {
      const allSms = await Sms.find({});
      if (!allSms) return res.status(404).send({ Message: 'No messages found' });
      return res.status(200).send(allSms);
    }

    const contact = await Contact.findById({ _id: req.query.id });
    const smsReceived = await Sms.find({ recipient: contact });
    const smsSent = await Sms.find({ sender: contact });
    if (!smsReceived.length && !smsSent.length) {
      return res.status(404).send({
        Message: 'That contact no longer exist or has not received or sent any messages',
      });
    }

    res.status(200).send({
      Received: smsReceived,
      Sent: smsSent,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSmsById = () => async (req, res) => {
  try {
    const sms = await Sms.find({ _id: req.params.id });
    if (!sms) return res.status(404).send({ Message: 'Message not found' });
    res.status(200).send(sms);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const deleteSms = () => async (req, res) => {
  try {
    const sms = await Sms.findByIdAndRemove(req.params.id);
    if (!sms) return res.status(404).send({ Message: 'That sms does not exist' });
    res.status(200).send({ Message: 'Successfully deleted' });
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

module.exports = {
  getAllSmsOrByContact,
  getSmsById,
  createSms,
  deleteSms,
};
