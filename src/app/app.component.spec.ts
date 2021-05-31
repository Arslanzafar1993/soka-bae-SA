import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    const translateServiceSpy = jasmine.createSpyObj('translateService', ['setDefaultLang', 'use']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, TranslatePipe],
      providers: [UserStoreService, HttpClient, HttpHandler, { provide: TranslateService, useValue: translateServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
