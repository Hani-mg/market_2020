import { Component, OnInit, Output, EventEmitter, forwardRef, Input} from '@angular/core';
import {FilterService} from '../../services/filter.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-search-cities-autocomplete',
  templateUrl: './search-cities-autocomplete.component.html',
  styleUrls: ['./search-cities-autocomplete.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchCitiesAutocompleteComponent),
      multi: true
    }
  ]
})
export class SearchCitiesAutocompleteComponent implements ControlValueAccessor {

  constructor(private filterService : FilterService) {   }
  
  searchedTown = [] ;
  @Input () cityName : string;
  selectedTownId = '';
  @Output() citySelected = new EventEmitter<string>();
  // private townValue: any = '';
 

  // get townValue() {
  //   return this.selectedTownId;
  // }

  // set townValue(val) {
  //   this.selectedTownId = val;
  //   this.propagateChange(this.selectedTownId);
  // }

  // ngOnInit( ) {}
  write_input($event) {
    this.cityName = $event.target.value;
  }
  searchTown(event, city){
    // console.log(' did enter view',city);
    this.propagateChange('');
    this.filterService.searchTown(
      city
      ).subscribe( response => {
        // // console.log(' search cities ', response);
        this.searchedTown = response.predictions;
        // console.log(this.searchedTown);
    },
    error => {
      // console.log('error ', error);
    });
  }

  chooseTown(id, description){
    this.selectedTownId = id;
    this.searchedTown =[];
    this.cityName = description;
    this.propagateChange(this.selectedTownId);
    this.citySelected.emit(this.selectedTownId);
  }

  // Allow Angular to set the value on the component
  writeValue(value): void {
    this.selectedTownId = value;
  }

  propagateChange = (_: any) => {};
  // Save a reference to the change function passed to us by 
  // the Angular form control
  registerOnChange(fn): void {
    this.propagateChange  = fn;
  }

  // Save a reference to the touched function passed to us by 
  // the Angular form control
  registerOnTouched(fn: any): void {
    // this.onTouch = fn;    
  }

  
}
