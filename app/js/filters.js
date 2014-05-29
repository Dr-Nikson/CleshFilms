'use strict';

/* Filters */

(function(){
    angular.module('cleshFilm.filters', []).
        filter('interpolate', ['version', function(version) {
            return function(text) {
                return String(text).replace(/\%VERSION\%/mg, version);
            };
        }]);
})();