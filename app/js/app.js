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
    ]);

    app.value('ENV',{});

    var loadEnvironmentConfig = function ($http,ENV) {
        return $http.get('./config.json').then(function (resData) {
            return $http.get('./'+resData.data.ENV+'.config.json').then(function (configData) {
                var environmentConfig = {
                    NAME: resData.data.ENV,
                    CONFIG: angular.extend({},configData.data)
                };
                //app.value('ENV',environmentConfig);
                angular.extend(ENV,environmentConfig);
            });
        });
    };

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomePageCtrl',
            activeTab: 'home',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/movies', {
            templateUrl: 'partials/movies.html',
            controller: 'MoviePageCtrl',
            controllerAs: 'moviePageCtrl',
            activeTab: 'movies',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/movies/add', {
            templateUrl: 'partials/movie-add.html',
            /*controller: 'MovieAddCtrl',
            controllerAs: 'movieAddCtrl',*/
            activeTab: 'movies',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/movies/add/success/:movieId', {
            templateUrl: 'partials/movie-add-success.html',
            controller: 'MovieAddSuccessCtrl',
            controllerAs: 'movieAddSuccessCtrl',
            activeTab: 'movies',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/movies/edit/:movieId', {
            templateUrl: 'partials/movie-edit.html',
            controller: 'MovieEditCtrl',
            controllerAs: 'movieEditCtrl',
            activeTab: 'movies',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/images', {
            templateUrl: 'partials/images.html',
            controller: 'ImagesPageCtrl',
            controllerAs: 'imagesPageCtrl',
            activeTab: 'images',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/images/edit/:imageId/:returnPath?', {
            templateUrl: 'partials/image-edit.html',
            controller: 'ImageEditCtrl',
            controllerAs: 'imageEditCtrl',
            activeTab: 'images',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/images/add', {
            templateUrl: 'partials/image-add.html',
            controller: 'ImageUploadCtrl',
            controllerAs: 'imageUploadCtrl',
            activeTab: 'images',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/professions', {
            templateUrl: 'partials/professions.html',
            controller: 'ProfessionsPageCtrl',
            controllerAs: 'professionsPageCtrl',
            activeTab: 'professions',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/professions/add', {
            templateUrl: 'partials/profession-add.html',
            /*controller: 'ProfessionsPageCtrl',
            controllerAs: 'professionsPageCtrl',*/
            activeTab: 'professions',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/awards', {
            templateUrl: 'partials/awards.html',
            controller: 'AwardsPageCtrl',
            controllerAs: 'awardsPageCtrl',
            activeTab: 'awards',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/awards/add', {
            templateUrl: 'partials/awards-add.html',
            /*controller: 'ProfessionsPageCtrl',
            controllerAs: 'professionsPageCtrl',*/
            activeTab: 'awards',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/genres', {
            templateUrl: 'partials/genres.html',
            controller: 'GenresPageCtrl',
            controllerAs: 'genresPageCtrl',
            activeTab: 'genres',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/genres/add', {
            templateUrl: 'partials/genres-add.html',
            /*controller: 'ProfessionsPageCtrl',
            controllerAs: 'professionsPageCtrl',*/
            activeTab: 'genres',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/countries', {
            templateUrl: 'partials/countries.html',
            controller: 'CountriesPageCtrl',
            controllerAs: 'countriesPageCtrl',
            activeTab: 'countries',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/countries/add', {
            templateUrl: 'partials/countries-add.html',
            /*controller: 'ProfessionsPageCtrl',
            controllerAs: 'professionsPageCtrl',*/
            activeTab: 'countries',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/staff', {
            templateUrl: 'partials/staff.html',
            controller: 'StuffPageCtrl',
            controllerAs: 'stuffPageCtrl',
            activeTab: 'staff',
            resolve: { loadConf: loadEnvironmentConfig }
        });

        $routeProvider.when('/view2', {
            templateUrl: 'partials/partial2.html',
            controller: 'MyCtrl2',
            resolve: { loadConf: loadEnvironmentConfig }
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