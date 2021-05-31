import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HilfeUrlaubComponent } from './hilfe-urlaub.component';
import { HilfeFaqBoxComponent } from '../hilfe-faq-box/hilfe-faq-box.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';

describe('HilfeUrlaubComponent', () => {
  let component: HilfeUrlaubComponent;
  let fixture: ComponentFixture<HilfeUrlaubComponent>;

  const translateSubject = new Subject();
  const translateServiceStub = {
    get: (name) => {
      if (name === 'hilfe.faq-urlaub.q7.points') {
        return of(['', '', '']);
      }
      return of(name);
    },
    onTranslationChange: translateSubject.asObservable(),
    onLangChange: translateSubject.asObservable(),
    onDefaultLangChange: translateSubject.asObservable()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HilfeUrlaubComponent,
        HilfeFaqBoxComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HilfeUrlaubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the current year as jahrAkutell', () => {
    expect(component.jahrAktuell.jahr).toBe((new Date()).getFullYear());
  });

  it('should return the current year minus 3 years as jahrAnspruch', () => {
    expect(component.jahrAnspruch.jahr).toBe((new Date()).getFullYear() - 2);
  });

  it('should return q7Points as array', () => {
    expect(typeof component.q7Points).toBe('object');
    expect(component.q7Points.length).toBe(3);
  });
});
