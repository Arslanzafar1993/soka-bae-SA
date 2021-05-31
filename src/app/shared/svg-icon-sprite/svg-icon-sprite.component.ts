import { SvgIconSpriteService } from './svg-icon-sprite.service';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'anosrv-svg-icon-sprite',
  styleUrls: ['./svg-icon-sprite.component.scss'],
  templateUrl: './svg-icon-sprite.component.html',
})
export class SvgIconSpriteComponent implements OnChanges {
  @Input() public src: string;
  @Input() public classes = 'icon';
  @Input() public width = '100%';
  @Input() public height: string;
  @Input() public viewBox: string;
  @Input() public preserveAspectRatio = 'xMinYMax meet';
  @Input() public attribute: [string, string] | Array<[string, string]>;
  @Input() public title: string;

  constructor(private iconSpriteService: SvgIconSpriteService) {}

  ngOnChanges(changes) {
    // If the src does not contain a # and a spritePath is set via the service, concatenate them
    if (this.src && !this.src.includes('#') && this.iconSpriteService.spritePath) {
      this.src = `${this.iconSpriteService.getPath()}#${this.src}`;
    }
  }
}
