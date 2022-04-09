import { Injectable } from '@angular/core';
declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private countries: any;

  constructor() {
    this.countries = require('../datas/countries.json');


  }
  getCountries() {
    return this.countries;
  }


}
