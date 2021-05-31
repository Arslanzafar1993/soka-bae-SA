import { Injectable, OnDestroy } from '@angular/core';
import { PartialObserver, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface EventData {
  name: string;
  payload: any;
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService implements OnDestroy {
  private subject$ = new Subject<EventData>();

  constructor() {}

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on(eventName: string, action: PartialObserver<any>): Subscription {
    return this.subject$
      .pipe(
        filter((e: EventData) => e.name === eventName),
        map((e: EventData) => e.payload)
      )
      .subscribe(action);
  }

  ngOnDestroy(): void {
    this.subject$.complete();
  }
}
