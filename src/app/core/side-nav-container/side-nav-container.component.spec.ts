import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavContainerComponent } from './side-nav-container.component';
import { EventBusService } from '../eventbus/event-bus-service.service';
import { SidebarComponent } from './sidebar.component';
import { Component, NgZone } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationModule } from '../navigation/navigation.module';

const profileNavSidebar = 'profileNavSidebar';
const mainNavSidebar = 'mainNavSidebar';

@Component({ template: '' })
class SimpleComponent {}

@Component({
  template: ` <anosrv-sidenav-container #sideNavContainer>
    <anosrv-sidebar position="top" name="${profileNavSidebar}" (toggled)="sideNavContainer.toggleVisibility($event)" showCloseIcon="true">
      <nav id="profile-nav">
        <ul>
          <li>Profilenav 1</li>
          <li>Profilenav 2</li>
          <li>Profilenav 3</li>
        </ul>
      </nav>
    </anosrv-sidebar>
    <anosrv-sidebar position="left" name="${mainNavSidebar}" (toggled)="sideNavContainer.toggleVisibility($event)" showCloseIcon="true">
      <nav id="main-nav">
        <ul>
          <li>MainNav 1</li>
          <li>MainNav 2</li>
          <li>MainNav 3</li>
        </ul>
      </nav>
    </anosrv-sidebar>
  </anosrv-sidenav-container>`,
})
class TestHostComponent {}
describe('SideNavContainerComponent', () => {
  let component: SideNavContainerComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavContainerComponent, SidebarComponent, TestHostComponent],
      imports: [RouterTestingModule.withRoutes([{ path: 'nav1', component: SimpleComponent }]), NavigationModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.directive(SideNavContainerComponent)).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle profile navigation (top) sidebar', () => {
    // initial state
    expect(component.visible).toBeFalsy();
    component.sidebarComponents.forEach((s) => expect(s.visible).toBeFalsy());
    expect(fixture.debugElement.queryAll(By.css('#profile-nav li')).length).toBe(3);
    expect(fixture.debugElement.query(By.css('.ui-sidebar-active'))).toBeNull();

    // simulate button click event
    const eventBusService: EventBusService = TestBed.inject(EventBusService);
    eventBusService.emit({ name: profileNavSidebar, payload: 'toggle' });
    fixture.detectChanges();
    expect(component.visible).toBeTrue();
    expect(component.findSidebarByName(profileNavSidebar).visible).toBeTrue();
    expect(fixture.debugElement.query(By.css('.ui-sidebar-active'))).not.toBeNull();

    eventBusService.emit({ name: profileNavSidebar, payload: 'toggle' });
    fixture.detectChanges();
    expect(component.visible).toBeFalse();
    expect(component.findSidebarByName(profileNavSidebar).visible).toBeFalse();
  });

  it('should toggle main navigation (left) sidebar', () => {
    // initial state
    expect(component.visible).toBeFalsy();
    component.sidebarComponents.forEach((s) => expect(s.visible).toBeFalsy());
    expect(fixture.debugElement.queryAll(By.css('#main-nav li')).length).toBe(3);
    expect(fixture.debugElement.query(By.css('.ui-sidebar-active'))).toBeNull();

    // simulate button click event
    const eventBusService: EventBusService = TestBed.inject(EventBusService);
    eventBusService.emit({ name: mainNavSidebar, payload: 'toggle' });
    fixture.detectChanges();
    expect(component.visible).toBeTrue();
    expect(component.findSidebarByName(mainNavSidebar).visible).toBeTrue();
    expect(fixture.debugElement.query(By.css('.ui-sidebar-active'))).not.toBeNull();

    eventBusService.emit({ name: mainNavSidebar, payload: 'toggle' });
    fixture.detectChanges();
    expect(component.visible).toBeFalse();
    expect(component.findSidebarByName(mainNavSidebar).visible).toBeFalse();
  });

  it('should only display one sidebar menu', () => {
    // simulate button click event
    const eventBusService: EventBusService = TestBed.inject(EventBusService);
    eventBusService.emit({ name: mainNavSidebar, payload: 'toggle' });
    eventBusService.emit({ name: profileNavSidebar, payload: 'toggle' });
    fixture.detectChanges();
    expect(component.visible).toBeTrue();
    expect(component.findSidebarByName(profileNavSidebar).visible).toBeTrue();
    expect(component.findSidebarByName(mainNavSidebar).visible).toBeFalse();

    eventBusService.emit({ name: profileNavSidebar, payload: 'toggle' });
    eventBusService.emit({ name: mainNavSidebar, payload: 'toggle' });
    fixture.detectChanges();
    expect(component.visible).toBeTrue();
    expect(component.findSidebarByName(profileNavSidebar).visible).toBeFalse();
    expect(component.findSidebarByName(mainNavSidebar).visible).toBeTrue();
  });

  it('should close sidebars when user triggers a route change', async () => {
    // simulate button click event
    const eventBusService: EventBusService = TestBed.inject(EventBusService);
    eventBusService.emit({ name: mainNavSidebar, payload: 'toggle' });
    const ngZone = TestBed.inject(NgZone);
    const router = TestBed.inject(Router);
    ngZone.run(() => router.navigateByUrl('/nav1'));
    await fixture.whenStable();
    expect(component.visible).toBeFalse();
    expect(component.findSidebarByName(mainNavSidebar).visible).toBeFalse();
  });
});

interface NavigationService {
  $navigationEnds;
  navigateTo(url: string);
}
