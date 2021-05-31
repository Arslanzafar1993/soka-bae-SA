import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { UrlaubAntragService } from './urlaub-antrag.service';
import { UserStoreService } from './user-store.service';
import { LaenderService } from './laender.service';

@Injectable({
  providedIn: 'root'
})
export class UrlaubAntragResolverService implements Resolve<any[any]> {
  constructor(private urlaubAntragService: UrlaubAntragService,
              private userStoreService: UserStoreService,
              private laenderService: LaenderService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const arbeitnehmerNr = this.userStoreService.user.value.arbeitnehmerNr;
    const antragServiceData = this.urlaubAntragService.index(arbeitnehmerNr);
    const laender = this.laenderService.index();

    return forkJoin([antragServiceData, laender]);
  }
}
