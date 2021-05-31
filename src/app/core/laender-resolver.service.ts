import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Land } from './land.model';
import { Injectable } from '@angular/core';
import { LaenderService } from './laender.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaenderResolverService implements Resolve<Land[]> {
  constructor(private laenderService: LaenderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Land[]> {
    return this.laenderService.index();
  }
}
