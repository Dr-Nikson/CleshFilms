'use strict';

/* Services */

(function(){
    // Demonstrate how to register services
    // In this case it is a simple value service.
    var app = angular.module('cleshFilm.services', []).value('version', '0.1');
})();