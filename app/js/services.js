'use strict';

/* Services */

(function(){
    // Demonstrate how to register services
    // In this case it is a simple value service.
    var app = angular.module('cleshFilm.services', [ 'ngResource' ]).value('version', '0.1');

    //app.constant('API_URL_UPLOAD_IMAGE','upload.php');

    app.factory('Movie', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.MOVIE;
        var resource = $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL},
            update: {method: "POST"}
        });

        return resource;

        /*return function (value) {
            var obj = new resource(value);
            obj.crew = [{}];
            obj.awards = [{}];
            //obj.crew.push({ profession: {}, staff: {} });
            return obj;
        };*/
    }]);


    app.factory('Staff', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.STAFF;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL},
            update: {method: "POST"}
        });
    }]);


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


    app.factory('Award', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.AWARD;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL}
        });
    }]);


    app.factory('Genre', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.GENRE;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL}
        });
    }]);


    app.factory('Country', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.COUNTRY;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL}
        });
    }]);


    app.factory('Rightholder', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.RIGHTHOLDER;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL}
        });
    }]);

    app.factory('Category', [ '$resource', 'ENV', function ($resource,ENV) {
        var CONFIG = ENV.CONFIG.CATEGORY;
        return $resource(CONFIG.GET_URL, { id: '@id' }, {
            query: {method:'GET', params:{ id: 'all'}, isArray:true},
            save: {method: CONFIG.SAVE_METHOD, url: CONFIG.SAVE_URL}
        });
    }]);

})();