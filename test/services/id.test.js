const assert = require('assert');
const app = require('../../src/app');

describe('\'id\' service', () => {
  it('registered the service', () => {
    const service = app.service('id');

    assert.ok(service, 'Registered the service');
  });
});
