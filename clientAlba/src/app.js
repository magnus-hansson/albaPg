export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    //config.options.pushState = true;
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true, title: 'Github Users' },
      { route: 'activity',         name: 'activity',        moduleId: 'activity',        nav: true, title: 'Sign up for activity' },
      { route: 'chart',         name: 'chart',        moduleId: 'chart',        nav: true, title: 'Activity chart' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
