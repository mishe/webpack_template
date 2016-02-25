window.underscore=window._=require('./libs/underscore.js');
window.Backbone=require('./libs/backbone.js');


require('./libs/helper');
require('./libs/touch');
require('../css/base.css');

var Router = require('./router.js');
window.store = require('./libs/store');
window.st.router = new Router;
Backbone.history.start({pushState: true});
