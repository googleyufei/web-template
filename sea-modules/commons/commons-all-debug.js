define("commons/commons-all-debug", [
    "handlebars",
    "underscore",
    "underscore-string",
    "commons/json/1.0.3/json",
    "moment",
    "commons/firebugx",
    "commons/webhelper",
    "backbone",
    "backbone-validation",
    "backbone-deepmodel",
    "backbone-modelbinder",
    "backbone-collectionbinder",
    "backbone-routefilter",
    "backbone-paginator",
    "backbone-localStorage",
    "bootstrap",
    "bootstrap-editable",
    "bootstrap-datetimepicker",
    "bootstrap-contextmenu"
], function (require) {
    var _ = require("underscore");
    window._ = _;
    window._.str = require("underscore-string");
    _.mixin(_.str);
    require("commons/json/1.0.3/json");
    window.moment = require("moment");
    require("commons/firebugx");
    window.webhelper = require("commons/webhelper");
    window.Handlebars = require("handlebars");
//    window.Spinner = require("commons/spin");
    window.Backbone = require("backbone/1.0.0/backbone");
    require("backbone-validation");
    Backbone.DeepModel = require("backbone-deepmodel");
    Backbone.ModelBinder = require("backbone-modelbinder");
    require("backbone-collectionbinder");
    require("backbone-routefilter");
    require("backbone-paginator");
    require("backbone-localStorage");
    require("bootstrap");
    require("bootstrap-editable");
    require("bootstrap-datetimepicker");
    require("bootstrap-contextmenu");
});