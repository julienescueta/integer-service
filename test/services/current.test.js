const assert = require('assert');
const app = require('../../src/app');

describe('\'current\' service', () => {
  it('registered the service', () => {
    const service = app.service('current');

    assert.ok(service, 'Registered the service');
  });
});
