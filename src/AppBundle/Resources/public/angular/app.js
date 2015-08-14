(function (window, angular) {
    'use strict';

    // Routes configuration
    var baseAngularPath = '/bundles/app/angular';
    var templatesPath   = baseAngularPath + '/templates';

    angular.module('App', ['ngRoute','ngSanitize']);

    angular.module('App').config(['$interpolateProvider', '$routeProvider', function ($interpolateProvider, $routeProvider) {
        // change default characters for interpolateion
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');

        $routeProvider.
            when('/index', {
                templateUrl: templatesPath+ '/index.html',
                controller: 'IndexController'
            }).
            when('/create_newsletter/:newsletterId', {
                templateUrl: templatesPath+ '/edit.html',
                controller: 'EditController'
            }).
            otherwise({
                redirectTo: '/index'
            });
    }]);

})(window, angular);
