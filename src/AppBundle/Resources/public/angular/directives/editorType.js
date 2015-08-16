/**
 * Created by demetrio on 16/08/15.
 */
(function (window, angular) {
    "use strict";

    angular.module('App').directive('editorType', function ($compile, $templateRequest) {

        var textTemplate    = '/text.html';
        var editorTemplate  = '/ckeditor.html';

        var getTemplate = function(contentType) {
            var template = '';

            switch(contentType) {
                case 'editor':
                    template = editorTemplate;
                    break;
                case 'text':
                default:
                    template = textTemplate;
                    break;
            }

            var templatePath = CONFIG.editorTemplatesPath + template;

            return $templateRequest(templatePath);
        };

        var linker = function(scope, element, attrs) {
            var template = getTemplate(scope.content.type);
            console.log(template);
            Promise.resolve(template).then(function(value) {
                element.html(value).show();
                $compile(element.contents())(scope);
            }, function(value) {
                // not called
            });


        };

        return {
            restrict: "E",
            link: linker,
            scope: {
                content:'='
            }
        };
    });

})(window, angular);