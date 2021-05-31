import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlaubGuthabenBestaetigungComponent } from './urlaub-guthaben-bestaetigung.component';

xdescribe('UrlaubGuthabenBestaetigungComponent', () => {
  let component: UrlaubGuthabenBestaetigungComponent;
  let fixture: ComponentFixture<UrlaubGuthabenBestaetigungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlaubGuthabenBestaetigungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlaubGuthabenBestaetigungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
