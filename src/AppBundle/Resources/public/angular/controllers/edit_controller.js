(function (window, angular) {
    'use strict';

    angular.module('App').controller('EditController', [
        '$scope',
        '$routeParams',
        '$session',
        '$sce',
        function ($scope, $routeParams, $session, $sce)
        {
            $scope.token = $routeParams.newsletterId;

            $scope.variables = [
                {name: 'objColor', value: ''},
                {name: 'objText',  value: ''}
            ];

            $scope.getIframeSrc = function (token) {
                return 'http://localhost:8000/preview/' + token;
            };

            $scope.reloadPreview = function() {
                    var url = $routeParams.newsletterId + '?' + new Date().getTime();
                    $scope.token = $sce.trustAsResourceUrl(url);
            };

            $scope.$watch('variables', function() {
                $session.save($scope.variables).then(saveSuccess, saveError);

                function saveSuccess() {
                    $scope.reloadPreview();
                }

                function saveError() {
                    console.log(error);
                }
            }, true);

            $scope.getData = function() {
                $session.get().then(getSuccess, getError);

                function getSuccess(data) {
                    console.log(data);
                    $scope.variables = data;
                }

                function getError(error) {
                    console.log(error);
                }
            };

            $scope.getData();
        }
    ]);

})(window, angular);
