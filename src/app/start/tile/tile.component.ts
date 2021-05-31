import { Component, Input } from '@angular/core';

@Component({
  selector: 'anosrv-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  @Input()
  backgroundImage: string;

  @Input()
  backgroundImageDesktop: string;

  @Input()
  svgIcon: string;

  @Input()
  text: string;

  @Input()
  showAlertIcon = false;

  @Input()
  showInfoLayer = false;

  @Input()
  masked = false;

  @Input()
  showInfoLayerText: string;

  constructor() { }

}
