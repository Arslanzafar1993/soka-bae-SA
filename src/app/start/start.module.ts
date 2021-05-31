import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start.component';
import { TileComponent } from './tile/tile.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@anosrv-core/core.module';
import { SvgIconSpriteModule } from '../shared/svg-icon-sprite/svg-icon-sprite.module';


@NgModule({
  declarations: [
    StartComponent,
    TileComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SvgIconSpriteModule,
    RouterModule],
  exports: [
    StartComponent
  ]
})

export class StartModule {}
