
// Configuration variable
var CONFIG = {};
CONFIG.baseURL              = baseURL;
CONFIG.assetsPath           = '/bundles/app';
CONFIG.baseAngularPath      = CONFIG.assetsPath + '/angular';
CONFIG.templatesPath        = CONFIG.baseAngularPath + '/templates';
CONFIG.editorTemplatesPath  = CONFIG.templatesPath + '/editor';

// CKEditor configuration
window.CKEDITOR_BASEPATH    = CONFIG.baseURL + CONFIG.assetsPath + '/ckeditor/';