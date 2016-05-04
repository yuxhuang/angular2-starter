import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Angular2StarterAppComponent } from '../app/angular2-starter.component';

beforeEachProviders(() => [Angular2StarterAppComponent]);

describe('App: Angular2Starter', () => {
  it('should create the app',
      inject([Angular2StarterAppComponent], (app: Angular2StarterAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'angular2-starter works!\'',
      inject([Angular2StarterAppComponent], (app: Angular2StarterAppComponent) => {
    expect(app.title).toEqual('angular2-starter works!');
  }));
});
