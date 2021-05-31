import {discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick} from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClient, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

describe('LoginService', () => {
  let service: LoginService;
  const fakeRouter = {
    navigateByUrl: (url) => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        { provide: Router, useValue: fakeRouter}
      ]
    });
    service = TestBed.inject(LoginService);
    spyOn(fakeRouter, 'navigateByUrl');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fire a updateTokenTrigger 5 minutes after last update', fakeAsync(() => {
    // make sure user is logged in
    const fakeHttp = {
      post: (url, body, headers) => of(new HttpResponse({
        status: 200,
        body: { payload: { token: 'foo' } }
      })),
      head: (url, headers) => of(new HttpResponse({ status: 204 }))
    };
    service = new LoginService(fakeHttp as HttpClient, fakeRouter as Router);
    service.login('foo', 'bar').subscribe((result) => {
      expect(service.token).toBe('Bearer foo');
    });
    let res = false;

    service.$updateTokenTrigger.subscribe(() => {
      res = true;
    });
    // wait 6 minutes
    tick(1000 * 60 * 6);
    expect(res).toBeTruthy();
    service.logout();
    flush();
  }));

  it('should extract and refresh token from responses with headers in lowercase', () => {
    const response = new HttpResponse({
      headers: new HttpHeaders({
        authorization: 'Bearer foo'
      })
    });
    service.extractToken(response);
    expect(service.token).toBe('Bearer foo');
  });

  it('should extract and refresh token from responses with headers in Upper-Kebab-Case', () => {
    const response = new HttpResponse({
      headers: new HttpHeaders({
        Authorization: 'Bearer foo'
      })
    });
    service.extractToken(response);
    expect(service.token).toBe('Bearer foo');
  });

  it('should not replace/replace token from responses with no auth headers', () => {
    const response = new HttpResponse({
      headers: new HttpHeaders()
    });
    const bearer = `Bearer ${Math.random()}`;
    service.token = bearer;
    service.extractToken(response);
    expect(service.token).toBe(bearer);
  });

  it('should logout and navigate to login when receiving an error response 401', () => {
    const response = new HttpResponse({
      status: 401,
      headers: new HttpHeaders({
        Authorization: 'Bearer foo'
      })
    });
    const fakeHttp = { head: (url, options) => of( new HttpResponse({ status: 204 }))};
    service = new LoginService(fakeHttp as HttpClient, fakeRouter as Router);
    service.extractToken(response);
    expect(service.token).toBeNull();
    expect(service.user).toBeNull();
    expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should get token from sucessful login', () => {
    const fakeHttp = {
      post: (url, body, headers) => of(new HttpResponse({
        status: 200,
        body: { payload: { token: 'foo' } }
      }))
    };
    service = new LoginService(fakeHttp as HttpClient, fakeRouter as Router);
    service.login('foo', 'bar').subscribe((res) => {
      expect(service.token).toBe('Bearer foo');
      expect(service.isLoggedIn).toBeTruthy();
    });
  });

  it('should construct correct body for login request', () => {
    const fakeHttp = {
      post: (url, body, headers) => {
        expect(body).toBe('benutzername=foo&passwort=ba+r');
        return of(new HttpResponse());
      }
    };
    service = new LoginService(fakeHttp as HttpClient, fakeRouter as Router);
    service.login('foo', 'ba r');
  });
});
