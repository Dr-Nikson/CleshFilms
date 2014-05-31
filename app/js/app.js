'use strict';

(function(){

    // Declare app level module which depends on filters, and services
    var app = angular.module('cleshFilm', [
        'ngRoute',
        'ngSanitize',
        'rt.encodeuri',
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

        $routeProvider.when('/movies/add', {
            templateUrl: 'partials/movie-add.html',
            /*controller: 'MovieAddCtrl',
            controllerAs: 'movieAddCtrl',*/
            activeTab: 'movies'
        });

        $routeProvider.when('/movies/add/success/:movieId', {
            templateUrl: 'partials/movie-add-success.html',
            controller: 'MovieAddSuccessCtrl',
            controllerAs: 'movieAddSuccessCtrl',
            activeTab: 'movies'
        });

        $routeProvider.when('/movies/edit/:movieId', {
            templateUrl: 'partials/movie-edit.html',
            controller: 'MovieEditCtrl',
            controllerAs: 'movieEditCtrl',
            activeTab: 'movies'
        });

        $routeProvider.when('/images', {
            templateUrl: 'partials/images.html',
            controller: 'ImagesPageCtrl',
            controllerAs: 'imagesPageCtrl',
            activeTab: 'images'
        });

        $routeProvider.when('/images/edit/:imageId/:returnPath?', {
            templateUrl: 'partials/image-edit.html',
            controller: 'ImageEditCtrl',
            controllerAs: 'imageEditCtrl',
            activeTab: 'images'
        });

        $routeProvider.when('/images/add', {
            templateUrl: 'partials/image-add.html',
            controller: 'ImageUploadCtrl',
            controllerAs: 'imageUploadCtrl',
            activeTab: 'images'
        });

        $routeProvider.when('/professions', {
            templateUrl: 'partials/professions.html',
            controller: 'ProfessionsPageCtrl',
            controllerAs: 'professionsPageCtrl',
            activeTab: 'professions'
        });

        $routeProvider.when('/stuff', {
            templateUrl: 'partials/stuff.html',
            controller: 'StuffPageCtrl',
            controllerAs: 'stuffPageCtrl',
            activeTab: 'stuff'
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