const knexService = require('feathers-knex').Service;
const errors = require("@feathersjs/errors");
const uuid = require('uuid/v4');

class UsersService extends knexService {
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
      const newUser = await super.create(user);
      if (newUser) {
        return {
          api_key: newUser.api_key,
          identifier: newUser.identifier
        }
      }
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = function createUsersService (options) {
  return new UsersService(options);
}

module.exports.UsersService = UsersService;
