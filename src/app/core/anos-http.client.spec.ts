import { fakeAsync, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { AnosHttpClient } from '@anosrv-core/anos-http.client';
import { LoginService } from '@anosrv-core/login.service';

describe('AnosHttpClient', () => {
  let anosHttp: AnosHttpClient;
  let options: { headers: HttpHeaders };
  let loginSpy;
  let fakeLoginService: FakeLoginService;

  const result = new HttpResponse({
    status: 200,
    headers: new HttpHeaders({
      authorization: 'bar-foo'
    })
  });

  class FakeLoginService {
    id = null;
    token = 'Bearer foo-bar';
    user = 'bar';
    isLoggedIn = true;
    updateTokenSubject = new Subject();
    $updateTokenTrigger = this.updateTokenSubject.asObservable();
    constructor() { this.id = Math.random(); }
    extractToken(res: HttpResponse<any>) {
      return this.id;
    }
  }

  const requestSpy = jasmine.createSpy();

  const fakeHttp = {
    get: (url, headers) => {
      requestSpy({ method: 'GET', url, headers });
      return of(result);
    },
    post: (url, body, headers) => {
      requestSpy({ method: 'POST', body, url, headers });
      return of(result);
    },
    put: (url, body, headers) => {
      requestSpy({ method: 'PUT', body, url, headers });
      return of(result);
    },
    delete: (url, headers) => {
      requestSpy({ method: 'DELETE', url, headers });
      return of(result);
    }
  };

  beforeEach(() => {

    fakeLoginService = new FakeLoginService();

    TestBed.configureTestingModule({
      providers: [
        AnosHttpClient,
        { provide: LoginService, useValue: fakeLoginService },
        { provide: HttpClient, useValue: fakeHttp }
      ]
    });

    loginSpy = spyOn(fakeLoginService, 'extractToken');

    anosHttp = TestBed.inject(AnosHttpClient);

    options = { headers: new HttpHeaders({ etag: 'bar-foo' }) };
    requestSpy.calls.reset();
    loginSpy.calls.reset();
  });

  it('should be created', () => {
    expect(anosHttp).toBeTruthy();
  });

  function ensureProperBinding(){
    const call = loginSpy.calls.mostRecent();
    expect(call.args[0]).toBe(result);
    // this makes sure its not called as a static method
    expect(call.object.id).toBe(fakeLoginService.id);
  }

  it('should pass down GET and call extractToken', () => {
    anosHttp.get('/foo', null).subscribe();
    ensureProperBinding();
  });

  it('should pass down POST and call extractToken', () => {
    anosHttp.post('/foo', null, null).subscribe();
    ensureProperBinding();
  });

  it('should pass down PUT and call extractToken', () => {
    anosHttp.put('/foo', null, null).subscribe();
    ensureProperBinding();
  });

  it('should pass down DELETE and call extractToken', () => {
    anosHttp.delete('/foo', null).subscribe();
    ensureProperBinding();
  });

  function checkHeaders(headers) {
    expect(headers.get('Authorization')).toBe(fakeLoginService.token);
    expect(headers.get('X-User')).toBe(fakeLoginService.user);
    expect(headers.get('etag')).toBe('bar-foo');
  }

  it('should enrich the header of a GET with Authorization when logged in', () => {
    anosHttp.get('/foo1', options).subscribe();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url).toBe('/foo1');
    expect(request.method).toBe('GET');
    checkHeaders(request.headers.headers);
  });

  it('should enrich the header of a POST with Authorization when logged in', () => {
    anosHttp.post('/foo2', 'xyz', options).subscribe();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url).toBe('/foo2');
    expect(request.body).toBe('xyz');
    expect(request.method).toBe('POST');
    checkHeaders(request.headers.headers);
  });

  it('should enrich the header of a PUT with Authorization when logged in', () => {
    anosHttp.put('/foo3', 'abc', options).subscribe();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url).toBe('/foo3');
    expect(request.body).toBe('abc');
    expect(request.method).toBe('PUT');
    checkHeaders(request.headers.headers);
  });

  it('should enrich the header of a DELETE with Authorization when logged in', () => {
    anosHttp.delete('/foo4', options).subscribe();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url).toBe('/foo4');
    expect(request.method).toBe('DELETE');
    checkHeaders(request.headers.headers);
  });

  it('should create a Header with Authorization when none given when logged in', () => {
    anosHttp.get('/foo5', null).subscribe();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url).toBe('/foo5');
    expect(request.method).toBe('GET');
    const headers = request.headers.headers;
    expect(headers.get('Authorization')).toBe(fakeLoginService.token);
    expect(headers.get('X-User')).toBe('bar');
  });

  it('should not enrich a Header with Authorization when no not logged in', () => {
    fakeLoginService.isLoggedIn = false;
    anosHttp.get('/foo6', options).subscribe();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url).toBe('/foo6');
    expect(request.method).toBe('GET');
    const headers = request.headers.headers;
    expect(headers.get('Authorization')).toBeNull();
    expect(headers.get('X-User')).toBeNull();
    expect(headers.get('etag')).toBe('bar-foo');
  });

  it('should create a Header without Authorization when no not logged in', () => {
    fakeLoginService.isLoggedIn = false;
    anosHttp.get('/foo7', null).subscribe();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url).toBe('/foo7');
    expect(request.method).toBe('GET');
    const headers = request.headers.headers;
    expect(headers.get('Authorization')).toBeNull();
    expect(headers.get('X-User')).toBeNull();
    expect(headers.get('etag')).toBeNull();
  });

  it('should refresh token when updateTokenTrigger is fired', fakeAsync(() => {
    fakeLoginService.updateTokenSubject.next();
    const request = requestSpy.calls.mostRecent().args[0];
    expect(request.url.slice(-14)).toBe('/token/refresh');
    ensureProperBinding();
  }));
});
