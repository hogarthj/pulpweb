'use strict';

/* App Module */

var pulpWeb = angular.module('pulpWeb', [
  'ngRoute',
  'pulpWebControllers',
  'pulpWebServices'
]);

pulpWeb.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/repos', {
        templateUrl: 'partials/repos.html',
        controller: 'ReposCtrl'
      }).
      when('/repos/:phoneId', {
        templateUrl: 'partials/repos-detail.html',
        controller: 'ReposDetailCtrl'
      }).
      otherwise({
        redirectTo: '/repos'
      });
  }]);
