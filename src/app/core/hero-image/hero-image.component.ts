import { Component, Input, OnInit } from '@angular/core';
import {NavigationService} from '@anosrv-core/navigation/navigation.service';

@Component({
  selector: 'anosrv-hero-image',
  templateUrl: './hero-image.component.html',
  styleUrls: ['./hero-image.component.scss']
})
export class HeroImageComponent implements OnInit {

  @Input() showOverlay = false;
  @Input() topLeftText = '';

  constructor(
   private navigationService: NavigationService
  ) { }

  get image(): string {
    return this.navigationService.config.image;
  }

  ngOnInit(): void {
  }

}
