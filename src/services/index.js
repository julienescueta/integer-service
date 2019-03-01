const users = require('./users/users.service.js');
const current = require('./current/current.service.js');
const next = require('./next/next.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(current);
  app.configure(next);
};
