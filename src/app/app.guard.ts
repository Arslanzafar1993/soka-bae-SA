import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '@anosrv-core/login.service';

export interface DeactivationGuarded {
  canDeactivate(nextState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanDeactivate<DeactivationGuarded>, CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isLoggedIn){
      // allow access to component, if logged in
      return true;
    }
    // navigate to login page and deny access to component
    this.router.navigateByUrl('/login');
    return false;
  }

  canDeactivate(
    component: DeactivationGuarded,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate(nextState) : true;
  }
}
