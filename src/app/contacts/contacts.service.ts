import {Observable} from "rxjs/Observable";

import {Injectable, Inject, OpaqueToken} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";

import {Contact} from "../models";

export const API_ENDPOINT = new OpaqueToken('API_ENDPOINT');

@Injectable()
export abstract class ContactsService {
  abstract getContacts(): Observable<Array<Contact>>;
  abstract getContact(id: number): Observable<Contact>;
  abstract  updateContact(contact: Contact): Observable<Contact>;
}

export class RemoteContactsService extends ContactsService {
  constructor(@Inject(API_ENDPOINT) private apiRoot: string, private _http: Http) {
    super();
  }

  getContacts(): Observable<Array<Contact>> {
    return this._http
      .get(this.apiRoot + '/contacts')
      .map(this.extractData)
      .map(x => x.items)
      .catch(this.handleError);
  }

  getContact(id: number): Observable<Contact> {
    return this._http
      .get(this.apiRoot + `/contacts/${id}`)
      .map(this.extractData)
      .map(x => x.item)
      .catch(this.handleError);
  }

  updateContact(contact: Contact) {
    let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});
    return this._http
      .put(this.apiRoot + `/contacts/${contact.id}`, JSON.stringify(contact), headers)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
