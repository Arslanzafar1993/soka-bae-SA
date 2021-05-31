import { NgModule } from '@angular/core';
import { SidebarComponent } from '@anosrv-core/side-nav-container/sidebar.component';
import { SideNavContainerComponent } from '@anosrv-core/side-nav-container/side-nav-container.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SidebarComponent, SideNavContainerComponent],
  imports: [CommonModule],
  exports: [SideNavContainerComponent, SidebarComponent],
})
export class SidebarModule {}
