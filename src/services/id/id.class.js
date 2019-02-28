const knexService = require('feathers-knex').Service;
const errors = require("@feathersjs/errors");
const uuid = require('uuid/v4');

class IdentifierService extends knexService {
  constructor (options) {
    super(options);
    this.options = options || {};
  }

  setup (app){ 
    this.app = app;
  }
  async find (params) {
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
        return { id: data };
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
