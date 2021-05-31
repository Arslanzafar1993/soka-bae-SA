import { Component, Input, OnInit } from '@angular/core';
import { UserStoreService } from '@anosrv-core/user-store.service';

@Component({
  selector: 'anosrv-urlaub-guthaben-overlay',
  templateUrl: './urlaub-guthaben-overlay.component.html',
  styleUrls: ['./urlaub.component.scss']
})
export class UrlaubGuthabenOverlayComponent {

  @Input() showOverlay = true;
  @Input() topLeftText = '';

  constructor(
    public userStoreService: UserStoreService
    ) {}
}
