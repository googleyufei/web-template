define(function (require) {
    seajs.devMode = (location.href.indexOf("?dev") > 0);
    seajs.isPrivate = false;
    seajs.appVersion = "1405759094377";

    seajs.config({
        base: "./sea-modules/",
        plugins: ["text"],

        paths: {
            'cssbase': seajs.devMode ? '../../css' : '../../../css',
            'tplbase': seajs.devMode ? '../../tpls' : '../../../tpls',
            'appbase': seajs.devMode ? '../../app' : '../../../app',
            'commonsbase': seajs.devMode ? "../../../commons" : "../../../app/commons"
        },
        //文件映射
        map: [
            //可配置版本号
            ['.css', '.css?v=' + (seajs.devMode ? new Date().valueOf() : seajs.appVersion)],
            ['.js', '.js?v=' + (seajs.devMode ? new Date().valueOf() : seajs.appVersion)]
        ],
        alias: {
            // sea-modules/jquery
            '$': 'jquery/1.9.1/jquery',
            'jquery': 'jquery/1.9.1/jquery',
            'jquery-all': 'jquery/jquery-all',
            'jquery-cookie': 'jquery/plugins/cookie/1.3/cookie',
            'jquery-mousewheel': 'jquery/plugins/mousewheel/3.1.3/mousewheel',
            'jquery-hotkeys': 'jquery/plugins/jquery-hotkeys/jquery-hotkeys',
            'jquery-hoverIntent': 'jquery/plugins/jquery-hoverIntent/jquery-hoverIntent',
            'jquery-ztree': 'jquery/plugins/jqueryztree/jquery.ztree.all-3.5.min',
            'jquery-event-drag': 'jquery/plugins/event/jquery-event-drag',
            'jquery-event-drop': 'jquery/plugins/event/jquery-event-drop',
            'jquery-placeholder': 'jquery/plugins/jquery-placeholder/jquery.placeholder',
            'jquery-jsonp': 'jquery/plugins/jquery-jsonp',
            'jquery-noty': 'jquery/plugins/noty/jquery.noty.packaged',
            'lhgdialog': 'jquery/plugins/lhgdialog/lhgdialog',
            'select2': 'jquery/plugins/select2/select2',
            'jquery-ui': 'jquery/plugins/jquery-ui',

            // sea-modules/commons
            'commons-all': 'commons/commons-all',
            'handlebars': seajs.devMode ? 'commons/handlebars/1.0.0/handlebars' : 'commons/handlebars-runtime/1.0.0/handlebars',// must define
            'underscore': 'commons/underscore/2.4.1/lodash',
            'underscore-string': 'commons/underscore-string/underscore.string',
            'moment': 'commons/moment/2.0.0/moment',
            'moment-zh-cn': 'commons/moment/2.0.0/zh-cn',
            'crypto-sha256': 'commons/crypto-sha256',
            'security': 'commons/security',
            'math': 'commons/math/math',

            // sea-modules/backbone
            'backbone': 'backbone/1.0.0/backbone',
            'backbone-all': 'backbone/backbone-all',
            'backbone-modelbinder': 'backbone/plugins/backbone-modelbinder/backbone-modelbinder',
            'backbone-collectionbinder': 'backbone/plugins/backbone-collectionbinder/backbone-collectionbinder',
            'backbone-validation': 'backbone/plugins/backbone-validation/backbone-validation',
            'backbone-deepmodel': 'backbone/plugins/backbone-deepmodel/backbone-deepmodel',
            'backbone-routefilter': 'backbone/plugins/backbone-routefilter/backbone-routefilter',
            'backbone-paginator': 'backbone/plugins/backbone-paginator/backbone-paginator',
            'backbone-localStorage': 'backbone/plugins/backbone-localStorage/backbone-localStorage',

            // sea-modules/bootstrap
            'bootstrap': 'bootstrap/2.2.2/bootstrap',
            'bootstrap-all': 'bootstrap/bootstrap-all',
            'bootstrap-editable': 'bootstrap/plugins/bootstrap-editable/bootstrap-editable',
            'bootstrap-datetimepicker': 'bootstrap/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker',
            'bootstrap-wysiwyg': 'bootstrap/plugins/bootstrap-wysiwyg/bootstrap-wysiwyg',
            'bootstrap-fuelux': 'bootstrap/plugins/bootstrap-fuelux/wizard',
            'bootstrap-contextmenu': 'bootstrap/plugins/bootstrap-contextmenu/bootstrap-contextmenu',

            "modernizr": "modernizr/modernizr",
            'socket-io-client': 'socket-io-client/socket.io.min',
            'flash-all': 'flash/flash-all',
            'jwplayer': 'flash/jwplayer/jwplayer'
        }
    });
})
;