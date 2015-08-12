(function (window, angular) {
    'use strict';

    angular.module('App').controller('IndexController', [
        '$scope',
        function ($scope)
        {
            $scope.test = 'Index controller';
        }
    ]);

})(window, angular);