import { Component, OnInit } from '@angular/core';
import { UserView, UserContainer, UserData } from './user-view.model';
import { FormGroup } from '@angular/forms';
import { Land } from '@anosrv-core/land.model';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { ModalService } from '@anosrv-core/modal.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '@anosrv-core/icon.service';
import { DropdownService } from '@anosrv-core/dropdown.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { EventBusService } from '@anosrv-core/eventbus/event-bus-service.service';

@Component({
  selector: 'anosrv-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [style({ height: 0}), animate(600)]),
      transition(':leave', [animate(600, style({ height: 0}))]),
    ]),
  ],
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  userView: UserView;
  editMode = false;
  containerName = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userStoreService: UserStoreService,
    public iconService: IconService,
    public modalService: ModalService,
    public dropdownService: DropdownService,
    private eventBusService: EventBusService,
    private router: Router
  ) {
    this.userView = new UserView(this.userStoreService.user.value, this.dropdownService);
    this.userForm = this.userView.userForm;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { laender: any }) => {
      this.dropdownService.laender = data.laender.payload.landDTOList;
      this.userView.fillForm();
    });

    this.eventBusService.on('ToolbarUser', { next: (val) => this.close() });
  }

  edit(containerName: string) {
    this.editMode = !this.editMode;
    this.containerName = containerName;
  }

  close() {
    if (!this.editMode) {
      this.router.navigateByUrl('home');
    }
    else {
      if (!this.userForm.dirty) {
        this.editMode = false;
      } else {
        this.modalService.openGuardModal();
        this.modalService.navigateAwaySelection$.subscribe({
          next: (value) => {
            if (value) {
              this.editMode = false;
              const actual: UserContainer = this.userView.getContainer(this.containerName);
              if (actual !== null && actual !== undefined) {
                actual.items.forEach((element: UserData) => {
                  const property = this.userStoreService.user.value[element.formControlName];
                  const values = {};
                  values[element.formControlName] = property;
                  this.userForm.patchValue(values);
                });
              }
            } else {
              this.modalService.showGuardModal = false;
            }
          }
        });
      }
    }
  }

  save(): void {
  }

  private saveToStore() {
    const newUser: User = Object.assign(this.userStoreService.user.value, this.userForm.getRawValue());
    this.userStoreService.updateUser = newUser;
    this.userView.fillForm();
  }
}
