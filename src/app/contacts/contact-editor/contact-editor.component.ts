import {Component, OnInit, Inject} from '@angular/core';

import {Router, RouteParams} from '@angular/router-deprecated';

import {IContactsService} from "../../contacts";
import {Contact} from "../../models";

import {Observable} from "rxjs/Observable";

@Component({
  moduleId: module.id,
  selector: 'contact-editor',
  templateUrl: 'contact-editor.component.html',
  styleUrls: ['contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {

  private contact: Contact = <Contact>{address:{}};
  private contactObservable: Observable<Contact>;

  constructor(@Inject('IContactsService') private _contactsService: IContactsService, private _routeParams: RouteParams, private _router: Router) {}

  ngOnInit() {
    let id = Number(this._routeParams.get('id'));
    this.contactObservable = this._contactsService.getContact(id);
    this.contactObservable.subscribe(x => this.contact = x);
  }

  private save(contact: Contact) {
    this._contactsService.updateContact(contact).subscribe(x => {
      this._router.navigate(['ContactDetail', {id: this.contact.id}]);
    });
  }

  private cancel(contact: Contact) {
    this._router.navigate(['ContactDetail', {id: this.contact.id}]);
  }

}
