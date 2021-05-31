import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { NavigationService } from '@anosrv-core/navigation/navigation.service';

// data imports
import laender from './data/laender.json';
import user from './data/user.json';
import urlaub from './data/urlaub.json';
import erfassung from './data/erfassung.json';
import entschaedigung from './data/entschaedigung.json';
import pruefung from './data/pruefung.json';
import empty from './data/empty.json';
import login from './data/login.json';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(
    private navigationService: NavigationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    const ref = this.navigationService.url;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(50))
      .pipe(dematerialize());

    function isDemoXUser(): boolean {
       return (headers.get('x-user') === '0815123456789');
    }

    function log() {
      console.log(url);
    }

    function handleRoute(): ObservableInput<any> {
      switch (true) {
        case url.endsWith('/api/v1/token/refresh') && isDemoXUser():
          log();
          return ok('1');
        case url.endsWith('/api/v1/login') && method === 'POST' && body.startsWith('benutzername=0815123456789'):
          log();
          return ok(login);
        case url.endsWith('/api/v1/logout') && method === 'HEAD' && isDemoXUser():
          log();
          return of(new HttpResponse({ status: 204 }));
        case url.endsWith('/api/v1/arbeitnehmer/0815123456789') && method === 'GET':
          log();
          return ok(user);
        case url.endsWith('/api/v1/urlaub/0815123456789') && method === 'GET':
          log();
          return ok(urlaub);
        case url.endsWith('/api/v1/process/entschaedigung') && method === 'POST' && body.businessKey === '0815123456789':
          log();
          return of(new HttpResponse({ status: 201, headers: new HttpHeaders({
              location: `${url}/abcdef01-0000-0000-0000-abcdef012345`
            }) }));
        case url.endsWith('/api/v1/process/entschaedigung/abcdef01-0000-0000-0000-abcdef012345'):
          log();
          return handleEntschaedigung();
        case url.endsWith('/api/v1/grunddaten/laender/de') && method === 'GET' && isDemoXUser():
          log();
          return ok(laender);
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    function handleEntschaedigung(): ObservableInput<any> {
      switch (true) {
        case method === 'GET' && ref.endsWith('/urlaub/guthaben'):
          return ok(erfassung);
        case method === 'PUT' && ref.endsWith('/urlaub/guthaben/auszahlung'):
          return of(new HttpResponse({status: 204}));
        case method === 'GET' && ref.endsWith('/urlaub/guthaben/auszahlung'):
          return ok(entschaedigung);
        case method === 'PUT' && ref.endsWith('/urlaub/guthaben/pruefung'):
          return of(new HttpResponse({status: 204}));
        case method === 'GET' && ref.endsWith('/urlaub/guthaben/pruefung'):
          return ok(pruefung);
        case method === 'PUT' && ref.endsWith('/urlaub/guthaben/zusammenfassung'):
          return of(new HttpResponse({status: 204}));
        case method === 'GET' && ref.endsWith('/urlaub/guthaben/zusammenfassung'):
          // TODO: this should definitely be a status 200 not a 404 later (s. ANOS-666)
          return notFound();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    /**
     * Wrap a request body in a HttpResponse 200
     * @param bodyRequest
     * @returns Observable of the HttpResponse
     */
    function ok(bodyRequest): Observable<HttpResponse<any>> {
      return of(new HttpResponse({
        status: 200,
        body: bodyRequest,
        headers: new HttpHeaders({ authorization: 'foo' })
      }));
    }

    /**
     * Create an Observable that immediately emits an Error 404
     * @returns Observable An error Observable: emits only the error notification
     */
    function notFound(): Observable<HttpErrorResponse> {
      return throwError(new HttpErrorResponse({
        status: 404,
        error: { message: 'Not Found' },
        headers: new HttpHeaders({ authorization: 'foo' })
      }));
    }

    /**
     * Create an Observable that immediately emits an Error 401
     * @returns Observable An error Observable: emits only the error notification
     */
    function unauthorized(): Observable<HttpErrorResponse> {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }
  }
}

export const FakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
