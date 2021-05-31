import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavigationService } from './navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  template: ''
})
class EmptyComponent {}

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;

  const routes: Routes = [
    {path: 'urlaub', component: EmptyComponent},
    {path: 'urlaub/guthaben/auszahlung', component: EmptyComponent},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ]
    });

    router = TestBed.inject(Router);
    service = TestBed.inject(NavigationService);
    router.initialNavigation();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads base config', () => {
    expect(service.config.icon).toEqual('');
    expect(service.config.image).toEqual('');
    expect(service.config.toolbar).toEqual('');
    expect(service.config.hideToolbar).toBeFalse();
    expect(service.config.hideHeader).toBeFalse();
    expect(service.config.lightHeader).toBeFalse();
  });

  it('loads config for "/urlaub"', fakeAsync(() => {
    service.$navigationEnds.subscribe(() => {
      expect(service.config.icon).toEqual('urlaub');
      expect(service.config.image).toEqual('assets/images/urlaub-gross.jpg');
      expect(service.config.toolbar).toEqual('toolbar.urlaub');
      expect(service.config.hideToolbar).toBeFalse();
      expect(service.config.hideHeader).toBeFalse();
      expect(service.config.lightHeader).toBeFalse();
    });
    router.navigate(['/urlaub']);
    tick();
  }));

  it('loads inherited values for "/urlaub/guthaben/auszahlung', fakeAsync(() => {
    service.$navigationEnds.subscribe(() => {
      expect(service.config.icon).toEqual('urlaub');
      expect(service.config.image).toEqual('assets/images/urlaub-gross.jpg');
      expect(service.config.toolbar).toEqual('toolbar.urlaub-guthaben-auszahlung');
      expect(service.config.hideToolbar).toBeTrue();
      expect(service.config.hideHeader).toBeTrue();
      expect(service.config.lightHeader).toBeFalse();
    });
    router.navigateByUrl('/urlaub/guthaben/auszahlung');
    tick();
  }));
});
