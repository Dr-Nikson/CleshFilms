'use strict';

/* Filters */

(function(){
    var app = angular.module('cleshFilm.filters', []);

    app.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

    app.filter('doubleEncodeUri', [
        '$window',
        function ($window) {
            return function (uri) {
                return $window.escape($window.encodeURIComponent(uri));
                //var decoded=decodeURIComponent(unescape(encoded));
            };
        }
    ]);

    app.filter('doubleDecodeUri', [
        '$window',
        function ($window) {
            return function (uri) {
                return $window.decodeURIComponent($window.unescape(uri));
                //var decoded=decodeURIComponent(unescape(encoded));
            };
        }
    ]);


})();