import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GERMAN } from './core/lokalisation/lokalisation.module';
import { Router } from '@angular/router';
import { ModalService } from '@anosrv-core/modal.service';

import mockServer from './app.mock';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { NavigationService } from '@anosrv-core/navigation/navigation.service';
import { LoginService } from '@anosrv-core/login.service';

// mockServer();

@Component({
  selector: 'anosrv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'anosrv-frontend';

  public constructor(
    translateService: TranslateService,
    private navigationService: NavigationService,
    public loginService: LoginService,
    public router: Router,
    public modalService: ModalService,
    public userStoreService: UserStoreService
  ) {
    translateService.setDefaultLang(GERMAN);
    translateService.use(GERMAN);
  }

  public get showToolbar(): boolean {
    return ! this.navigationService.config.hideToolbar;
  }

  public get showHeader(): boolean {
    return ! this.navigationService.config.hideHeader;
  }

  public get showHeaderLight(): boolean {
    return this.navigationService.config.lightHeader;
  }

  choose(choice: boolean): void {
    this.modalService.showGuardModal = false;
    this.modalService.navigateAwaySelection$.next(choice);
  }
}
