import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import NavigationConfig from '../../../assets/navigation.config.json';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly $navigationEnds: Observable<NavigationEnd>;

  private currentConfig: any = {};
  private currentURL = '';

  get config(): any {
    return this.currentConfig;
  }

  get url(): string {
    return this.currentURL;
  }

  constructor(
    private router: Router
  ) {
    this.currentConfig = NavigationConfig.base;

    this.$navigationEnds = router.events.pipe(
      filter((nav) => nav instanceof NavigationEnd),
      tap((navEnd: NavigationEnd) => {
        let config = NavigationConfig.base;
        let path = '';

        this.currentURL = navEnd.urlAfterRedirects;
        this.currentURL.split('/').forEach( part => {
          path = part.length > 0 ? `${path}/${part}` : path;
          if (path in NavigationConfig) {
           config = {...config, ...NavigationConfig[path]};
          }
        });

        this.currentConfig = config;
      })
    ) as Observable<NavigationEnd>;
  }
}
