'use strict';

/* Controllers */

var pulpWebControllers = angular.module('pulpWebControllers', []);

pulpWebControllers.controller('ReposCtrl', ['$scope', 'Repos',
  function($scope, Repos) {
    var repoList = [];
    Repos.query().$promise.then(function(details) {
    angular.forEach(details, function(repo) {
    repo.numpkg = repo.content_unit_counts.rpm;
    repo.enabled = false;
    for (var i = 0; i < repo.distributors.length; i++) {
      if (repo.distributors[i].distributor_type_id == "yum_distributor") {
        if (repo.distributors[i].config.http) { 
          repo.enabled = true ; 
        }
        repo.last_published = repo.distributors[i].last_publish;
      }
    }
    this.push(repo);
    }, repoList);
    }); 
    $scope.repos = repoList;
    $scope.orderRepo = 'id';
    $scope.repoEnabled = 'false';
    $scope.includeDisabled = function(actual, expected) {
        if (actual == true) {
          return true;
        } else {
          if ((actual == false) && (expected == true)) {
          return true;
          } else { 
          return false;
          }
        }
    }
  }]);

pulpWebControllers.controller('ReposDetailCtrl', ['$scope', '$routeParams', 'Repos',
  function($scope, $routeParams, Repos) {
    $scope.repos = Repos.get({id: $routeParams.id});

  }]);
