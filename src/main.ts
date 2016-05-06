import 'rxjs/Rx';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import { ContactsService, RemoteContactsService } from './app/contacts';

import { Angular2StarterAppComponent, environment } from './app';

let deps = [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide('API_ENDPOINT', {useValue: 'http://localhost:4200/api'}),
  provide(ContactsService, {useClass: RemoteContactsService}),
];

if (environment.production) {
  enableProdMode();
  bootstrap(Angular2StarterAppComponent, deps);
}
else {
  bootstrap(Angular2StarterAppComponent, deps);
}
