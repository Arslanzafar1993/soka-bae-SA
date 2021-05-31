import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HilfeThemenwahlComponent } from './hilfe-themenwahl.component';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IconService } from '@anosrv-core/icon.service';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '@anosrv-shared/button/button.component';


describe('HilfeThemenwahlComponent', () => {
  let component: HilfeThemenwahlComponent;
  let fixture: ComponentFixture<HilfeThemenwahlComponent>;

  const iconServiceStub = {
    getIcon: name => `ICON_${name}_ICON`
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HilfeThemenwahlComponent,
        ButtonComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: IconService, useValue: iconServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HilfeThemenwahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
 });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load correct icons and translations for section headers', () => {
    const sections = fixture.debugElement.queryAll(By.css('.section-header'));
    expect(sections.length).toBe(3);
    expect(sections[0].nativeElement.textContent).toBe('ICON_soka_ICONhilfe.allgemein');
    expect(sections[1].nativeElement.textContent).toBe('ICON_urlaub_ICONhilfe.urlaub');
    expect(sections[2].nativeElement.textContent).toBe('ICON_phone_ICONhilfe.hotline');
  });
});
