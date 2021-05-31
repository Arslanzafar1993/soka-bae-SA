import { Component } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { NavigationService } from '@anosrv-core/navigation/navigation.service';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'anosrv-kontakt',
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss']
})
export class KontaktComponent {

  public faqToggle = false;

  get selected(): string {
    return this.navigationService.config.submenu;
  }

  get chevron(): SafeHtml {
    return this.faqToggle ? this.iconService.getIcon('chevron-up') : this.iconService.getIcon('chevron-down');
  }

  constructor(
    public iconService: IconService,
    private navigationService: NavigationService,
    private router: Router
  ) { }
}
