import { Component, Input } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'anosrv-hilfe-faq-box',
  templateUrl: './hilfe-faq-box.component.html',
  styleUrls: ['./hilfe-faq-box.component.scss']
})
export class HilfeFaqBoxComponent {

  @Input()
  title: string;

  public expanded = false;

  get frageIcon(): SafeHtml {
    return this.iconService.getIcon('fragezeichen', { height: '28', width: '28' });
  }

  get chevron(): SafeHtml {
    return this.expanded ? this.iconService.getIcon('chevron-up') : this.iconService.getIcon('chevron-down');
  }

  constructor(
    private iconService: IconService
  ) { }

  public toggle() {
    this.expanded = ! this.expanded;
  }
}
