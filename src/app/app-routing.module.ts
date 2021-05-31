import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { UserComponent } from './user/user.component';
import { UrlaubComponent } from './urlaub/urlaub.component';
import { UrlaubDetailComponent } from './urlaub/urlaub-detail/urlaub-detail.component';
import { UrlaubDetailJahreComponent } from './urlaub/urlaub-detail-jahre/urlaub-detail-jahre.component';
import { UrlaubGuthabenComponent } from './urlaub/urlaub-guthaben/urlaub-guthaben.component';
import {
  UrlaubGuthabenAuszahlungComponent
} from './urlaub/urlaub-guthaben-auszahlung/urlaub-guthaben-auszahlung.component';
import {
  UrlaubGuthabenPruefungComponent
} from './urlaub/urlaub-guthaben-pruefung/urlaub-guthaben-pruefung.component';
import {
  UrlaubGuthabenZusammenfassungComponent
} from './urlaub/urlaub-guthaben-zusammenfassung/urlaub-guthaben-zusammenfassung.component';
import {
  UrlaubGuthabenBestaetigungComponent
} from './urlaub/urlaub-guthaben-bestaetigung/urlaub-guthaben-bestaetigung.component';
import { UrlaubGuthabenEndeComponent } from './urlaub/urlaub-guthaben-ende/urlaub-guthaben-ende.component';
import { UrlaubAntragResolverService } from '@anosrv-core/urlaub-antrag-resolver.service';
import { LaenderResolverService } from '@anosrv-core/laender-resolver.service';
import { AppGuard } from './app.guard';
import { LoginComponent } from './login/login.component';
import { AntragsdatenComponent } from './antragsdaten/antragsdaten.component';
import { HilfeComponent } from './hilfe/hilfe.component';
import { HilfeThemenwahlComponent } from './hilfe/hilfe-themenwahl/hilfe-themenwahl.component';
import { HilfeAllgemeinComponent } from './hilfe/hilfe-allgemein/hilfe-allgemein.component';
import { HilfeUrlaubComponent } from './hilfe/hilfe-urlaub/hilfe-urlaub.component';
import { KontaktComponent } from './kontakt/kontakt.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [ AppGuard ], component: StartComponent },
  { path: 'urlaub', canActivate: [ AppGuard ], component: UrlaubComponent },
  { path: 'urlaub/detail', canActivate: [ AppGuard ], component: UrlaubDetailComponent },
  { path: 'urlaub/detail/jahre', canActivate: [ AppGuard ], component: UrlaubDetailJahreComponent },
  { path: 'urlaub/guthaben', canActivate: [ AppGuard ], component: UrlaubGuthabenComponent },
  {
    path: 'urlaub/guthaben/auszahlung',
    component: UrlaubGuthabenAuszahlungComponent,
    canActivate: [ AppGuard ],
    canDeactivate: [ AppGuard ],
    resolve: {
      combinedData: UrlaubAntragResolverService
    }
  },
  {
    path: 'urlaub/guthaben/pruefung', component: UrlaubGuthabenPruefungComponent,
    canActivate: [ AppGuard ],
    canDeactivate: [ AppGuard ],
    resolve: { laender: LaenderResolverService }
  },
  {
    path: 'urlaub/guthaben/zusammenfassung', component: UrlaubGuthabenZusammenfassungComponent,
    canActivate: [ AppGuard ],
    canDeactivate: [ AppGuard ]
  },
  {
    path: 'urlaub/guthaben/bestaetigung', component: UrlaubGuthabenBestaetigungComponent,
    canActivate: [ AppGuard ]
  },
  {
    path: 'urlaub/guthaben/ende', component: UrlaubGuthabenEndeComponent,
    canActivate: [ AppGuard ],
  },
  {
    path: 'user',
    component: UserComponent,
    canDeactivate: [ AppGuard ],
    canActivate: [ AppGuard ],
    resolve: { laender: LaenderResolverService }
  },
  {
    path: 'antragsdaten',
    component: AntragsdatenComponent,
    canActivate: [ AppGuard ],
    resolve: { laender: LaenderResolverService }
  },
  {
    path: 'hilfe',
    canActivate: [ AppGuard ],
    component: HilfeComponent,
    children: [
      {
        path: '',
        component: HilfeThemenwahlComponent
      },
      {
        path: 'allgemein',
        component: HilfeAllgemeinComponent
      },
      {
        path: 'urlaub',
        component: HilfeUrlaubComponent
      }
    ]
  },
  {
    path: 'kontakt',
    component: KontaktComponent,
    canDeactivate: [ AppGuard ],
    canActivate: [ AppGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
