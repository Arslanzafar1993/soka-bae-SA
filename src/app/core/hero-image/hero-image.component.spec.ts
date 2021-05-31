import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroImageComponent } from './hero-image.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroImageComponent', () => {
  let component: HeroImageComponent;
  let fixture: ComponentFixture<HeroImageComponent>;

  beforeEach(async(() => {
   TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ HeroImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
