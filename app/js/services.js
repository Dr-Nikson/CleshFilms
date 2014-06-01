'use strict';

/* Services */

(function(){
    // Demonstrate how to register services
    // In this case it is a simple value service.
    var app = angular.module('cleshFilm.services', [ 'ngResource' ]).value('version', '0.1');

    app.factory('Image', [ '$resource', function ($resource) {
        return $resource('/app/json/images/:phoneId.json', {}, {
            query: {method:'GET', params:{phoneId:'all'}, isArray:true}
        });
    }]);
})();