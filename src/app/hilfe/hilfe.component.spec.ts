import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HilfeComponent } from './hilfe.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationService } from '@anosrv-core/navigation/navigation.service';
import { HeroImageComponent } from '@anosrv-core/hero-image/hero-image.component';
import { ButtonComponent } from '@anosrv-shared/button/button.component';
import { Router } from '@angular/router';
import { IconService } from '@anosrv-core/icon.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HilfeComponent', () => {
  let component: HilfeComponent;
  let fixture: ComponentFixture<HilfeComponent>;
  let dropdown: DebugElement;
  let button: DebugElement;

  const fakeNavigationService = {
    config: {
      submenu: 'hilfe.faq-dropdown'
    },
    url: '/something/hilfe'
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  const iconSpy = jasmine.createSpy();
  const fakeIconService = {
    getIcon: (name) => {
      iconSpy(name);
      return `ICON_${name}_ICON`;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HilfeComponent,
        HeroImageComponent,
        ButtonComponent
      ],
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: IconService, useValue: fakeIconService },
        { provide: NavigationService, useValue: fakeNavigationService },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HilfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy.navigateByUrl.calls.reset();
    iconSpy.calls.reset();
    fakeNavigationService.config.submenu = 'hilfe.faq-dropdown';
    fakeNavigationService.url = '/something/hilfe';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function assureOpenDropdown() {
    dropdown = fixture.debugElement.query(By.css('.dropdown-body'));
    expect(dropdown.classes.hidden).toBeTruthy();
    button = fixture.debugElement.query(By.css('.dropdown > button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(dropdown.classes.hidden).toBe(undefined);
    expect(button.nativeElement.textContent.trim()).toBe('hilfe.faq-dropdown ICON_chevron-up_ICON');
  }

  it('should remove class.hidden when dropdown is clicked', () => {
    assureOpenDropdown();
  });

  it('should add class.hidden and closes when dropdown is clicked while open', () => {
    assureOpenDropdown();
    button.nativeElement.click();
    fixture.detectChanges();
    expect(dropdown.classes.hidden).toBeTruthy();
    expect(button.nativeElement.textContent.trim()).toBe('hilfe.faq-dropdown ICON_chevron-down_ICON');
  });

  function assureClickedUrlaub() {
    const urlaub = fixture.debugElement.query(By.css('.dropdown-body > ul > li:last-child'));
    urlaub.nativeElement.click();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/hilfe/urlaub');
    fakeNavigationService.config.submenu = 'hilfe.urlaub';
    fakeNavigationService.url = '/something/hilfe/urlaub';
    fixture.detectChanges();
    expect(button.nativeElement.textContent.trim()).toBe('hilfe.urlaub ICON_chevron-down_ICON');
  }

  it('should add class.hidden, select urlaub  and navigate to /hilfe/urlaub when urlaub is clicked', () => {
    assureOpenDropdown();
    assureClickedUrlaub();
  });

  it('should remove the urlaub element and add the faq-dropdown element when urlaub is clicked', () => {
    assureOpenDropdown();
    expect(dropdown.nativeElement.textContent.trim()).toBe('hilfe.allgemeinhilfe.urlaub');
    assureClickedUrlaub();
    expect(dropdown.nativeElement.textContent.trim()).toBe('hilfe.faq-dropdownhilfe.allgemein');
  });
});
