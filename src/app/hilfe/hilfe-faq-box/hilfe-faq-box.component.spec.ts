import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HilfeFaqBoxComponent } from './hilfe-faq-box.component';
import { IconService } from '@anosrv-core/icon.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HilfeFaqBoxComponent', () => {
  let component: HilfeFaqBoxComponent;
  let fixture: ComponentFixture<HilfeFaqBoxComponent>;

  let header: DebugElement;
  let body: DebugElement;

  const iconServiceStub = {
    getIcon: (name) => `ICON_${name}_ICON`
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HilfeFaqBoxComponent
      ],
      providers: [
        { provide: IconService, useValue: iconServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HilfeFaqBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    header = fixture.debugElement.query(By.css('.faq-header'));
    body = fixture.debugElement.query(By.css('.faq-body'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expanded when toggled', () => {
    expect(component.expanded).toBeFalse();
    component.toggle();
    fixture.detectChanges();
    expect(component.expanded).toBeTruthy();
  });

  it('should switch chevron when expanded', () => {
    expect(component.chevron).toBe('ICON_chevron-down_ICON');
    component.expanded = true;
    fixture.detectChanges();
    expect(component.chevron).toBe('ICON_chevron-up_ICON');
  });

  it('should remove class hidden when expanded', () => {
    expect(body.classes.hidden).toBeTruthy();
    component.expanded = true;
    fixture.detectChanges();
    expect(body.classes.hidden).toBe(undefined);
  });

  it('should toggle expanded state when header is clicked', () => {
    expect(component.expanded).toBeFalse();
    header.nativeElement.click();
    fixture.detectChanges();
    expect(component.expanded).toBeTruthy();
  });

  it('should construct propper header', () => {
    component.title = `${Math.random()}`;
    fixture.detectChanges();
    expect(header.nativeElement.textContent).toBe(`ICON_fragezeichen_ICON${component.title}ICON_chevron-down_ICON`);
    header.nativeElement.click();
    fixture.detectChanges();
    expect(header.nativeElement.textContent).toBe(`ICON_fragezeichen_ICON${component.title}ICON_chevron-up_ICON`);
  });
});
