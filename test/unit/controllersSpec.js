'use strict';

/* jasmine specs for controllers go here */
describe('pulpWeb controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('pulpWeb'));
  beforeEach(module('pulpWebServices'));

  describe('ReposCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('mockData/repos.json').
          respond([{"display_name": 'mock repo 1', "content_unit_counts": { "rpm": 12 }, "id": 'mock-repo-1', "_href": "/pulp/api/v2/repositories/mock-repo-1" , "distributors": [ { "repo_id": "mock-repo-1", "distributor_type_id": "yum_distributor", "config": { "http": true, "https": false, "relative_url": "v2/mock-repo-1" } } ]}, {"display_name": 'mock repo 2', "content_unit_counts": { "rpm": 32 }, "id": 'mock-repo-2', "_href": "/pulp/api/v2/repositories/mock-repo-2", "distributors": [ { "repo_id": "mock-repo-2", "distributor_type_id": "yum_distributor", "config": { "http": false, "https": false, "relative_url": "v2/mock-repo-2" } } ]}]);

      scope = $rootScope.$new();
      ctrl = $controller('ReposCtrl', {$scope: scope});
    }));


    it('should create "repos" model with 2 repos fetched from xhr', function() {
      expect(scope.repos).toEqualData([]);
      $httpBackend.flush();

      expect(scope.repos.length).toEqual(2);
      expect(scope.repos[0].display_name).toEqual('mock repo 1');
      expect(scope.repos[0].id).toEqual('mock-repo-1');
      expect(scope.repos[0].content_unit_counts.rpm).toEqual(12);
      expect(scope.repos[0].distributors[0].repo_id).toEqual(scope.repos[0].id);
      expect(scope.repos[0].distributors[0].config.http).toEqual(true);
      expect(scope.repos[1].distributors[0].config.http).toEqual(false);
      expect(scope.repos[0].distributors[0].config.relative_url).toEqual('v2/mock-repo-1');
      expect(scope.repos[0].numpkg).toEqual(scope.repos[0].content_unit_counts.rpm);
      expect(scope.repos[0].enabled).toEqual(true);
      expect(scope.repos[1].enabled).toEqual(false);
    });

    it('should set the default value of ordering', function() {
       expect(scope.orderRepo).toBe('id');
    });

    it('should set the defaul to hide disabled repos', function() {
       expect(scope.repoEnabled).toBe('false');
    });

    it('should return only enabled in filter', function() {
      expect(scope.includeDisabled(true, false)).toEqual(true);
      expect(scope.includeDisabled(false, false)).toEqual(false);
    });

    it('should return both enabled and disabled in filter', function() {
      expect(scope.includeDisabled(true, true)).toEqual(true);
      expect(scope.includeDisabled(false, true)).toEqual(true);
    });

  });
});