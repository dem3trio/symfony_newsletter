(function (window, angular) {
    'use strict';

    // Routes configuration
    var baseAngularPath = '/bundles/app/angular';
    var templatesPath   = baseAngularPath + '/templates';

    angular.module('App', ['ngRoute']);

    angular.module('App').config(['$interpolateProvider', '$routeProvider', function ($interpolateProvider, $routeProvider) {
        // change default characters for interpolateion
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');

        $routeProvider.
            when('/index', {
                templateUrl: templatesPath+ '/index.html',
                controller: 'IndexController'
            }).
            otherwise({
                redirectTo: '/index'
            });
    }]);

})(window, angular);