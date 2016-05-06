import {Component} from '@angular/core';

import {Router, OnActivate, ComponentInstruction, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Contact} from "../models";

import {Observable} from "rxjs/Observable";
import {ContactsService} from "./contacts.service";

@Component({
  moduleId: module.id,
  selector: 'contact-editor',
  providers: [ContactsService],
  directives: [ROUTER_DIRECTIVES],
  template: `<div class="row">
  <form class="col s12 m7">
    <div class="card">
      <div class="card-image" *ngIf="contact.image">
        <img [src]="contact.image">
        <span class="card-title">{{ contact.name }}</span>
      </div>
      <div class="card-content grey-text text-darken-4">
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">account_circle</i><input [(ngModel)]="contact.name" name="name" id="name" type="text" class="validate">
            <label class="active" for="name">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i><input [(ngModel)]="contact.email" name="email" id="email" type="text" class="validate">
            <label class="active" for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">phone</i><input [(ngModel)]="contact.phone" name="phone" id="phone" type="text" class="validate">
            <label class="active" for="phone">Phone</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">cake</i><input [(ngModel)]="contact.birthday" name="birthday" id="birthday" type="date" class="validate">
            <label class="active" for="phone">Birthday</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">public</i><input [(ngModel)]="contact.website" name="website" id="website" type="text" class="validate">
            <label class="active" for="phone">Website</label>
          </div>
        </div>
        <fieldset>
          <legend><i class="material-icons prefix">location_city</i> Address</legend>

          <div class="row">
            <div class="input-field col s12">
              <input [(ngModel)]="contact.address.street" name="addressStreet" id="street" type="text" class="validate">
              <label class="active" for="street">Street</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input [(ngModel)]="contact.address.zip" name="addressZip" id="zip" type="text" class="validate">
              <label class="active" for="zip">Zipcode</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input [(ngModel)]="contact.address.city" name="addressCity" id="city" type="text" class="validate">
              <label class="active" for="city">City</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input [(ngModel)]="contact.address.country" name="addressCountry" id="country" type="text"  class="validate">
              <label class="active" for="country">Country</label>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="card-action">
        <button type="button" class="btn" (click)="cancel(contact)">Cancel</button>
        <button type="button" class="btn" (click)="save(contact)">Save</button>
      </div>
    </div>
  </form>
</div>
`
})
export class ContactEditorComponent implements OnActivate {
  private contact: Contact = <Contact>{address:{}};
  private contactObservable: Observable<Contact>;

  constructor(private _contactsService: ContactsService, private _router: Router) {}

  routerOnActivate(nextInstruction:ComponentInstruction, prevInstruction:ComponentInstruction):any|Promise<any> {
    let id = Number(nextInstruction.params['id']);
    this.contactObservable = this._contactsService.getContact(id);
    this.contactObservable.subscribe(x => this.contact = x);
    return true;
  }

  private save(contact: Contact) {
    this._contactsService.updateContact(contact).subscribe(x => {
      this._router.navigate(['Details', {id: contact.id}]);
    });
  }

  private cancel(contact: Contact) {
    this._router.navigate(['Details', {id: contact.id}]);
  }

}
