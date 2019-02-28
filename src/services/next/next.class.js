/* eslint-disable no-unused-vars */
class Service {
  setup (app){ 
    this.app = app;
  }

  async find (params) {
    const data = await this.app.service('id').find(params);
    if (data) {
      const oldId = parseInt(data.identifier, 10);
      const newId = oldId + 1;

      try {
        const updated = await this.app.service('id').update(null, { identifier: newId }, params);
        if (updated) {
          return {
            identifier: updated.identifier
          };
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
