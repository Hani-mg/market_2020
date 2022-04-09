import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SortingListComponent } from './sorting-list.component';

describe('SortingListComponent', () => {
  let component: SortingListComponent;
  let fixture: ComponentFixture<SortingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
