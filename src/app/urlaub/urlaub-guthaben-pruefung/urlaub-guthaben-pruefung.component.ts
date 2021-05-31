import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { IconService } from '@anosrv-core/icon.service';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { UserContainer, UserData } from 'src/app/user/user-view.model';
import { User } from 'src/app/user/user.model';
import { PruefungView } from '../pruefung-view.model';
import { DropdownService } from '@anosrv-core/dropdown.service';
import { ModalService } from '@anosrv-core/modal.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { Hinweis, UrlaubAntragResponse, UrlaubAntragRequest, UserPayload } from '@anosrv-core/urlaub-antrag-payload';
import { UrlaubAntragService } from '@anosrv-core/urlaub-antrag.service';
import { DeactivationGuarded } from 'src/app/app.guard';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'anosrv-urlaub-guthaben-pruefung',
  templateUrl: './urlaub-guthaben-pruefung.component.html',
  styleUrls: ['./../urlaub.component.scss'],
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [style({ height: 0}), animate(600)]),
      transition(':leave', [animate(600, style({ height: 0}))]),
    ]),
  ],
})
export class UrlaubGuthabenPruefungComponent implements OnInit, DeactivationGuarded {

  userForm: FormGroup;
  pruefungView: PruefungView;
  editMode = false;
  containerName = '';
  hinweise: Hinweis[] = [];
  response: UrlaubAntragResponse;
  actualLink = '/urlaub/guthaben/auszahlung';
  beforeLink = '/urlaub/guthaben/auszahlung';
  nextLinkEdit = '/urlaub/guthaben/pruefung';

  constructor(
    public iconService: IconService,
    public userStoreService: UserStoreService,
    public modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private urlaubAntragService: UrlaubAntragService,
    private router: Router,
    public dropdownService: DropdownService
  ) {
    this.pruefungView = new PruefungView(this.userStoreService.user.value, this.dropdownService);
    this.userForm = this.pruefungView.userForm;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { laender: any }) => {
      this.dropdownService.laender = data.laender.payload.landDTOList;
      this.response = this.urlaubAntragService.response;
      this.pruefungView.fillForm();
    });
    this.onChanges();
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

  edit(containerName: string) {
    const container = this.pruefungView.getContainer(containerName);
    if (container.isSemiEditable) { return; }

    this.editMode = !this.editMode;
    if (this.editMode) {
      this.actualLink = this.nextLinkEdit;
    } else {
      this.actualLink = this.beforeLink;
    }
    this.containerName = containerName;

    this.pruefungView.containers.forEach((value: UserContainer) => {
      if (value.name !== this.containerName) {
        value.isSemiEditable = true;
      }
    });
  }

  mapUserToPayload(): UserPayload {
    const payload: UserPayload = new UserPayload();
    Object.keys(this.userForm.controls).forEach(key => {
      const value = this.userForm.get(key).value;
      payload[key] = value;
    });
    return payload;
  }

  close() {
    this.router.navigate(['/urlaub/guthaben']);
  }

  getContainerByName(name: string): UserContainer {
    return this.pruefungView.containers.find(element => element.name === name);
  }

  displayDataReadOnly(item: UserData, container: UserContainer): boolean {
    if (!this.editMode) {
      return true;
    }

    if (this.editMode && this.containerName === container.name && !item.editable) {
      return true;
    }

    if (this.editMode && this.containerName !== container.name) {
      return true;
    }
    return false;
  }

  save(containerName: string) {
    const request: UrlaubAntragRequest = {
      businessKey: this.response.payload.businessKey,
      instanceId: this.response.payload.instanceId,
      taskModel: this.response.payload.taskModel,
      payload: []
    };
    request.taskModel.payload.action = 'UPDATE';
    request.taskModel.payload.uiSections = [containerName];

    if (this.userForm.dirty) {
      request.payload[0] = this.mapUserToPayload();
    }

    if (this.userForm.dirty) {
      this.urlaubAntragService.save(request).subscribe((data: UrlaubAntragResponse) => {
        this.response = data;
        this.urlaubAntragService.response = data;
        if (data.hinweise.length === 0) {
          this.containerName = '';
          this.pruefungView.resetEditable();
          this.saveToStore();
          this.editMode = false;
        } else {
          this.hinweise = data.hinweise;
          return;
        }
      }, (errData) => {
        console.error(errData);
      });
    } else {
      this.editMode = !this.editMode;
    }
  }

  next() {
    const request: UrlaubAntragRequest = {
      businessKey: this.response.payload.businessKey,
      instanceId: this.response.payload.instanceId,
      taskModel: this.response.payload.taskModel,
      payload: this.response.payload.payload
    };
    request.payload.splice(1, 1);
    request.taskModel.payload.action = 'CONTINUE';

    this.urlaubAntragService.save(request).subscribe((data: UrlaubAntragResponse) => {
      this.urlaubAntragService.response = data;
      if (data.payload.payload && data.payload.payload[1]) {
        this.saveExtraDataToStore(data.payload.payload[1]);
      }
      this.router.navigate(['/urlaub/guthaben/zusammenfassung']);
    }, (errData) => {
      console.error(errData);
    });
  }

  canDeactivate(nextState: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // goto next site
    if (nextState.url === '/urlaub/guthaben/zusammenfassung') { return true; }

    // no changes just close edit mode
    if (!this.userForm.dirty && this.editMode) {
      this.editMode = !this.editMode;
      this.containerName = '';
      return false;
    }

    // everything else open Guard Modal
    this.modalService.openGuardModal();
    return new Observable((observer: Observer<boolean>) => {
      this.modalService.navigateAwaySelection$.subscribe((choice) => {
        // yes and no edit mode cancel Antrag
        if (choice && !this.editMode) {
          this.urlaubAntragService.delete(this.response.payload.instanceId).subscribe(() => {});
        }

        // yes and edit mode
        if (choice && this.editMode) {
          this.restoreOldValues();
          this.editMode = !this.editMode;
          this.containerName = '';
          return false;
        }

        observer.next(choice);
        observer.complete();
      }, err => observer.error(err));
    });
  }

  private saveToStore() {
    const newUser: User = Object.assign(this.userStoreService.user.value, this.userForm.getRawValue());
    this.userStoreService.updateUser = newUser;
    this.pruefungView.fillForm();
  }

  private saveExtraDataToStore(data: any) {
    const newUser: User = Object.assign(this.userStoreService.user.value, data);
    this.userStoreService.updateUser = newUser;
  }

  private restoreOldValues() {
    const actualContainer: UserContainer = this.pruefungView.getContainer(this.containerName);

    if (actualContainer !== null && actualContainer !== undefined) {
      actualContainer.items.forEach((element: UserData) => {
        const property = this.userStoreService.user.value[element.formControlName];
        const values = {};
        values[element.formControlName] = property;
        this.userForm.patchValue(values);
      });
    }
  }
}
