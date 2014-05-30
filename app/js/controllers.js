'use strict';

/* Controllers */

(function(){

    var app = angular.module('cleshFilm.controllers', [ 'truncate' ]);

    app.controller('HatCtr', ['$scope', '$route', function($scope,$route) {
        var self = this;
        self.activeTab = undefined;

        $scope.$on('$routeChangeSuccess', function(event,current) {
            self.activeTab = current.$$route === undefined ? undefined : current.$$route.activeTab;
        });

        self.isActive = function(tabName)
        {
            return tabName == self.activeTab;
        };
    }]);

    app.controller('HomePageCtrl', ['$scope', function($scope) {

    }]);

    app.controller('MoviePageCtrl', ['$scope', '$http', '$timeout', function($scope,$http,$timeout) {
        var self = this;
        self.movies = [];
        // This is what you will bind the filter to
        self.filterSearchQuery = '';

        $http.get('/app/json/main-movies-list.json').success(function(data){
            self.movies = data;
            //$scope.movies = data;
        });

        /*$http.get('/app/json/all-movies-list.json').success(function(data){
            self.movies = data;
            //$scope.movies = data;
        });*/



        // Instantiate these variables outside the watch
        var tmpFilterSearchQuery = '',filterSearchQueryTimeout;
        $scope.$watch('searchQuery', function (val) {
            if (filterSearchQueryTimeout)
                $timeout.cancel(filterSearchQueryTimeout);

            tmpFilterSearchQuery = val;

            filterSearchQueryTimeout = $timeout(function() {
                self.filterSearchQuery = tmpFilterSearchQuery;
            }, 250); // delay 250 ms
        });

        self.getRowMoviesNum = function () {
            return 4;
        };

        self.calculateIndex = function (index, parent) {
            return index + parent * self.getRowMoviesNum();
        };

        self.removeMovie = function (index) {
            //$scope.movies.splice(index,1);
            //$scope.movies.push({ name: 'new', thumbUrl: 'lool'});
            //console.log(self.movies[index].name);
            self.movies.splice(index,1);
        };


    }]);

    app.controller('MovieEditCtrl', ['$scope', '$http', '$routeParams', function($scope,$http,$routeParams) {
        var self = this;
        self.movieId = $routeParams.movieId;
        self.movie = { };

        $http.get('/app/json/spider-man-movie.json').success(function (data) {
            self.movie = data;
        });

    }]);

    app.controller('MovieAddSuccessCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        var self = this;
        self.movieId = $routeParams.movieId;
        $scope.movie = {};

        $http.get('/app/json/spider-man-movie.json').success(function (data) {
            $scope.movie = data;
        });

    }]);


    app.controller('MovieAddFormCtrl', ['$scope', '$http', '$routeParams', '$location', function ($scope, $http, $routeParams, $location) {
        var self = this;

        self.movie = {};
        self.showForm = true;

        self.submitForm = function () {
            console.log("Form submit");
            self.showForm = false;
            self.movie.id = "1";
            $location.path("movies/add/success/"+self.movie.id);
        }

    }]);

})();

/*
var rand = function (n,d,u) {
    var ret = [];
    for (var i = 0; i != n; i++) {
        var numWords = Math.round(Math.random() * 3 + 1);
        var name = '';
        var url = '';
        for (var j = 0; j != numWords; j++) {
            name += ' ' + $.trim(d[Math.round(Math.random() * d.length)]);
        }
        url += u[Math.round(Math.random() * u.length)];
        ret.push({ "name":name, thumbUrl:url });
    }
    return ret;
};*/