import { Component, OnInit } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { ModalService } from '@anosrv-core/modal.service';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { UrlaubAntragService } from '@anosrv-core/urlaub-antrag.service';
import { UrlaubAntragRequest, UrlaubAntragResponse } from '@anosrv-core/urlaub-antrag-payload';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DeactivationGuarded } from 'src/app/app.guard';
import { iif, Observable, Observer, of, throwError } from 'rxjs';
import { concatMap, delay, map, retryWhen } from 'rxjs/operators';

@Component({
  selector: 'anosrv-urlaub-guthaben-zusammenfassung',
  templateUrl: './urlaub-guthaben-zusammenfassung.component.html',
  styleUrls: ['./../urlaub.component.scss']
})
export class UrlaubGuthabenZusammenfassungComponent implements OnInit, DeactivationGuarded {

  constructor(
    public iconService: IconService,
    public modalService: ModalService,
    public userStoreService: UserStoreService,
    private urlaubAntragService: UrlaubAntragService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  showBIC(): boolean {
    let back = true;
    const iban = this.userStoreService.user.value.iban;
    if (iban !== undefined && iban !== null && iban.startsWith('DE')) {
      back = false;
    }
    return back;
  }

  next() {
    const request: UrlaubAntragRequest = {
      businessKey: this.urlaubAntragService.response.payload.businessKey,
      instanceId: this.urlaubAntragService.response.payload.instanceId,
      taskModel: this.urlaubAntragService.response.payload.taskModel,
      payload: this.urlaubAntragService.response.payload.payload
    };
    request.payload.splice(1, 1);
    request.taskModel.payload.action = 'CONTINUE';

    this.urlaubAntragService.save(request)
    .subscribe((data: Response) => {
      this.urlaubAntragService.response = data as unknown as UrlaubAntragResponse;
      this.router.navigate(['/urlaub/guthaben/bestaetigung']);
    }, (errData: HttpErrorResponse) => {
      // TODO: Handle timeout Errors
    });
  }

  close() {
    this.router.navigate(['/urlaub/guthaben']);
  }

  canDeactivate(nextState: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // goto next site
    if (nextState.url === '/urlaub/guthaben/bestaetigung') { return true; }

    // everything else open Guard Modal
    this.modalService.openGuardModal('Der Antrag wurde noch nicht gesendet. Bei Abbrechen gehen alle bisher erfassten Daten verloren.');
    return new Observable((observer: Observer<boolean>) => {
      this.modalService.navigateAwaySelection$.subscribe((choice) => {
        if (choice) {
          this.urlaubAntragService.delete(this.urlaubAntragService.response.payload.instanceId).subscribe(() => {});
        }

        observer.next(choice);
        observer.complete();
      }, err => observer.error(err));
    });
  }

  back() {
    this.close();
  }

}
