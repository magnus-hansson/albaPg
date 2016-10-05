'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          config.title = 'Aurelia';
          config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'ani', name: 'ani', moduleId: 'ani', nav: true, title: 'Animate' }, { route: 'test', name: 'test', moduleId: 'test', nav: true, title: 'Test page' }, { route: 'activity', name: 'activity', moduleId: 'activity', nav: true, title: 'Sign up for activity' }, { route: 'plan-chart', name: 'plan-chart', moduleId: 'plan-chart', nav: true, title: 'Plan chart' }, { route: 'signup-chart', name: 'signup-chart', moduleId: 'signup-chart', nav: true, title: 'Signup chart' }, { route: 'tema-chart', name: 'tema-chart', moduleId: 'tema-chart', nav: true, title: 'Tema chart' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

          this.router = router;
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=app.js.map
