import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconService } from '@anosrv-core/icon.service';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'anosrv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public router: Router,
    public iconService: IconService
  ) {}
}
