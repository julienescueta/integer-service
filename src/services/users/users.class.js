const knexService = require('feathers-knex').Service;
const errors = require("@feathersjs/errors");
const uuid = require('uuid/v4');

class UsersService extends knexService {
  constructor (options) {
    super(options);
    this.options = options;
  }

  setup (app){ 
    this.app = app;
  }

  async create (data, params) {
    if (!data || !data.email || !data.password) {
      return Promise.reject(new errors.BadRequest('Please supply an email address and password'));
    }

    let user = {
      id: uuid(),
      email: data.email,
      password: data.password,
      api_key: uuid()
    }
    try {
      console.log(user);
      await super.create(user, { query: { id: user.id } });
    } catch(err) {
      console.log(err);
      // return Promise.reject(new errors.GeneralError('Unable to create the user'));
    }
  }
}

module.exports = function createUsersService (options) {
  return new UsersService(options);
}

module.exports.UsersService = UsersService;
