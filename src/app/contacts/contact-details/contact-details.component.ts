import {Component} from '@angular/core';

import {ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree, UrlSegment} from '@angular/router';

import {Contact} from "../../models";
import {ContactsService} from "../contacts.service";

@Component({
  moduleId: module.id,
  selector: 'contact-detail',
  providers: [ContactsService],
  template: `<div class="row">
  <div class="col s12 m7">
    <div class="card">
      <div class="card-image" *ngIf="contact?.image">
        <img [src]="contact?.image">
        <span class="card-title">{{ contact?.name }}</span>
      </div>
      <div class="card-content grey-text text-darken-4">
        <div class="row">
          <span class="col s6"><i class="material-icons prefix">email</i> Email:</span>
          <span class="col s6">{{ contact?.email }}</span>
        </div>
        <div class="row">
          <span class="col s6"><i class="material-icons prefix">phone</i> Phone:</span>
          <span class="col s6">{{ contact?.phone }}</span>
        </div>
        <div class="row">
          <span class="col s6"><i class="material-icons prefix">cake</i> Birthday:</span>
          <span class="col s6">{{ contact?.birthday }}</span>
        </div>
        <div class="row">
          <span class="col s6"><i class="material-icons prefix">public</i> Website:</span>
          <span class="col s6">{{ contact?.website }}</span>
        </div>
        <fieldset>
          <legend><i class="material-icons prefix">location_city</i> Address</legend>
          <div class="row">
            <span class="col s6">Street:</span>
            <span class="col s6">{{ contact?.address?.street }}</span>
          </div>
          <div class="row">
            <span class="col s6">Zipcode:</span>
            <span class="col s6">{{ contact?.address?.zip }}</span>
          </div>
          <div class="row">
            <span class="col s6">City:</span>
            <span class="col s6">{{ contact?.address?.city }}</span>
          </div>
          <div class="row">
            <span class="col s6">Country:</span>
            <span class="col s6">{{ contact?.address?.country }}</span>
          </div>
        </fieldset>
      </div>
      <div class="card-action">
        <a class="btn" [routerLink]="baseSegments">Go Back</a>
        <a class="btn" [routerLink]="editSegments.concat([contact?.id])">Edit</a>
      </div>
    </div>
  </div>
</div>
`,
  directives: [ROUTER_DIRECTIVES],
})
export class ContactDetailsComponent implements OnActivate {

  private contact: Contact;
  private baseSegments: Array<string>;
  private editSegments: Array<string>;

  constructor(private _contactsService: ContactsService) {}

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    let id = Number(curr.getParam('id'));
    this._contactsService.getContact(id).subscribe(contact => this.contact = contact);
    this.baseSegments = currTree.parent(curr).urlSegments.map((x: UrlSegment) => x.segment);
    this.baseSegments.unshift('/');
    this.editSegments = this.baseSegments.concat(['edit']);
  }

}
