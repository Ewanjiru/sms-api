
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const contacts = require('../routes/contacts');
const sms = require('../routes/sms');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api/contacts', contacts);
  app.use('/api/sms', sms);
  app.use(errors());
};
