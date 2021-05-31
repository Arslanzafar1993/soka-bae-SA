import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubGuthabenComponent } from './urlaub-guthaben.component';

xdescribe('UrlaubGuthabenComponent', () => {
  let component: UrlaubGuthabenComponent;
  let fixture: ComponentFixture<UrlaubGuthabenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlaubGuthabenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubGuthabenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
