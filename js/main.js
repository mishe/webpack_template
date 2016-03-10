window.underscore=window._=require('./libs/underscore.js');
window.Backbone=require('./libs/backbone.js');

require('./libs/touch');
require('../base/base.css');

var Router = require('./router.js');
window.store = require('./libs/store');
window.router = new Router;
Backbone.history.start({pushState: true});

