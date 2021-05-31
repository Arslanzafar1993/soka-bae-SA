import { Component, OnInit } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { ModalService } from '@anosrv-core/modal.service';
import { UserStoreService } from '@anosrv-core/user-store.service';

@Component({
  selector: 'anosrv-urlaub-guthaben-ende',
  templateUrl: './urlaub-guthaben-ende.component.html',
  styleUrls: ['./../urlaub.component.scss']
})
export class UrlaubGuthabenEndeComponent implements OnInit {

  constructor(
    public iconService: IconService,
    public modalService: ModalService,
    public userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {}
}
