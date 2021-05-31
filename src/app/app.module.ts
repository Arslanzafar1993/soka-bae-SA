import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@anosrv-core/core.module';
import { MySharedModule } from './shared/my-shared.module';
import { SliderModule } from '@anosrv-core/slider/slider.module';
import { SvgIconSpriteModule } from './shared/svg-icon-sprite/svg-icon-sprite.module';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { StartModule } from './start/start.module';
import { UrlaubModule } from './urlaub/urlaub.module';
import { AntragsdatenModule } from './antragsdaten/antragsdaten.module';
import { HilfeModule } from './hilfe/hilfe.module';
import { FakeBackendProvider } from '@anosrv-core/fake-backend/fake-backend.interceptor';
import { environment } from '@env/environment';
import { KontaktModule } from './kontakt/kontakt.module';

const WindowProvider = { provide: Window, useValue: window };

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HammerModule,
    CoreModule,
    StartModule,
    AntragsdatenModule,
    UrlaubModule,
    MySharedModule,
    SliderModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HilfeModule,
    KontaktModule,
    SvgIconSpriteModule.forRoot({ path: 'assets/svg/SOKA-Icons.svg' }),
  ],
  providers: environment.production ? [
    // production Providers
    WindowProvider
  ] : [
    // development Providers
    // TODO:  should be deleted in release version
    //        Provider used to create fake backend
    FakeBackendProvider,
    WindowProvider
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
