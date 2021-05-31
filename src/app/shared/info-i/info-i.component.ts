import { Component, Input, ElementRef, ViewChild,  AfterViewInit } from '@angular/core';
import { IconService } from '@anosrv-core/icon.service';
import { ModalService } from '@anosrv-core/modal.service';

@Component({
  selector: 'anosrv-info-i',
  templateUrl: './info-i.component.html',
  styleUrls: ['./info-i.component.scss']
})
export class InfoIComponent implements AfterViewInit {

  @ViewChild('icon') element: ElementRef;

  @Input()
  public name: string;

  @Input()
  public variant: 'mobile';

  constructor(
    public iconService: IconService,
    public modalService: ModalService
  ) {}

  get iconSize() {
    if (this.variant === 'mobile') {
      return { width: '15px', height: '15px' };
    } else {
      return { width: '21px', height: '21px' };
    }
  }

  ngAfterViewInit(): void {
    this.element.nativeElement.addEventListener('click', (event) => {
      this.modalService.open(this.name);
    });
  }

}
