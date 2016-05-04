import {Observable} from "rxjs/Observable";
import {Contact} from "../models";

export interface IContactsService {
  getContacts(): Observable<Array<Contact>>;
  getContact(id: number): Observable<Contact>;
  updateContact(contact: Contact);
}
