import { Component } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';

@Component({
  selector: 'anosrv-hilfe-themenwahl',
  templateUrl: './hilfe-themenwahl.component.html',
  styleUrls: ['./../hilfe.component.scss']
})
export class HilfeThemenwahlComponent {

  constructor(
    public iconService: IconService
  ) { }
}
