import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from './navigation.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class NavigationModule {
  static forRoot(): ModuleWithProviders<NavigationModule> {
    return {
      ngModule: NavigationModule,
      providers: [
        {
          provide: NavigationService,
          useClass: NavigationService,
        },
      ],
    };
  }
}
