import {Observable} from "rxjs/Observable";

import {Component, ViewEncapsulation, Pipe, PipeTransform} from '@angular/core';
import {ROUTER_DIRECTIVES, OnActivate, ComponentInstruction} from "@angular/router-deprecated";

import {Contact} from "../models";
import {ContactsService} from "./contacts.service";
import {ContactsListItemComponent} from "./contacts-list-item.component";
import {ContactsKeywordSearchComponent} from "./contacts-keyword-search.component";
import EventEmitter = protractor.EventEmitter;

@Pipe({name: 'contactsByKeyword'})
class ContactsByKeywordPipe implements PipeTransform {
  transform(value:Array<Contact>, keyword: string): Array<Contact> {
    return value ? value.filter((c: Contact) => {
      return !!c.name && c.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    }) : [];
  }
}
@Component({
  moduleId: module.id,
  selector: 'contacts-list',
  template: `
<contacts-keyword-search (keywordChanged)="keyword = $event"></contacts-keyword-search>
<ul class="collection">
  <li class="collection-item avatar" *ngFor="let item of contacts | async | contactsByKeyword: keyword">
    <contacts-list-item [item]="item"></contacts-list-item> 
  </li>
</ul>
`,
  directives: [ROUTER_DIRECTIVES, ContactsListItemComponent, ContactsKeywordSearchComponent],
  pipes: [ContactsByKeywordPipe],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [ContactsService]
})
export class ContactsListComponent implements OnActivate {

  private contacts: Observable<Array<Contact>>;
  private keyword: string = '';

  constructor(private _contactsService: ContactsService) {}

  routerOnActivate(nextInstruction:ComponentInstruction, prevInstruction:ComponentInstruction) {
    this.contacts = this._contactsService.getContacts();
    return true;
  }
}
