import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LokalisationModule } from '@anosrv-core/lokalisation';
import { TranslatePipe } from '@ngx-translate/core';
import { NavigationModule } from '@anosrv-core/navigation';
import { ToolbarComponent } from '@anosrv-core/toolbar/toolbar.component';
import { HeroImageComponent } from '@anosrv-core/hero-image/hero-image.component';
import { ToolbarUserComponent } from '@anosrv-core/toolbar-user/toolbar-user.component';
import { SidebarModule } from '@anosrv-core/side-nav-container/sidebar.module';
import { SidebarComponent } from '@anosrv-core/side-nav-container/sidebar.component';
import { HeaderComponent } from '@anosrv-core/header/header.component';
import { HeaderLightComponent } from '@anosrv-core/header-light/header-light.component';
import { InputComponent } from '@anosrv-core/inputs/input.component';
import { ProfileComponent } from '@anosrv-core/profile/profile.component';
import { SideNavContainerComponent } from '@anosrv-core/side-nav-container/side-nav-container.component';
import { EventbusDirectorDirective } from '@anosrv-core/eventbus/eventbus-director.directive';
import { SliderModule } from '@anosrv-core/slider/slider.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ToolbarLoginComponent } from '@anosrv-core/toolbar-login/toolbar-login.component';
import { FooterComponent } from '@anosrv-core/footer/footer.component';

@NgModule({
  declarations: [
    EventbusDirectorDirective,
    HeaderComponent,
    HeaderLightComponent,
    ProfileComponent,
    ToolbarComponent,
    ToolbarUserComponent,
    HeroImageComponent,
    InputComponent,
    ToolbarLoginComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LokalisationModule,
    NavigationModule.forRoot(),
    SidebarModule,
    TranslateModule,
    RouterModule,
    SliderModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    EventbusDirectorDirective,
    TranslatePipe,
    SidebarComponent,
    SideNavContainerComponent,
    HeaderComponent,
    HeaderLightComponent,
    ProfileComponent,
    ToolbarComponent,
    ToolbarUserComponent,
    SliderModule,
    HeroImageComponent,
    InputComponent,
    ToolbarLoginComponent,
    FooterComponent,
  ]
})
export class CoreModule {
  public constructor(@SkipSelf() @Optional() parent?: CoreModule) {
    if (parent) {
      throw new Error(`CoreModule has already been loaded.`);
    }
  }
}
