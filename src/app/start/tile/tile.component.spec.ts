import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileComponent } from './tile.component';
import { SvgIconSpriteComponent } from '@anosrv-shared/svg-icon-sprite/svg-icon-sprite.component';

describe('TileComponent', () => {
  let component: TileComponent;
  let fixture: ComponentFixture<TileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TileComponent,
        SvgIconSpriteComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
