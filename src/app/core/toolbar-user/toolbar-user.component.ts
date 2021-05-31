import { Component } from '@angular/core';
import { EventBusService } from '@anosrv-core/eventbus/event-bus-service.service';
import { UserStoreService } from '@anosrv-core/user-store.service';

@Component({
  selector: 'anosrv-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss']
})
export class ToolbarUserComponent {

  constructor(private eventBusService: EventBusService, public userStoreService: UserStoreService) {
  }

  close(): void {
    this.eventBusService.emit({ name: 'ToolbarUser', payload: '' });
  }
}
