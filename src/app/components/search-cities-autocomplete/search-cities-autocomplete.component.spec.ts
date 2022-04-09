import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchCitiesAutocompleteComponent } from './search-cities-autocomplete.component';

describe('SearchCitiesAutocompleteComponent', () => {
  let component: SearchCitiesAutocompleteComponent;
  let fixture: ComponentFixture<SearchCitiesAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCitiesAutocompleteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCitiesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
