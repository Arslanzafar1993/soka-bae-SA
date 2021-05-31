import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { urlaubsAnspruchHeader } from './../util';

import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anosrv-urlaub-detail',
  templateUrl: './urlaub-detail.component.html',
  styleUrls: ['./urlaub-detail.component.scss'],
  animations: [
    trigger('dialog', [
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class UrlaubDetailComponent implements OnInit, OnDestroy {

  showBackdrop = true;

  private subscriptions: Subscription[] = [];
  public hinweise: string[] = [];

  public urlaubTageGerundet = { tage: this.userStoreService.user.value.urlaubTageGerundet || 0 };

  constructor(
    private translateService: TranslateService,
    public iconService: IconService,
    public userStoreService: UserStoreService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showBackdrop = false;
    }, 500);

    this.subscriptions.push(
      this.translateService.get('urlaub.modal').subscribe( t => this.hinweise = t ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  anspruchHeader(): string {
    return urlaubsAnspruchHeader(this.userStoreService.user.value.urlaubeSorted);
  }
}
