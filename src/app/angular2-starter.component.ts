import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';

import {ContactsListComponent} from "./contacts/contacts-list";
import {ContactDetailsComponent} from "./contacts/contact-details";
import {ContactEditorComponent} from "./contacts/contact-editor";
import {ContactHeaderComponent} from "./contacts/contacts-header";

@Component({
  moduleId: module.id,
  selector: 'angular2-starter-app',
  template: `<contact-header></contact-header>
<router-outlet></router-outlet>
`,
  directives: [ROUTER_DIRECTIVES, ContactHeaderComponent]
})
@RouteConfig([
  {path: '/', name: 'ContactsList', component: ContactsListComponent},
  {path: '/contacts/:id', name: 'ContactDetail', component: ContactDetailsComponent},
  {path: '/contacts/:id/editor', name: 'ContactEditor', component: ContactEditorComponent}
])
export class Angular2StarterAppComponent {
  title = 'angular2-starter works!';
}
