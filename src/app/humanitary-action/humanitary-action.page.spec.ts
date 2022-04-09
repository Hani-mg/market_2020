import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HumanitaryActionPage } from './humanitary-action.page';

describe('HumanitaryActionPage', () => {
  let component: HumanitaryActionPage;
  let fixture: ComponentFixture<HumanitaryActionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanitaryActionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HumanitaryActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
