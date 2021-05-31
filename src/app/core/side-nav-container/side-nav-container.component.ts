import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { NavigationService } from '../navigation/navigation.service';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anosrv-sidenav-container',
  templateUrl: './side-nav-container.component.html',
  styleUrls: ['./side-nav-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
})
export class SideNavContainerComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() position = 'left';

  @Input() fullScreen: boolean;

  @Input() blockScroll = false;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() ariaCloseLabel: string;

  @Input() autoZIndex = true;

  @Input() baseZIndex = 0;

  @Input() dismissible = true;

  @Input() showCloseIcon = true;

  @ContentChildren(SidebarComponent) sidebarComponents: QueryList<SidebarComponent>;

  @Output() display: EventEmitter<any> = new EventEmitter();

  @Output() hide: EventEmitter<any> = new EventEmitter();

  @Output() visibleChange = new EventEmitter();

  initialized: boolean;
  preventVisibleChangePropagation: boolean;
  executePostDisplayActions: boolean;
  private visibleProp: boolean;
  private latestSidebarChanged?: SidebarComponent;
  private navEndSubscription: Subscription;

  constructor(public el: ElementRef, public renderer: Renderer2, private navigationService: NavigationService) {}

  @Input() get visible(): boolean {
    return this.visibleProp;
  }

  set visible(val: boolean) {
    this.visibleProp = val;

    if (this.initialized) {
      if (this.visibleProp) {
        this.doShow();
      } else {
        if (this.preventVisibleChangePropagation) {
          this.preventVisibleChangePropagation = false;
        } else {
          this.doHide();
        }
      }
    }
  }

  ngAfterViewInit() {
    this.initialized = true;
    this.navEndSubscription = this.navigationService.$navigationEnds.subscribe((navEnd: NavigationEnd) => this.close());
    if (this.visible) {
      this.doShow();
    }
  }

  ngAfterViewChecked() {
    if (this.executePostDisplayActions) {
      this.display.emit({});
      this.executePostDisplayActions = false;
    }
  }

  doShow() {
    this.executePostDisplayActions = true;
  }

  doHide() {
    this.hide.emit({});
  }

  close(event?: Event) {
    this.visible = false;
    this.latestSidebarChanged = undefined;
    this.visibleChange.emit(false);
    this.sidebarComponents.forEach((s) => (s.visible = false));
    if (event) {
      event.preventDefault();
    }
  }

  ngOnDestroy() {
    this.initialized = false;

    if (this.visible) {
      this.doHide();
    }

    this.navEndSubscription.unsubscribe();
  }

  toggleVisibility(newState: Partial<SidebarComponent>) {
    this.visible = newState.visible ? newState.visible : false;
    if (!this.latestSidebarChanged) {
      this.latestSidebarChanged = this.findSidebarByName(newState.name);
    } else {
      if (this.latestSidebarChanged.name === newState.name) {
        this.latestSidebarChanged = undefined;
      } else {
        this.findSidebarByName(this.latestSidebarChanged.name).visible = false;
        this.latestSidebarChanged = this.findSidebarByName(newState.name);
      }
    }
  }

  findSidebarByName(sidebarName?: string): SidebarComponent {
    const sidebars = this.sidebarComponents.filter((s) => s.name === sidebarName);
    if (sidebars.length === 1) {
      return sidebars[0];
    } else {
      throw new Error(`Sidebar component ${sidebarName} not found.`);
    }
  }
}
