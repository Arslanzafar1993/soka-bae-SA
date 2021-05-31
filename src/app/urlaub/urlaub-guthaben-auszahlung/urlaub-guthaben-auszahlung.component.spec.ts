import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubGuthabenAuszahlungComponent } from './urlaub-guthaben-auszahlung.component';

xdescribe('UrlaubGuthabenAuszahlungComponent', () => {
  let component: UrlaubGuthabenAuszahlungComponent;
  let fixture: ComponentFixture<UrlaubGuthabenAuszahlungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubGuthabenAuszahlungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubGuthabenAuszahlungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
