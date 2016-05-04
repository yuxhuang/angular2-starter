import {Observable} from "rxjs/Observable";

import {Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {IContactsService} from "../../contacts";
import {Contact} from "../../models";

@Component({
  moduleId: module.id,
  selector: 'contacts-list',
  templateUrl: 'contacts-list.component.html',
  styleUrls: ['contacts-list.component.css'],
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ContactsListComponent implements OnInit {
  private contacts: Observable<Array<Contact>>;

  constructor(@Inject('IContactsService') private _contactsService: IContactsService) {}

  ngOnInit() {
    this.contacts = this._contactsService.getContacts();
  }
}
