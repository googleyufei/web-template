define("jquery/jquery-all-debug", [
    'jquery',
    'jquery-cookie',
    'jquery-hoverIntent',
    'jquery-hotkeys',
    'jquery-placeholder',
    'jquery-noty',
    'select2',
    'jquery-ztree' ,
    'lhgdialog'
], function (require, exports, module) {
    window.$ = window.jQuery = require('jquery');
    require('jquery-cookie');
    require('jquery-hoverIntent');
    require("jquery-hotkeys");
    require("jquery-placeholder");
    require("jquery-noty");

    require("select2");
    require("jquery-ztree");
    require("lhgdialog");
});

