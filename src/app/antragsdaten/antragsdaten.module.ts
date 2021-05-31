import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AntragsdatenComponent } from './antragsdaten.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@anosrv-core/core.module';
import { SvgIconSpriteModule } from '../shared/svg-icon-sprite/svg-icon-sprite.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AntragsdatenComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SvgIconSpriteModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [AntragsdatenComponent]
})

export class AntragsdatenModule {}
