import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'anosrv-header-light',
  templateUrl: './header-light.component.html',
  styleUrls: ['./header-light.component.scss'],
})
export class HeaderLightComponent {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
}
