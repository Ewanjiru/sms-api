const mongoose = require('mongoose');
const { contactSchema } = require('./contacts');

const { Schema } = mongoose;

const smsSchema = new Schema({
  recipient: {
    type: contactSchema,
    required: true,
  },
  message: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  status: {
    type: String,
    enum: ['sent', 'unsent'],
    default: 'unsent',
  },
  sender: {
    type: contactSchema,
    required: true,
  },
});

const Sms = mongoose.model('Sms', smsSchema);

module.exports = Sms;
