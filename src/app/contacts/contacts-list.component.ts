import {Observable} from "rxjs/Observable";

import {Component, ViewEncapsulation, Pipe, PipeTransform} from '@angular/core';
import {ROUTER_DIRECTIVES, OnActivate, RouteSegment, RouteTree, UrlSegment} from "@angular/router";

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
    <contacts-list-item [item]="item" [detailItemSegments]="showSegments.concat([item.id])"></contacts-list-item> 
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
  private showSegments: Array<string>;
  private keyword: string = '';

  constructor(private _contactsService: ContactsService) {}

  routerOnActivate(curr:RouteSegment, prev?:RouteSegment, currTree?:RouteTree, prevTree?:RouteTree):void {
    this.showSegments = currTree.parent(curr).urlSegments.map((x: UrlSegment) => x.segment);
    this.showSegments.unshift('/');
    this.showSegments.push('show');
    this.contacts = this._contactsService.getContacts();
  }
}
