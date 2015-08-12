(function (window, angular) {
    'use strict';

    angular.module('App').controller('IndexController', [
        '$scope',
        function ($scope)
        {
            $scope.test = "Index";

            $scope.change = function() {
                $scope.changeRoute('#/create_newsletter/2ioj234asb234asr');
            }
        }
    ]);

})(window, angular);