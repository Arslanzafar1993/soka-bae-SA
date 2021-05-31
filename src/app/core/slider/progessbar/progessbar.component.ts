import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anosrv-progessbar',
  templateUrl: './progessbar.component.html',
  styleUrls: ['./progessbar.component.scss'],
})
export class ProgessbarComponent implements OnInit {
  @Input()
  totalElements: number;

  @Input()
  currentElement: number;

  constructor() {}

  ngOnInit(): void {}

  get relativePositionForMarginLeft() {
    return (this.currentElement / this.totalElements) * 100 + '%';
  }

  get width() {
    return (1 / this.totalElements) * 100 + '%';
  }
}
