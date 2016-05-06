import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, RouteConfig } from '@angular/router-deprecated';

import {ContactsRoutes} from "./contacts/contacts.routes";

@Component({
  moduleId: module.id,
  selector: 'angular2-starter-app',
  template: `<contact-header></contact-header>
    <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/contacts/...', name: 'ContactRoutes', component: ContactsRoutes},
])
export class Angular2StarterAppComponent {
  title = 'angular2-starter works!';
  constructor(private _router: Router) {}
}
