(function (window, angular) {
    'use strict';

    angular.module('App').controller('IndexController', [
        '$scope', '$templates', '$session',
        function ($scope, $template, $session)
        {
            $scope.test         = "Index";
            $scope.templateList = [];

            $scope.change = function(template) {
                $session.save(template.variables).then(saveSuccess, saveError);

                function saveSuccess() {
                    console.log("Sesion creada");
                    $scope.changeRoute('#/create_newsletter/'+template._folder);
                }

                function saveError() {
                    console.log("save error");
                }
            };

            $scope.findAllTemplates = function()
            {
                $scope.templatesLoaded = false;
                $scope.templateList = [];

                $template.findAll().then(findAllTemplatesSuccess, findAllTemplatesFailure);

                function findAllTemplatesSuccess(templates)
                {
                    console.log(templates);
                    $scope.templateList = templates;
                    $scope.templatesLoaded = true;
                }

                function findAllTemplatesFailure(reason)
                {
                    $scope.templatesError = reason;
                    $scope.templatesLoaded = true;
                }
            };

            $scope.clearSession = function() {
                $session.clear();
                console.log("limpiando sesion");
            };

            $scope.findAllTemplates();

            $scope.clearSession();
        }
    ]);

})(window, angular);