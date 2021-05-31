import { Component, OnInit } from '@angular/core';

import { IconService } from '@anosrv-core/icon.service';

import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import { UserStoreService } from '@anosrv-core/user-store.service';

@Component({
  selector: 'anosrv-urlaub-guthaben',
  templateUrl: './urlaub-guthaben.component.html',
  styleUrls: ['./urlaub-guthaben.component.scss'],
  animations: [
    trigger('dialog', [
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class UrlaubGuthabenComponent implements OnInit {
  showBackdrop = true;

  constructor(
    public iconService: IconService,
    public userStoreService: UserStoreService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showBackdrop = false;
    }, 500);
  }
}
