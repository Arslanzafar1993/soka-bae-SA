import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider.component';
import { ProgessbarComponent } from './progessbar/progessbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SliderComponent,
    ProgessbarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    SliderComponent,
    ProgessbarComponent
  ],
})
export class SliderModule {}
