import { Component } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { NavigationService } from '@anosrv-core/navigation/navigation.service';
import { Router } from '@angular/router';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'anosrv-infohilfe',
  templateUrl: './hilfe.component.html',
  styleUrls: ['./hilfe.component.scss']
})
export class HilfeComponent {

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
  ) {}

  public toggle(url?: string): void {
    if (url) {
      this.router.navigateByUrl(url);
      this.faqToggle = false;
    } else {
      this.faqToggle = !this.faqToggle;
    }
  }

  public not(path: string): boolean {
    return this.navigationService.url.split('/').pop() !== path;
  }

}
