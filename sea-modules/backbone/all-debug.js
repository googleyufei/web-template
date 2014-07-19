define("backbone/backbone-all-debug", [
    'backbone',
    'backbone-validation',
    'backbone-deepmodel',
    'backbone-modelbinder',
    'backbone-collectionbinder',
    'backbone-routefilter',
    'backbone-paginator',
    'backbone-localStorage'
], function (require, exports) {
    window.Backbone = require("backbone");
    require('backbone-validation');
    Backbone.DeepModel = require('backbone-deepmodel');
    Backbone.ModelBinder = require('backbone-modelbinder');
    require('backbone-collectionbinder');
    require('backbone-routefilter');
    require('backbone-paginator');
    require('backbone-localStorage');
});

