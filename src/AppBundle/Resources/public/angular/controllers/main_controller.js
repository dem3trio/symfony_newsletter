(function (window, angular) {
    'use strict';

    angular.module('App').controller('MainController', [
        '$scope',
        function ($scope)
        {
            $scope.test = 'Test info';
        }
    ]);

})(window, angular);