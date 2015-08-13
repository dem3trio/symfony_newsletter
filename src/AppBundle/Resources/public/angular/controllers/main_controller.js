(function (window, angular) {
    'use strict';

    angular.module('App').controller('MainController', [
        '$scope',
        function ($scope)
        {
            $scope.changeRoute = function(url, forceReload) {
                $scope = $scope || angular.element(document).scope();
                if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                    window.location = url;
                } else {
                    $location.path(url);
                    $scope.$apply();
                }
            };
        }
    ]);

})(window, angular);