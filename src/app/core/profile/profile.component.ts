import { Component, OnInit } from '@angular/core';
import { EventBusService } from './../eventbus/event-bus-service.service';
import { Subscription } from 'rxjs';
import { IconService } from '@anosrv-core/icon.service';

@Component({
  selector: 'anosrv-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  isOpen = false;

  private eventBusSubscription: Subscription;

  constructor(
    private eventBusService: EventBusService,
    public iconService: IconService
  ) {}

  ngOnInit(): void {
    this.eventBusSubscription = this.eventBusService.on('profileNavSidebar', {
      next: (val) =>  {
        this.isOpen = !this.isOpen;
    }});
  }
}
