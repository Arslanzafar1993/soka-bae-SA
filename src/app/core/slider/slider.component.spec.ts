import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { UrlaubService } from '@anosrv-core/urlaub.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [SliderComponent],
      providers: [UserStoreService, UrlaubService, HttpClient, HttpHandler, { provide: Window, useValue: window }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
