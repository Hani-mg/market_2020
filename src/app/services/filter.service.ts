import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiServiceConf } from '../services/api-service-conf';
import { Category } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class FilterService extends ApiServiceConf {

  private types: any;
  private categories: any = [];
  private towns: any =[];

  constructor(private httpClient: HttpClient) { 
    super();
    this.types = [
      {
        "idType":1,
        "typeName":"Vendre",
        "label":"Vente",
        "color":'blue'
      },
      {
        "idType":2,
        "typeName":"Donner",
        "label":"Don",
        "color":'yellow'
      },
      {
        "idType":3,
        "typeName":"Louer",
        "label":"Location",
        "color":'pink'
      },
      {
        "idType":4,
        "typeName":"Echanger",
        "label":"Echange",
        "color":'green'
      },
      {
        "idType":5,
        "typeName":"Action humanitaire",
        "color":'purple'
      }
    ]
  }

  setCatgories(){
    const url = this.serverUrlOnline +'categories';
    this.httpClient.get<any>(url).subscribe( response =>{
      
      this.setCategoryParentName(response);
    },
    error =>{
      console.log('error ',error);
    });
  }

  setTowns(){
    const url = this.serverUrlOnline +'locations';
    this.httpClient.get<any>(url).subscribe( response =>{
    this.towns= response;
    this.setTownParentName(this.towns);
    },
    error =>{
      console.log('error ',error);
    });
  }

  setCategoryParentName(list){
    list.forEach((part, index, category) => {
      const parent = list.find( x => x.term_id === category[index].parent);
      if(parent){
        category[index].parentName = parent.name;
        this.categories.push( category[index]);
      }
    });
  }

  setTownParentName(list){
    list.forEach((part, index, town) => {
      const parent = list.find( x => x.term_id === town[index].parent);
      if(parent){
        town[index].parentName = parent.name;
        this.towns.push( town[index]);
      }
    });
  }


  getCatgories(){
    return this.categories;
  }

  getTowns(){
    return this.towns;
  }
  getTypes(){
    return this.types;
  }

  getTypesById( id ){
    return this.types.find(e => e.idType === id);
  }
  
  searchTown(text){
    const url = this.serverUrlOnline + 'cities?q=' + text;
    console.log( ' search ',url);
    return this.httpClient.get<any>(url);
  }

  getCategoriesGroupByParent(){
    const categoriesMap= this.groupBy( this.categories, category => category.parentName);
    const categoriesArray =[]
    categoriesMap.forEach((value: boolean, key: string) => {
      categoriesArray.push({ parent : key, categories: value});
    });
    return categoriesArray;
  }

  getTownsGroupByParent(){
    const locationMap= this.groupBy( this.towns, town => town.parentName);
    const locationArray =[]
    locationMap.forEach((value: boolean, key: string) => {
      locationArray.push({ parent : key, towns: value});
    });
    return locationArray;
  }

 groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

}
