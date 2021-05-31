import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnDestroy {
  private updateTokenSubject: Subject<void> = new Subject();
  private updateTokenTimeout: ReturnType<typeof setTimeout>;

  public $updateTokenTrigger: Observable<void> = this.updateTokenSubject.asObservable();

  public token: string = null;
  public user: string = null;

  public get isLoggedIn(): boolean {
    return typeof this.token === 'string' && this.token.length > 0;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.cleanUpTimeout();
  }

  /**
   * cleans up Timeout
   * @void
   */
  private cleanUpTimeout(): void {
    if (this.updateTokenTimeout) {
      clearTimeout(this.updateTokenTimeout);
      this.updateTokenTimeout = null;
    }
  }

  /**
   * create a Timeout that refreshes the token after 5 minutes
   * @void
   */
  private updateTokenTrigger(): void {
    // cleanup an existing timeout
    this.cleanUpTimeout();
    this.updateTokenTimeout = setTimeout(() => {
      // TODO: check for last interaction with frontend and do not refresh after 15 minutes
      if (this.isLoggedIn) {
        this.updateTokenSubject.next();
        this.updateTokenTimeout = null;
        this.updateTokenTrigger();
      }
      // call every 5 minutes
      // TODO: Timeout will probably be configurable
    }, 1000 * 60 * 5);
  }

  /**
   * extracts the refreshed token from a HttpResponse
   * Logs the user aut and navigates to /login when an error response 401 is received
   * @param res the HttpResponse to extract the refreshed token from
   * @void
   */
  public extractToken(res: HttpResponse<any>): void {
    if (res.status === 401) {
      this.logout();
    }else if (res.status < 400) {
      try {
        const token = res.headers.get('Authorization') || undefined;
        if (typeof token === 'string' && token.length > 0) {
          this.token = token;
          this.updateTokenTrigger();
        }
      } catch (e) {}
    }
  }

  /**
   * Login the User
   * @param benutzername - Username of the user to login
   * @param passwort - Password of the user to login
   * @returns Observable<HttpResponse<any>>
   *   An Observable of the HTTPResponse for the request, with a response body in the requested type.
   */
  public login(benutzername: string, passwort: string): Observable<HttpResponse<any>> {
    // create request body as x-www-form-urlencoded
    const payload = new URLSearchParams();
    payload.set('benutzername', benutzername);
    payload.set('passwort', passwort);

    const url = `${environment.resourceServerApplicationContext}/login`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    });

    // login the user and return obsoervable for further usage
    return this.http.post<any>(url, payload.toString(), {headers, observe: 'response'})
      .pipe(
        tap((res: HttpResponse<any>) => {
          try {
            // extract Bearer token from request and store when found
            this.token = `Bearer ${res.body.payload.token}`;
            this.user = benutzername;
            this.updateTokenTrigger();
          } catch (e) {
            // or explode
            throwError( 'LOGIN FAILED');
          }
        })
      );
  }

  /**
   * Logs out the user, resets token and user, ends all timeouts
   * @void
   */
  public logout() {
    const headers = new HttpHeaders({
      'X-User': this.user,
      Authorization: this.token
    });
    const url = `${environment.resourceServerApplicationContext}/logout`;

    this.http.head(url, {headers, observe: 'response'}).subscribe(
      res => {
        this.token = null;
        this.user = null;
        this.cleanUpTimeout();
        this.router.navigateByUrl('/login');
      }
    );
  }
}
