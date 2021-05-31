import { Component, OnInit } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { UserStoreService } from '@anosrv-core/user-store.service';

@Component({
  selector: 'anosrv-urlaub-guthaben-bestaetigung',
  templateUrl: './urlaub-guthaben-bestaetigung.component.html',
  styleUrls: ['./../urlaub.component.scss']
})
export class UrlaubGuthabenBestaetigungComponent implements OnInit {

  showIcons = false;

  constructor(
    public userStoreService: UserStoreService,
    public iconService: IconService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showIcons = true;
    }, 1000);
  }
}
