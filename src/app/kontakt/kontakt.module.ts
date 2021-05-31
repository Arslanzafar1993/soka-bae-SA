import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KontaktComponent } from './kontakt.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@anosrv-core/core.module';
import { SvgIconSpriteModule } from '../shared/svg-icon-sprite/svg-icon-sprite.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MySharedModule } from '@anosrv-shared/my-shared.module';


@NgModule({
  declarations: [KontaktComponent],
  imports: [CommonModule, TranslateModule, CoreModule, SvgIconSpriteModule, RouterModule, MySharedModule, ReactiveFormsModule, FormsModule],
})

export class KontaktModule {}
