import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from "@angular/router";

import {ContactDetailsComponent} from "./contact-details.component";
import {ContactEditorComponent} from "./contact-editor.component";
import {ContactsListComponent} from "./contacts-list.component";
import {ContactHeaderComponent} from "./contacts-header.component";

@Component({
  moduleId: module.id,
  selector: 'contacts-routes',
  template: `
<contact-header></contact-header>
<router-outlet></router-outlet>
`,
  directives: [ROUTER_DIRECTIVES, ContactHeaderComponent],
  encapsulation: ViewEncapsulation.Emulated,
})
@Routes([
  {path: '/', component: ContactsListComponent},
  {path: '/show/:id', component: ContactDetailsComponent},
  {path: '/edit/:id', component: ContactEditorComponent}
])
export class ContactsRoutes {
  constructor(private _router: Router) {
  }
}
