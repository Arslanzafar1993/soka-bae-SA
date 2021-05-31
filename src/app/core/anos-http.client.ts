import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginService } from '@anosrv-core/login.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AnosHttpClient implements OnDestroy {
  private updateTokenTriggerSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private http: HttpClient
  ) {
    // if loginService provides a refreshTokenTrigger subscribe to it and call refresh endpoint on events
    if (this.loginService.$updateTokenTrigger) {
      this.updateTokenTriggerSubscription = this.loginService.$updateTokenTrigger.subscribe(() => {
        this.get(`${environment.resourceServerApplicationContext}/token/refresh`).subscribe();
      });
    }
  }

  ngOnDestroy() {
    // cleanup subscription
    this.updateTokenTriggerSubscription.unsubscribe();
  }

  /**
   * update HttpHeaders with auth data from loginService
   * Will create proper HttpHeaders when none given
   * @param headers - HttpHeaders to update
   * @private
   * @returns HttpHeaders updated with the current Bearer Token and X-User Header
   */
  private updateHeaders(headers?: HttpHeaders): HttpHeaders {
    // init new HttpHeaders when none given
    headers = headers ? headers : new HttpHeaders();
    // update with auth data
    if (this.loginService.isLoggedIn) {
      headers = headers.set('X-User', this.loginService.user);
      headers = headers.set('Authorization', this.loginService.token);
    }
    return headers;
  }

  /**
   * GET request with auth token for ANOS API
   * @param url - endpoint URL
   * @param options - HTTP options
   * @returns Observable of all the HTTPEvents for the request, with a response body in the requested type.
   */
  public get<T>(url: string, options?: any): Observable<any> {
    const headers = this.updateHeaders( options ? options.headers : null);
    return this.http.get<T>(url, {...options, headers})
      .pipe(tap((request: HttpResponse<any>) => this.loginService.extractToken(request)));
  }

  /**
   * POST request with auth token for ANOS API
   * @param url - endpoint URL
   * @param body - The resources add/update
   * @param options - HTTP options
   * @returns Observable of all the HTTPEvents for the request, with a response body in the requested type.
   */
  public post<T>(url: string, body: any, options?: any ): Observable<HttpEvent<T>>  {
    const headers = this.updateHeaders( options ? options.headers : null);
    return this.http.post<T>(url, body, {...options, headers})
      .pipe(tap((request: HttpResponse<any>) => this.loginService.extractToken(request)));
  }

  /**
   * PUT request with auth token for ANOS API
   * @param url - endpoint URL
   * @param body - The resources add/update
   * @param options - HTTP options
   * @returns Observable of all the HTTPEvents for the request, with a response body in the requested type.
   */
  public put<T>(url: string, body: any, options?: any ): Observable<HttpEvent<T>>  {
    const headers = this.updateHeaders( options ? options.headers : null);
    return this.http.put<T>(url, body, {...options, headers})
      .pipe(tap((request: HttpResponse<any>) => this.loginService.extractToken(request)));
  }

  /**
   * DELETE request with auth token for ANOS API
   * @param url - endpoint URL
   * @param options - HTTP options
   * @returns Observable of all the HTTPEvents for the request, with a response body in the requested type.
   */
  public delete<T>(url: string, options?: any): Observable<HttpEvent<T>> {
    const headers = this.updateHeaders( options ? options.headers : null);
    return this.http.delete<T>(url, {...options, headers})
      .pipe(tap((request: HttpResponse<any>) => this.loginService.extractToken(request)));
  }
}
