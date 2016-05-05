import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'contact-header',
  template: `<div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper">
      <span class="brand-logo center">Contacts</span>
    </div>
  </nav>
</div>
`,
  directives: []
})
export class ContactHeaderComponent {
  constructor() {}
}
