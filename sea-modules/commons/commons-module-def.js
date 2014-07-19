define("commons/commons-all", ['handlebars'], function (require) {
    var _ = require('underscore');
    window._ = _;
    window._.str = require("underscore-string");
    _.mixin(_.str);

    require('commons/json/1.0.3/json');
    window.moment = require('commons/moment/2.0.0/moment');
    require('commons/firebugx');
    window.webhelper = require('commons/webhelper');
    window.Handlebars = require('handlebars');
    window.Spinner = require("commons/spin");

    window.Backbone = require("backbone/1.0.0/backbone");
    Backbone.View.prototype.isShow = function(){
        return this.$el.is(":visible");
    } ;
    Backbone.View.prototype.isHide = function(){
        return this.$el.is(":hidden");
    } ;

    require('backbone-validation');
    Backbone.DeepModel = require('backbone-deepmodel');
    Backbone.ModelBinder = require('backbone-modelbinder');
    require('backbone-collectionbinder');
    require('backbone-routefilter');
    require('backbone-paginator');
    require('backbone-localStorage');

    require("bootstrap");
    require('bootstrap-editable');
    require("bootstrap-datetimepicker");
    require("bootstrap-contextmenu");
});