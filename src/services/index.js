const users = require('./users/users.service.js');
const id = require('./id/id.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(id);
};
