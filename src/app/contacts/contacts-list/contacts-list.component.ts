import {Observable} from "rxjs/Observable";

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {Contact} from "../../models";
import {ContactsService} from "../contacts.service";

@Component({
  moduleId: module.id,
  selector: 'contacts-list',
  template: `<ul class="collection">
  <li class="collection-item avatar" *ngFor="let item of contacts | async">
    <img [src]="item.image" alt="" class="circle">
    <a [routerLink]="['ContactDetail', {id: item.id}]" class="title">{{ item.name }}</a>
  </li>
</ul>
`,
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [ContactsService]
})
export class ContactsListComponent implements OnInit {
  private contacts: Observable<Array<Contact>>;

  constructor(private _contactsService: ContactsService) {}

  ngOnInit() {
    this.contacts = this._contactsService.getContacts();
  }
}
