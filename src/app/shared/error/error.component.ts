import { Component, Input } from '@angular/core';
import { Hinweis } from '@anosrv-core/urlaub-antrag-payload';

@Component({
  selector: 'anosrv-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  text = '';
  code = '';

  @Input()
  inputId: string;

  @Input()
  set hinweise(hinweise: Hinweis[]) {
    const keys = [];
    hinweise.forEach(hinweis => {
      keys.push(hinweis.source);
      if (hinweis.source === this.inputId) {
        this.text = hinweis.message;
        this.code = hinweis.code;
      }
    });

    if (hinweise.length === 0) {
      this.text = '';
    }

    const inputKey = keys.find(key => key === this.inputId);
    if (inputKey === null || inputKey === undefined) {
      this.text = '';
    }
  }
}
