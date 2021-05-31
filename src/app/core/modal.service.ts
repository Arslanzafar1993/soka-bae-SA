import { Injectable } from '@angular/core';
import { ModalComponent } from '@anosrv-shared/modal/modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: Array<ModalComponent>;
  private defaultGuardModalText = 'Möchtest Du wirklich abbrechen? Alle erfassten Daten gehen dann verloren.';
  public guardModalText = this.defaultGuardModalText;

  showGuardModal = false;

  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.modals = [];
  }

  close(modalId: string): void {
    const modal = this.findModal(modalId);

    if (modal) {
      modal.visible = false;
    }
  }

  open(modalId: string): void {
    const modal = this.findModal(modalId);

    if (modal) {
      modal.visible = true;
      this.guardModalText = this.defaultGuardModalText;
    }
  }

  findModal(modalId: string): ModalComponent {
    return this.modals.find(m => m.modalId === modalId);
  }

  registerModal(newModal: ModalComponent): void {
    const modal = this.findModal(newModal.modalId);

    if (modal) {
      this.modals.splice(this.modals.indexOf(modal), 1);
    }

    this.modals.push(newModal);
  }

  openGuardModal(customText?: string ) {
    if (customText) {
      this.guardModalText = customText;
    }
    this.showGuardModal = true;
  }

  closeGuardModal() {
    this.showGuardModal = false;
  }

  isModalOpen(): boolean {
    return this.showGuardModal;
  }
}
