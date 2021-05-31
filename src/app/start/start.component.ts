import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UserStoreService } from '@anosrv-core/user-store.service';

@Component({
  selector: 'anosrv-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit, OnDestroy {
  private translateSubscription: Subscription;

  get verfallTageParam(): { tage: number } {
    return { tage: this.userStoreService.user.value.verfallTage || 0 };
  }

  get urlaubsTageParam(): { tage: number } {
    return { tage: this.userStoreService.user.value.urlaubTageGerundet || 0 };
  }

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.translateSubscription = this.translateService.get('title.start').subscribe(
      (val) => this.titleService.setTitle(val));
  }

  ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

}
