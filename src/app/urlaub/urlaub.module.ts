import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlaubComponent } from './urlaub.component';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '@anosrv-core/core.module';
import { MySharedModule } from './../shared/my-shared.module';
import { UrlaubDetailComponent } from './urlaub-detail/urlaub-detail.component';
import { UrlaubDetailJahreComponent } from './urlaub-detail-jahre/urlaub-detail-jahre.component';
import { UrlaubGuthabenOverlayComponent } from './urlaub-guthaben-overlay.component';
import { UrlaubGuthabenComponent } from './urlaub-guthaben/urlaub-guthaben.component';
import { RouterModule } from '@angular/router';
import { UrlaubGuthabenAuszahlungComponent } from './urlaub-guthaben-auszahlung/urlaub-guthaben-auszahlung.component';
import { UrlaubGuthabenPruefungComponent } from './urlaub-guthaben-pruefung/urlaub-guthaben-pruefung.component';
import { UrlaubGuthabenZusammenfassungComponent } from './urlaub-guthaben-zusammenfassung/urlaub-guthaben-zusammenfassung.component';
import { UrlaubGuthabenBestaetigungComponent } from './urlaub-guthaben-bestaetigung/urlaub-guthaben-bestaetigung.component';
import { UrlaubGuthabenEndeComponent } from './urlaub-guthaben-ende/urlaub-guthaben-ende.component';

@NgModule({
  declarations: [
    UrlaubComponent,
    UrlaubDetailComponent,
    UrlaubDetailJahreComponent,
    UrlaubGuthabenOverlayComponent,
    UrlaubGuthabenComponent,
    UrlaubGuthabenAuszahlungComponent,
    UrlaubGuthabenPruefungComponent,
    UrlaubGuthabenZusammenfassungComponent,
    UrlaubGuthabenBestaetigungComponent,
    UrlaubGuthabenEndeComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    MySharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UrlaubModule { }
