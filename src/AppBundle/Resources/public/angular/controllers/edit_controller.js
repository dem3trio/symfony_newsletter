(function (window, angular) {
    'use strict';

    var timeOut = null;

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
                return CONFIG.baseURL+ '/preview/' + token;
            };

            $scope.reloadPreview = function() {
                    var url = $routeParams.newsletterId + '?' + new Date().getTime();
                    $scope.token = $sce.trustAsResourceUrl(url);
            };

            $scope.$watch('variables', function() {
                if(timeOut !== null) {
                    clearTimeout(timeOut);
                }
                // Force a 500 milisec timeout to not collapse the server
                timeOut = setTimeout(function(){
                    $session.save($scope.variables).then(saveSuccess, saveError);
                }, 300);

                function saveSuccess() {
                    $scope.reloadPreview();
                }

                function saveError(error) {
                    console.log("Error retrieving data");
                    console.log(error);
                }
            }, true);

            $scope.getData = function() {
                $session.get().then(getSuccess, getError);
                function getSuccess(data) {
                    $scope.variables = data;
                }

                function getError(error) {
                    console.log('Error retrieving data:');
                    console.log(error);
                }
            };

            $scope.getData();
        }
    ]);

})(window, angular);
