import 'rxjs/Rx';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { Angular2StarterAppComponent, environment } from './app';

let deps = [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide('API_ENDPOINT', {useValue: 'http://localhost:4200/api'})
];

if (environment.production) {
  enableProdMode();
  bootstrap(Angular2StarterAppComponent, deps);
}
else {
  bootstrap(Angular2StarterAppComponent, deps);
}
