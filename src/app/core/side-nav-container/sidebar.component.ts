import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventBusService } from '../eventbus/event-bus-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anosrv-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input()
  position: string;

  @Input()
  name: string;

  @Input()
  showCloseIcon: string;

  @Output()
  toggled = new EventEmitter();

  modal: string;
  @Input()
  styleClass: string;
  @Input()
  style: string;
  ariaCloseLabel: string;
  private eventBusSubscription: Subscription;
  private visibleProp: boolean;

  constructor(private eventBusService: EventBusService) {}

  @Input() get visible(): boolean {
    return this.visibleProp;
  }

  set visible(val: boolean) {
    this.visibleProp = val;

    if (this.visibleProp) {
      this.doShow();
    } else {
      this.doHide();
    }
  }

  ngOnInit(): void {
    this.eventBusSubscription = this.eventBusService.on(this.name, { next: (val) => this.toggleDisplay() });
    this.visible = false;
  }

  close($event: Event) {
    if (this.visible) {
      this.toggleDisplay();
    }
  }

  ngOnDestroy(): void {
    this.eventBusSubscription.unsubscribe();
  }

  private toggleDisplay() {
    this.visible = !this.visible;
    const sidebarState: Partial<SidebarComponent> = { name: this.name, visible: this.visible };
    this.toggled.emit(sidebarState);
  }

  private doShow() {}

  private doHide() {}
}
