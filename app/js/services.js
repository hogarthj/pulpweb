'use strict';

/* Services */

var pulpWebServices = angular.module('pulpWebServices', ['ngResource']);

pulpWebServices.factory('Repos', ['$resource',
  function($resource){
    return $resource('mockData/:id.json', {}, {
      query: {method:'GET', params:{id:'repos'}, isArray:true}
    });
  }]);
