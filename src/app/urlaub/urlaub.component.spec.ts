import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubComponent } from './urlaub.component';

xdescribe('UrlaubComponent', () => {
  let component: UrlaubComponent;
  let fixture: ComponentFixture<UrlaubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
