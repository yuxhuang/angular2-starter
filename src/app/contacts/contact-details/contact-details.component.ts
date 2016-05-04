import {Component, OnInit, Inject} from '@angular/core';

import {RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Contact} from "../../models";
import {IContactsService} from "../../contacts";

@Component({
  moduleId: module.id,
  selector: 'contact-detail',
  templateUrl: 'contact-details.component.html',
  styleUrls: ['contact-details.component.css'],
  directives: [ROUTER_DIRECTIVES],
})
export class ContactDetailsComponent implements OnInit {

  private contact: Contact;

  constructor(@Inject('IContactsService') private _contactsService: IContactsService, private _routeParams: RouteParams) {}

  ngOnInit() {
    let id = Number(this._routeParams.get('id'));
    this._contactsService.getContact(id).subscribe(contact => this.contact = contact);
  }

}
