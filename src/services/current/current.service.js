// Initializes the `current` service on path `/current`
const createService = require('./current.class.js');
const createModel = require('../../models/users.model');
const hooks = require('./current.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    name: 'users',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/current', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('current');

  service.hooks(hooks);
};
