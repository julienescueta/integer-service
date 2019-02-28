// Initializes the `id` service on path `/id`
const createService = require('./id.class.js');
const createModel = require('../../models/users.model');
const hooks = require('./id.hooks');

module.exports = function (app) {
  const Model = createModel(app);

  const options = {
    name: 'users',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/id', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('id');

  service.hooks(hooks);
};
