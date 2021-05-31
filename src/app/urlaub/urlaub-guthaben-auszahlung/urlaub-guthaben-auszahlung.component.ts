import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { IconService } from '@anosrv-core/icon.service';
import { ModalService } from '@anosrv-core/modal.service';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { Observable, of, merge } from 'rxjs';
import { DeactivationGuarded } from 'src/app/app.guard';
import { UserContainer } from 'src/app/user/user-view.model';
import { User } from 'src/app/user/user.model';
import { AuszahlungView } from '../auszahlung-view.model';
import { DropdownService } from '@anosrv-core/dropdown.service';
import { UrlaubAntragService } from '@anosrv-core/urlaub-antrag.service';
import { Hinweis, UrlaubAntragResponse, UserPayload, UrlaubAntragRequest } from '@anosrv-core/urlaub-antrag-payload';

@Component({
  selector: 'anosrv-urlaub-guthaben-auszahlung',
  templateUrl: './urlaub-guthaben-auszahlung.component.html',
  styleUrls: ['./../urlaub.component.scss']
})
export class UrlaubGuthabenAuszahlungComponent implements OnInit, DeactivationGuarded {

  userForm: FormGroup;
  auszahlungView: AuszahlungView;
  antragsDaten: any;
  hinweise: Hinweis[] = [];
  response: UrlaubAntragResponse;

  constructor(
    public iconService: IconService,
    public userStoreService: UserStoreService,
    public urlaubAntragService: UrlaubAntragService,
    public modalService: ModalService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public dropdownService: DropdownService
  ) {
    this.auszahlungView = new AuszahlungView(this.userStoreService.user.value, this.dropdownService);
    this.userForm = this.auszahlungView.userForm;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.dropdownService.laender = data.combinedData[1].payload.landDTOList;
      this.response = data.combinedData[0];
      this.urlaubAntragService.response = data.combinedData[0];
      this.mapUser(this.response.payload.payload[0]);

      if (this.response.payload.taskModel.payload.uiSections.length === 0) {
        this.router.navigate(['/urlaub/guthaben/pruefung']);
      }
      this.auszahlungView.fillForm();
      this.onChanges();
    });
  }

  onChanges(): void {
    this.userForm.valueChanges.subscribe(values => {
      Object.entries(values).forEach(entry => {
        const key = entry[0];
        const value = entry[1];

        if (value !== null && value !== '') {
          this.hinweise = this.hinweise.filter((hinweis: Hinweis) => hinweis.source !== key);
        }
      });
    });
  }

    getContainerByName(name: string): UserContainer {
    return this.auszahlungView.containers.find(element => element.name === name);
  }

  save() {
    const request: UrlaubAntragRequest = {
      businessKey: this.response.payload.businessKey,
      instanceId: this.response.payload.instanceId,
      taskModel: this.response.payload.taskModel,
      payload: []
    };

    request.taskModel.payload.action = 'UPDATE';
    request.payload[0] = this.mapUserToPayload();

    this.urlaubAntragService.save(request).subscribe((data: UrlaubAntragResponse) => {
      this.response = data;
      this.urlaubAntragService.response = data;
      if (data.hinweise.length === 0) {
        this.saveToStore();
        this.router.navigate(['/urlaub/guthaben/pruefung']);
      } else {
        this.hinweise = data.hinweise;
      }
    }, (errData) => {
      console.error(errData);
    });
  }

  mapUser(data: UserPayload) {
    this.auszahlungView.user = Object.assign(this.auszahlungView.user, data);
  }

  mapUserToPayload() {
    const payload: UserPayload = this.response.payload.payload[0];
    Object.keys(this.userForm.controls).forEach(key => {
      const value = this.userForm.get(key).value;
      payload[key] = value;
    });
    return payload;
  }

  canDeactivate(nextState: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (nextState.url === '/urlaub/guthaben/pruefung') { return true; }
    this.modalService.openGuardModal();
    return this.modalService.navigateAwaySelection$;
  }

  private async saveToStore() {
    const newUser: User = Object.assign(this.userStoreService.user.value, this.userForm.getRawValue());
    this.userStoreService.updateUser = newUser;
    this.auszahlungView.fillForm();
  }
}
