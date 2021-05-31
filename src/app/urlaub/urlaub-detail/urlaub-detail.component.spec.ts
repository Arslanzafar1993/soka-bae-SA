import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubDetailComponent } from './urlaub-detail.component';

xdescribe('UrlaubDetailComponent', () => {
  let component: UrlaubDetailComponent;
  let fixture: ComponentFixture<UrlaubDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
