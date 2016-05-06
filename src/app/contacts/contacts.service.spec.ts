import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject,
  injectAsync
} from '@angular/core/testing';

import { provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import {RemoteContactsService, API_ENDPOINT} from './contacts.service';

describe('Contacts Service', () => {
  beforeEachProviders(
    () => [
      HTTP_PROVIDERS,
      provide(RemoteContactsService, {useClass: RemoteContactsService}),
      provide(API_ENDPOINT, {useValue: 'http://localhost:4200/api'})
    ]);

  it('should initialize the service correctly.',
    inject([RemoteContactsService, API_ENDPOINT], (service: RemoteContactsService) => {
      expect(service).toBeTruthy();
    }));

  it('should receive the contact lists from HTTP service correctly.',
      injectAsync([RemoteContactsService, API_ENDPOINT], (service: RemoteContactsService) => {
        const p = service.getContacts();
        p.subscribe(items => {
          expect(items.length).toEqual(11);
        });
      }));

  it('should receive the individual contact correctly from HTTP service.',
    injectAsync([RemoteContactsService, API_ENDPOINT], (service: RemoteContactsService) => {
      const p = service.getContact(9);
      p.subscribe(item => {
        expect(item.name).toEqual("Sam Thomas");
      });
    }));

  it('should fail with an error when the contact does not exist.',
    injectAsync([RemoteContactsService, API_ENDPOINT], (service: RemoteContactsService) => {
      const p = service.getContact(100);
      p.subscribe(item => {
        fail('but it receives a result: ' + item);
        console.log(item);
      }, err => {
        expect(err).toBeDefined();
      });
    }));

});
