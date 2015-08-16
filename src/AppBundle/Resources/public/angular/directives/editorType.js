/**
 * Created by demetrio on 16/08/15.
 */
(function (window, angular) {
    "use strict";

    angular.module('App').directive('editorType', function ($compile, $templateRequest) {

        var textTemplate    = '/text.html';
        var editorTemplate  = '/ckeditor.html';
        var colorTemplate   = '/color.html';

        var getTemplate = function(contentType) {
            var template = '';

            switch(contentType) {
                case 'editor':
                    template = editorTemplate;
                    break;
                case 'color':
                    template = colorTemplate;
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

            if(scope.content.type == 'editor') {
                scope.editorOptions = getCKEditorConfig();
            }

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


function getCKEditorConfig() {
    return {
        height: "300px",
        toolbar: 'super',
        toolbar_super: [
            { name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
            { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
            { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
            { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
            '/',
            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
            { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
            { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
            '/',
            { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
            { name: 'about', items: [ 'About' ] }
        ],
    };
}