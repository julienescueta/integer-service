// Initializes the `next` service on path `/next`
const createService = require('./next.class.js');
const hooks = require('./next.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/next', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('next');

  service.hooks(hooks);
};
