import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HilfeAllgemeinComponent } from './hilfe-allgemein.component';
import { UserStoreService } from '@anosrv-core/user-store.service';
import { HilfeFaqBoxComponent } from '../hilfe-faq-box/hilfe-faq-box.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HilfeAllgemeinComponent', () => {
  let component: HilfeAllgemeinComponent;
  let fixture: ComponentFixture<HilfeAllgemeinComponent>;

  const userStoreServiceStub = { user: { value: { arbeitnehmerNr: '0815123456789'}}};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HilfeFaqBoxComponent,
        HilfeAllgemeinComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: UserStoreService, useValue: userStoreServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HilfeAllgemeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userStoreServiceStub.user.value.arbeitnehmerNr = '0815123456789';
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return arbeitnehmerNr if given', () => {
    expect(component.artbeitnehmerNr.nummer).toBe('0815123456789');
  });

  it('should return 1234567891011 as arbeitnehmerNr if given', () => {
    userStoreServiceStub.user.value.arbeitnehmerNr = '';
    expect(component.artbeitnehmerNr.nummer).toBe('1234567891011');
    userStoreServiceStub.user.value.arbeitnehmerNr = undefined;
    expect(component.artbeitnehmerNr.nummer).toBe('1234567891011');
  });
});
