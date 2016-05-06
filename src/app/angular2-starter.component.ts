import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, Routes } from '@angular/router';

import {ContactsRoutes} from "./contacts/contacts.routes";

@Component({
  moduleId: module.id,
  selector: 'angular2-starter-app',
  template: `
    <router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/contacts', component: ContactsRoutes},
])
export class Angular2StarterAppComponent {
  title = 'angular2-starter works!';
  constructor(private _router: Router) {}
}
