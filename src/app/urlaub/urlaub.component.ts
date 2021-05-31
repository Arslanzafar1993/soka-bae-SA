import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { urlaubsAnspruchHeader } from './util';
import { IconService } from '@anosrv-core/icon.service';

@Component({
  selector: 'anosrv-urlaub',
  templateUrl: './urlaub.component.html',
  styleUrls: ['./urlaub.component.scss']
})
export class UrlaubComponent {

  constructor(
    public userStoreService: UserStoreService,
    public iconService: IconService
  ) {}

  anspruchHeader(): string {
    return urlaubsAnspruchHeader(this.userStoreService.user.value.urlaubeSorted);
  }
}
