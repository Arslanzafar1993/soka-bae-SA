import { Component, Input } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'anosrv-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  text: string;

  @Input()
  iconName: string;

  @Input()
  buttonId: string;

  @Input()
  smallText = false;

  @Input()
  buttonDisable = false;

  @Input()
  buttonPosition = 'left';

  @Input()
  href = '';

  @Input()
  hrefTarget = '';


  constructor(
    private iconService: IconService
  ) { }

  insertSVG(): SafeHtml {
    return this.iconService.getIcon(this.iconName, { width: '13', height: '13', color: '#fff' });
  }

}
