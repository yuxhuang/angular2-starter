import {Observable} from "rxjs/Observable";

import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree} from "@angular/router";

import {Contact} from "../models";
import {ContactsService} from "./contacts.service";
import {ContactsListItemComponent} from "./contacts-list-item.component";

@Component({
  moduleId: module.id,
  selector: 'contacts-list',
  template: `
<ul class="collection">
  <li class="collection-item avatar" *ngFor="let item of contacts | async">
    <contacts-list-item [item]="item"></contacts-list-item> 
  </li>
</ul>
`,
  directives: [ROUTER_DIRECTIVES, ContactsListItemComponent],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [ContactsService]
})
export class ContactsListComponent implements OnActivate {
  private contacts: Observable<Array<Contact>>;

  constructor(private _contactsService: ContactsService) {}

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    this.contacts = this._contactsService.getContacts();
  }
}
