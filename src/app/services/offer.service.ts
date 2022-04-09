
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiServiceConf } from './api-service-conf';
import { Offer } from '../models/offer-model';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends ApiServiceConf {

  constructor(private httpClient: HttpClient) { 
    super();
  }

  getAllItem(offset, limit): Observable<any>{
    const url = this.serverUrlOnline + 'annonces?offset=' + offset + '&limit=' + limit;
    return this.httpClient.get<any>(url);
  }
  getItemByTown(idTown, offset, limit): Observable<any>{
    const url = this.serverUrlOnline + 'annonces?locationID=' + idTown + '&offset=' + offset + '&limit=' + limit;
    return this.httpClient.get<any>(url);
  }

  getLastOffer(): Observable<any>{
    const url = this.serverUrl + 'eOffer.json';
    console.log('url ',url);
    return this.httpClient.get<any>(url);
  
  }

  
  test(): Observable<any>{
   let url = "https://market.herokuapp.com/wp-json/market/v2/annonces?he=20&categid=0";
   console.log('url test',url);
   return this.httpClient.get<any>(url);
  }

  Search(keyword, town, category, type): Observable<any>{
    let url = this.serverUrlOnline + 'annonces?force=200';
    let arrayParam = [];

    if (keyword) {
      arrayParam.push( { name: 'q', value: keyword });
    }
    if (town) {
      arrayParam.push( { name: 'locationID', value: town });
    }
    if (category) {
      arrayParam.push( { name: 'categid', value: category });
    }
    if (type) {
      arrayParam.push( { name: 'idType', value: type });
    }
    url += this.concatParam(arrayParam);
    return this.httpClient.get<any>(url);
  }
  
  getItemDetail(idItem): Observable<any>{
    const url = this.serverUrlOnline+'annonce/'+idItem;
    return this.httpClient.get<any>(url);
  }

  getSimilarItems(idItemCategory): Observable<any>{
    const url = this.serverUrlOnline + 'annonces?categid=' + idItemCategory +'&offset=0&limit=4';
    return this.httpClient.get<any>(url);
  }
  getLastOffers(): Observable<any>{
    const url = this.serverUrlOnline + 'annonces?ordre=dernier&offset=0&limit=4';
    return this.httpClient.get<any>(url);
  }

  createOffer(idUSer,email, title, description, price, idCategory, idTown, idType, phoneNumber, imgList){
    const url = this.serverUrlOnline + 'annonce/creer';
    const imgConcat = imgList.join('|'); 

    let postData = {
      "idUser":idUSer,
      "title": title,
      "desc": description,
      "price": price,
      "cat": idCategory,
      "city":idTown,
      "type_of_sell": idType,
      "files": imgConcat,
      "show_phone":0
    }

    return this.httpClient.post<any>(url, postData);
  }

  getMyoffer(idUser): Observable<any>{
    const url = this.serverUrlOnline + 'mes-annonces/'+idUser;
    return this.httpClient.get<any>(url);
  }

  updateMyOffer(idUSer, title, description, price, idCategory, idTown, idType, phoneNumberPermission, imgList, idItem){
    const url = this.serverUrlOnline + 'annonce/' + idItem;
    const imgConcat = imgList.join('|'); 
    
    let postData = {
      "idUser":idUSer,
      "title": title,
      "desc": description,
      "price": price,
      "cat": idCategory,
      "city":idTown,
      "type_of_sell": idType,
      "files": imgConcat,
      "show_phone":phoneNumberPermission
    }
    return this.httpClient.post<any>(url, postData);
  }

  deleteMyOffer(idOffer): Observable<any>{
    const url = this.serverUrlOnline + 'annonce/'+idOffer;
    return this.httpClient.delete<any>(url);
  }
  getWhishlist(idUser): Observable<any>{
    
    const url =this.serverUrlOnline + 'mes-favoris/' + idUser;
    return this.httpClient.get<any>(url);
  }

  addToWishlist(idUser, idOffer): Observable<any>{
    const url = this.serverUrlOnline + 'mes-favoris/'+idUser;
    let postData = {
      
      "idA" : idOffer
    }
    return this.httpClient.post<any>(url, postData);
  }

  removeToWishlist(idUser, idOffer): Observable<any>{
    const url = this.serverUrlOnline + 'favoris/supprimer';
    let postData = {
      "idUser" : idUser,
      "idA" : idOffer
    }
    return this.httpClient.post<any>(url, postData);
  }


}
