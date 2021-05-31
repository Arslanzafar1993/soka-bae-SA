import { Component, Input } from '@angular/core';

@Component({
  selector: 'anosrv-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent {

  @Input() semiEditable = false;
  @Input() id: string;

  constructor() { }

}
