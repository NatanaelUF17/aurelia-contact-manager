import { inject, PLATFORM } from 'aurelia-framework';
import { WebAPI } from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Contacts';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', title:'Select', moduleId: PLATFORM.moduleName('./components/no-selection/no-selection') },
      { route: 'contacts/:id', name: 'contacts', moduleId: PLATFORM.moduleName('./components/contact-detail/contact-detail') }
    ]);
    this.router = router;
  }
}