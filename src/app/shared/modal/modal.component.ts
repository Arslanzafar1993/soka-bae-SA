import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

import { WindowService } from './window.service';
import { ModalService } from '@anosrv-core/modal.service';

@Component({
  selector: 'anosrv-app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {

  private windowScrolling: WindowService;

  @Output() closeModal = new EventEmitter();
  @Input() visible: boolean;
  @Input() closeBackdrop = true;
  @Input() isCancelQuestion = false;

  @Input() modalId: string;

  constructor(windowScrolling: WindowService, private modalService: ModalService) {
    this.windowScrolling = windowScrolling;
  }

  ngOnInit(): void {
    this.modalService.registerModal(this);
  }

  closeBackdropIntern(): void {
    if (this.closeBackdrop) {
      this.close();
    }
  }

  close(): void {
    this.windowScrolling.enable();
    this.closeModal.emit();
    this.modalService.close(this.modalId);
  }
}
