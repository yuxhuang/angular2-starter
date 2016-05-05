import {Observable} from 'rxjs/Observable';
import {ViewEncapsulation, Component, Output, EventEmitter} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'contacts-keyword-search',
  template: `<input #box (keyup)="keywordChanged.emit(box.value)" placeholder="enter keyword">`,
  directives: [],
  pipes: [],
  encapsulation: ViewEncapsulation.Emulated,
  providers: []
})
export class ContactsKeywordSearchComponent {
  @Output() keywordChanged = new EventEmitter();
}
