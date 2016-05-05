import 'rxjs/Rx';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { bootstrapStatic } from '@angular/platform-browser';
import { provide, enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {provideStore} from '@ngrx/store';

import { Angular2StarterAppComponent, environment } from './app';
import { ContactsService, IContactsService } from "./app/contacts";

let deps = [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide('API_ENDPOINT', {useValue: 'http://localhost:4200/api'}),
  provide('IContactsService', {useClass: ContactsService})
];

if (environment.production) {
  enableProdMode();
  bootstrapStatic(Angular2StarterAppComponent, deps);
}
else {
  bootstrap(Angular2StarterAppComponent, deps);
}

