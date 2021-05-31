import { async, TestBed } from '@angular/core/testing';
import {AppGuard, DeactivationGuarded} from './app.guard';
import { AppComponent } from './app.component';
import { LoginService } from '@anosrv-core/login.service';
import { Router } from '@angular/router';

describe('AppGuard', () => {
  const fakeLokingService = {
    isLoggedIn: true
  };
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  let appGuard: AppGuard;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      providers: [
        AppGuard,
        { provide: LoginService, useValue: fakeLokingService },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    appGuard = TestBed.inject(AppGuard);
  }));

  it('should create the AppGuard', () => {
    expect(appGuard).toBeTruthy();
  });

  it('should canActivate when logged in', () => {
    fakeLokingService.isLoggedIn = true;
    expect(appGuard.canActivate(null, null)).toBeTruthy();
  });

  it('should not canActivate when not logged in and navigate to /login', () => {
    fakeLokingService.isLoggedIn = false;
    expect(appGuard.canActivate(null, null)).not.toBeTruthy();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should return the value of a Components canDeactivate function as canDeactivate', () => {
    const fakeComp1 = {
      canDeactivate: () => false
    };
    const fakeComp2 = {
      canDeactivate: () => true
    };
    expect(appGuard.canDeactivate(fakeComp1, null, null, null)).not.toBeTruthy();
    expect(appGuard.canDeactivate(fakeComp2, null, null, null)).toBeTruthy();
  });

  it('should return TRUE for canDeativate if the current Component does not have a canDeactivate', () => {
    const fakeComp = {};
    expect(appGuard.canDeactivate(fakeComp as DeactivationGuarded, null, null, null)).toBeTruthy();
  });
});
