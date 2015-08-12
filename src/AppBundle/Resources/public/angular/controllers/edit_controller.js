(function (window, angular) {
    'use strict';

    angular.module('App').controller('EditController', [
        '$scope',
        '$routeParams',
        function ($scope, $routeParams)
        {
            $scope.test = $routeParams.newsletterId;
        }
    ]);

})(window, angular);