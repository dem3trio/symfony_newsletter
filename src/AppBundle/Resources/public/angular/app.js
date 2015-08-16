(function (window, angular) {
    'use strict';

    angular.module('App', ['ngRoute','ngSanitize', 'ngCkeditor']);

    angular.module('App').config(['$interpolateProvider', '$routeProvider', function ($interpolateProvider, $routeProvider) {
        // change default characters for interpolateion
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');

        $routeProvider.
            when('/index', {
                templateUrl: CONFIG.templatesPath+ '/index.html',
                controller: 'IndexController'
            }).
            when('/create_newsletter/:newsletterId', {
                templateUrl: CONFIG.templatesPath+ '/edit.html',
                controller: 'EditController'
            }).
            otherwise({
                redirectTo: '/index'
            });
    }]);

})(window, angular);
