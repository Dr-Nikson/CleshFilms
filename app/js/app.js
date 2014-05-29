'use strict';

(function(){

    // Declare app level module which depends on filters, and services
    var app = angular.module('cleshFilm', [
        'ngRoute',
        'cleshFilm.filters',
        'cleshFilm.services',
        'cleshFilm.directives',
        'cleshFilm.controllers'
    ]).config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomePageCtrl',
            activeTab: 'home'
        });

        $routeProvider.when('/movies', {
            templateUrl: 'partials/movies.html',
            controller: 'MoviePageCtrl',
            controllerAs: 'moviePageCtrl',
            activeTab: 'movies'
        });

        $routeProvider.when('/view2', {
            templateUrl: 'partials/partial2.html',
            controller: 'MyCtrl2'
        });

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);


    app.filter('partition', function() {
        var cache = {};
        var filter = function(arr, size) {
            if (!arr) { return; }
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            var arrString = JSON.stringify(arr);
            var fromCache = cache[arrString+size];
            if (JSON.stringify(fromCache) === JSON.stringify(newArr)) {
                return fromCache;
            }
            cache[arrString+size] = newArr;
            return newArr;
        };
        return filter;
    });

})();