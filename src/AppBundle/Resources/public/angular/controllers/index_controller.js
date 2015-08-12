(function (window, angular) {
    'use strict';

    angular.module('App').controller('IndexController', [
        '$scope', '$templates',
        function ($scope, $template)
        {
            $scope.test         = "Index";
            $scope.templateList = [];

            $scope.change = function() {
                $scope.changeRoute('#/create_newsletter/2ioj234asb234asr');
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

            $scope.findAllTemplates();
        }
    ]);

})(window, angular);