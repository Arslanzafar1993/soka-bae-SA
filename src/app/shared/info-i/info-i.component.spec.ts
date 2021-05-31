import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoIComponent } from './info-i.component';
import { IconService } from '@anosrv-core/icon.service';
import { ModalService } from '@anosrv-core/modal.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('InfoIComponent', () => {
  let component: InfoIComponent;
  let fixture: ComponentFixture<InfoIComponent>;
  let element: DebugElement;

  const modalSpy = jasmine.createSpy();
  const modalServiceStub = {
    open: modalSpy
  };

  const iconSpy = jasmine.createSpy();
  const iconServiceStub = {
    getIcon: (name) => {
      iconSpy(name);
      return `ICON_${name}_ICON`;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoIComponent ],
      providers: [
        { provide: IconService, useValue: iconServiceStub },
        { provide: ModalService, useValue: modalServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('span.info-i'));

    modalSpy.calls.reset();
    iconSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal with name when component is clicked', () => {
    component.name = `${Math.random()}`;
    fixture.detectChanges();
    element.nativeElement.click();
    fixture.detectChanges();
    expect(modalSpy).toHaveBeenCalledWith(component.name);
  });

  it('should open modal with name when overlay is clicked', () => {
    component.name = `${Math.random()}`;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('span.overlay'));
    element.nativeElement.click();
    fixture.detectChanges();
    expect(modalSpy).toHaveBeenCalledWith(component.name);
  });

  it('should load info icon via IconSerice', () => {
    expect(element.nativeElement.textContent.trim()).toBe('ICON_info_ICON');
  });
});
