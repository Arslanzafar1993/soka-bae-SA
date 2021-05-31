import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconSpriteComponent } from './svg-icon-sprite.component';
import { SvgIconSpriteDirective } from './svg-icon-sprite.directive';
import { SvgIconSpriteConfig } from './svg-icon-sprite-config.model';

@NgModule({
  declarations: [SvgIconSpriteComponent, SvgIconSpriteDirective],
  imports: [CommonModule],
  exports: [SvgIconSpriteComponent],
})
export class SvgIconSpriteModule {
  static forRoot(config: SvgIconSpriteConfig): ModuleWithProviders<SvgIconSpriteModule> {
    return {
      ngModule: SvgIconSpriteModule,
      providers: [{ provide: SvgIconSpriteConfig, useValue: config }],
    };
  }
}
