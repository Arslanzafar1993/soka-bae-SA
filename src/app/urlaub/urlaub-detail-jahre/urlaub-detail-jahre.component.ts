import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { urlaubsAnspruchHeader } from './../util';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anosrv-urlaub-detail-jahre',
  templateUrl: './urlaub-detail-jahre.component.html',
  styleUrls: ['../urlaub-detail/urlaub-detail.component.scss'],
})
export class UrlaubDetailJahreComponent implements OnInit, OnDestroy {

  public hinweise: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private translateService: TranslateService,
    public iconService: IconService,
    public userStoreService: UserStoreService,
  ) {}

  ngOnInit(): void {
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
