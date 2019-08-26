const mongoose = require('mongoose');

const { Schema } = mongoose;
const contactSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = {
  contactSchema,
  Contact,
};
