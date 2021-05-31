import { Directive, HostListener, Input } from '@angular/core';
import { EventBusService } from './event-bus-service.service';

@Directive({
  selector: '[anosrv-eventbus-director]',
})
export class EventbusDirectorDirective {
  @Input()
  channel: string;

  constructor(private eventBusService: EventBusService) {}

  @HostListener('click', ['$event'])
  onEvent($event: Event) {
    console.log('Clicked...for ' + this.channel);
    this.eventBusService.emit({ name: this.channel, payload: 'toggle' });
    $event.preventDefault();
  }
}
