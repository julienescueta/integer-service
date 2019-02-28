const assert = require('assert');
const app = require('../../src/app');

describe('\'next\' service', () => {
  it('registered the service', () => {
    const service = app.service('next');

    assert.ok(service, 'Registered the service');
  });
});
