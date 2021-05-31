import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@anosrv-core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { MySharedModule } from '@anosrv-shared/my-shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HilfeComponent } from './hilfe.component';
import { HilfeThemenwahlComponent } from './hilfe-themenwahl/hilfe-themenwahl.component';
import { HilfeAllgemeinComponent } from './hilfe-allgemein/hilfe-allgemein.component';
import { HilfeFaqBoxComponent } from './hilfe-faq-box/hilfe-faq-box.component';
import { HilfeUrlaubComponent } from './hilfe-urlaub/hilfe-urlaub.component';


@NgModule({
  declarations: [
    HilfeComponent,
    HilfeThemenwahlComponent,
    HilfeAllgemeinComponent,
    HilfeFaqBoxComponent,
    HilfeUrlaubComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    MySharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HilfeModule { }
