import { Injectable, Renderer2, RendererFactory2, RendererStyleFlags2 } from '@angular/core';

const importanFlag = RendererStyleFlags2.Important;

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private renderer: Renderer2;

  constructor(private renderFactory: RendererFactory2) {
    this.renderer = renderFactory.createRenderer(null, null);
  }

  public disable(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden', importanFlag);
  }

  public enable(): void {
    this.renderer.removeStyle(document.body, 'overflow');
  }
}
