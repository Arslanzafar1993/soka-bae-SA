import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anosrv-hilfe-urlaub',
  templateUrl: './hilfe-urlaub.component.html',
  styleUrls: ['./hilfe-urlaub.component.scss']
})
export class HilfeUrlaubComponent implements OnInit, OnDestroy{

  private translateSubscription: Subscription;
  public q7Points: string[];

  get jahrAktuell(): { jahr: number } {
    return { jahr: (new Date()).getFullYear() };
  }

  get jahrAnspruch(): { jahr: number } {
    return { jahr: (new Date()).getFullYear() - 2 };
  }

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.translateSubscription =
      this.translateService.get('hilfe.faq-urlaub.q7.points').subscribe(t => this.q7Points = t);
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }
}
