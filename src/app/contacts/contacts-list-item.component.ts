import {Component, ViewEncapsulation, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {Contact} from "../models";

@Component({
  moduleId: module.id,
  selector: 'contacts-list-item',
  template: `
    <img [src]="item.image" alt="" class="circle">
    <a [routerLink]="['Details', {id: item.id}]" class="title">{{ item.name }}</a>
`,
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.Emulated,
  providers: []
})
export class ContactsListItemComponent {
  @Input() item: Contact;
}
