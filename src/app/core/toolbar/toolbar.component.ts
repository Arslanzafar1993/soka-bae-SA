import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';

import { IconService } from '../icon.service';
import { NavigationService } from '@anosrv-core/navigation/navigation.service';

interface RouteDescription {
  routeId: string;
  icon: string;
}

@Component({
  selector: 'anosrv-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(
    private navigationService: NavigationService,
    public iconService: IconService
  ) {}

  get currentRoute(): Observable<RouteDescription> {
    return this.$currentRouteVal;
  }

  private $currentRouteVal: Observable<RouteDescription>;

  insertSVG(): SafeHtml {
    return this.iconService.getIcon(this.navigationService.config.icon);
  }

  get headerText(): string {
    return this.navigationService.config.toolbar;
  }

  ngOnInit(): void {}
}
