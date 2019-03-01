/* eslint-disable no-unused-vars */
const knexService = require('feathers-knex').Service;
const errors = require("@feathersjs/errors");

class IdentifierService extends knexService {
  setup (app){ 
    this.app = app;
  }

  async find (params) {
    if (!params || !params.query || !params.query.api_key) {
      return Promise.reject(new errors.BadRequest('api_key is required'));
    }

    let data = {};
    try {
      const query = {
        query: {
          api_key: params.query.api_key
        }
      };
      const user = await super.find(query);
      if (user) {
        data = parseInt(user[0].identifier, 10) || 0;
        return { identifier: data };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async update (id, data, params) {
    if (!params || !params.query || !params.query.api_key) {
      return Promise.reject(new errors.BadRequest('api_key is required'));
    }

    if (!data || !data.identifier) {
      return Promise.reject(new errors.BadRequest('identifier is required'));
    }
    try {
      const query = {
        query: {
          api_key: params.query.api_key
        }
      }
      const user = await super.find(query);
      if (user) {
        try {
          const updatedUser = await super.patch(user[0].id, { identifier: data.identifier });
          if (user) {
            data = parseInt(updatedUser.identifier, 10) || 0;
            return { identifier: data };
          }
        } catch (err) {
          console.log(err);
        }
      }

    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = function createIdentifierService (options) {
  return new IdentifierService(options);
};

module.exports.IdentifierService = IdentifierService;
