/* eslint-disable no-unused-vars */
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
      } else {
        return Promise.reject(new errors.GeneralError('Something wrong happened while creating your account'));
      }
    } catch(err) {
      if (err && err.message && err.message.includes('users_email_unique')) {
        return Promise.reject(new errors.BadRequest('User already exists'));
      }
      console.log(err);
      return Promise.reject(new errors.GeneralError('Sorry, could not process your request'));
    }
  }
}

module.exports = function createUsersService (options) {
  return new UsersService(options);
}

module.exports.UsersService = UsersService;
