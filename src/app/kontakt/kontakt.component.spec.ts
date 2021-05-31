
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KontaktComponent } from './kontakt.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationService } from '@anosrv-core/navigation/navigation.service';
import { HeroImageComponent } from '@anosrv-core/hero-image/hero-image.component';
import { ButtonComponent } from '@anosrv-shared/button/button.component';
import { Router } from '@angular/router';
import { IconService } from '@anosrv-core/icon.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('KontaktComponent', () => {
  let component: KontaktComponent;
  let fixture: ComponentFixture<KontaktComponent>;
  let dropdown: DebugElement;
  let button: DebugElement;

  const fakeNavigationService = {
    config: {
      submenu: 'Kontakt.faq-dropdown'
    },
    url: '/Kontakt'
  };
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  const iconSpy = jasmine.createSpy();
  const fakeIconService = {
    getIcon: (name) => {
      iconSpy(name);
      return `ICON_${name}_ICON`;
    }
  };
});

