'use strict';

/* Services */

(function(){
    // Demonstrate how to register services
    // In this case it is a simple value service.
    var app = angular.module('cleshFilm.services', [ 'ngResource' ]).value('version', '0.1');

    //app.constant('API_URL_UPLOAD_IMAGE','upload.php');

    app.factory('Image', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.IMAGE;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id:'all'}, isArray:true}
        });
    }]);

    app.factory('Profession', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.PROFESSION;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL}
        });
    }]);

})();