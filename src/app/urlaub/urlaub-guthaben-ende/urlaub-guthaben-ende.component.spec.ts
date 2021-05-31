import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubGuthabenEndeComponent } from './urlaub-guthaben-ende.component';

xdescribe('UrlaubGuthabenEndeComponent', () => {
  let component: UrlaubGuthabenEndeComponent;
  let fixture: ComponentFixture<UrlaubGuthabenEndeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlaubGuthabenEndeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubGuthabenEndeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
