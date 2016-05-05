import {Component, ViewEncapsulation, Attribute, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";

import {Contact} from "../models";

@Component({
  moduleId: module.id,
  selector: 'contacts-list-item',
  template: `
    <img [src]="item.image" alt="" class="circle">
    <a [routerLink]="['/contacts/show', item.id]" class="title">{{ item.name }}</a>
`,
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.Emulated,
  providers: []
})
export class ContactsListItemComponent implements OnActivate {
  @Input() item: Contact;

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
  }
}
