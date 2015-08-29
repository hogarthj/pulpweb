'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('pulpWeb'));

  // Test service availability
  it('check the existence of Repos factory', inject(function(Repos) {
      expect(Repos).toBeDefined();
    }));
});
