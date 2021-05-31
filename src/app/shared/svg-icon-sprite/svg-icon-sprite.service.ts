import { Injectable, Optional } from '@angular/core';
import { SvgIconSpriteConfig } from './svg-icon-sprite-config.model';

/**
 * To access a global sprite path
 */
@Injectable({
  providedIn: 'root',
})
export class SvgIconSpriteService {
  public spritePath: string;

  constructor(@Optional() config: SvgIconSpriteConfig) {
    if (config) {
      this.setPath(config.path);
    }
  }

  setPath(path: string) {
    this.spritePath = path;
  }

  getPath(): string {
    return this.spritePath;
  }
}
