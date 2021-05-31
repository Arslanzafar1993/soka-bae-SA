import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './carousel/carousel.module';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalModule } from './modal/modal.modoule';
import { ModalComponent } from './modal/modal.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { ButtonComponent } from './button/button.component';
import { ErrorComponent } from './error/error.component';
import { SvgIconSpriteModule } from './svg-icon-sprite/svg-icon-sprite.module';
import { InfoIComponent } from './info-i/info-i.component';

@NgModule({
  declarations: [
    EditButtonComponent,
    ButtonComponent,
    ErrorComponent,
    InfoIComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SvgIconSpriteModule,
    ModalModule,
    NgSelectModule
  ],
  exports: [
    CarouselComponent,
    ModalComponent,
    EditButtonComponent,
    NgSelectModule,
    ButtonComponent,
    ErrorComponent,
    InfoIComponent
  ],
})
export class MySharedModule {}
