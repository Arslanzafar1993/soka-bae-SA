import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonEl: DebugElement;

  const iconSpy = jasmine.createSpy();

  const fakeIconService = {
    getIcon: (name) => {
      iconSpy(name);
      return `SAFEHTML`;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      providers: [
        { provide: IconService, useValue: fakeIconService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonEl = fixture.debugElement.query(By.css('button'));
    iconSpy.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setting buttonDisable to TRUE disables the button', () => {
    component.buttonDisable = true;
    fixture.detectChanges();
    expect(buttonEl.nativeElement.disabled).toBeTruthy();
  });

  it('should contain a link when a HREF is given', () => {
    component.href = `http://${Math.random()}/`;
    component.text = `${Math.random()}`;
    fixture.detectChanges();
    const linkEl: DebugElement = fixture.debugElement.query(By.css('a'));
    expect(linkEl.nativeElement.href).toBe(component.href);
    expect(linkEl.nativeElement.textContent.trim()).toBe(component.text);
  });

  it('should contain a link with target, when href and hrefTarget are given', () => {
    component.href = `http://${Math.random()}/`;
    component.hrefTarget = '_blank';
    component.text = `${Math.random()}`;
    fixture.detectChanges();
    const linkEl: DebugElement = fixture.debugElement.query(By.css('a'));
    expect(linkEl.nativeElement.href).toBe(component.href);
    expect(linkEl.nativeElement.target).toBe(component.hrefTarget);
    expect(linkEl.nativeElement.textContent.trim()).toBe(component.text);
  });

  it('should not contain a link when no HREF is given', () => {
    component.href = '';
    fixture.detectChanges();
    const linkEl: DebugElement = fixture.debugElement.query(By.css('a'));
    expect(linkEl).toBeNull();
  });

  it('should have buttonId as the buttons ID', () => {
    component.buttonId = `${Math.random()}`;
    fixture.detectChanges();
    expect(buttonEl.nativeElement.id).toBe(component.buttonId);
  });

  it('should add the class smallText if smallText is TRUE', () => {
    component.smallText = true;
    fixture.detectChanges();
    expect(buttonEl.classes.smallText).toBeTruthy();
  });

  function setupIcon() {
    component.iconName = `${Math.random()}`;
    component.text = 'TEXT';
    fixture.detectChanges();
    expect(iconSpy).toHaveBeenCalledWith(component.iconName);
  }

  it('should place an Icon in front of the TEXT if iconName is given', () => {
    setupIcon();
    expect(buttonEl.nativeElement.textContent.trim()).toBe('SAFEHTML TEXT');
    const iconEl = fixture.debugElement.query(By.css('span.icon'));
    expect(iconEl.classes.icon).toBeTruthy();
  });

  it('should put the icon after the TEXT if iconName is given and buttonPosition is "right"', () => {
    component.buttonPosition = 'right';
    setupIcon();
    expect(buttonEl.nativeElement.textContent.trim()).toBe('TEXT SAFEHTML');
    const iconEl = fixture.debugElement.query(By.css('span.icon'));
    expect(iconEl.classes.icon).toBeTruthy();
    expect(iconEl.classes.hasOwnProperty('icon-right')).toBeTruthy();
  });
});
