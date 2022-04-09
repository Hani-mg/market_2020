import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { OfferService } from '../../services/offer.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Offer } from 'src/app/models/offer-model';

import { UtilPagination } from '../../core/util/util-pagination.module';
import { FilterService } from '../../services/filter.service';

import { LanguageService } from '../../services/language.service';
import { UtilLangFlag} from '../../core/util/util-lang-flag.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

products = [];
initialProducts = [];
latitude: number;
longitude: number;
currentPosition: Geoposition;
locality: any;
hideLocation = true;
listTitle = 'Annonces aux environs';
selected ='fr';
selectedFlag ='fr';

    constructor(
      private offerService: OfferService,
      private filterService: FilterService,
      private language: LanguageService,
      private nativeGeocoder: NativeGeocoder,
      private geolocation: Geolocation) {}

    currentPage = 1;
    ngOnInit() {
    this.getLastOffers();
  }

  select(event) {
    this.language.setLanguage(event.detail.value);
    this.selected = this.language.selected;
    this.selectedFlag = UtilLangFlag.getCountryCode(this.selected);
  }

  filterBytype(idType){
    this.products  = this.initialProducts.filter(x => x.idType == idType);  
  }
  getLastOffers(){
    this.listTitle ='Annonces récentes';
    this.offerService.getAllItem( UtilPagination.getOffset(this.currentPage), UtilPagination.getLimit() ).subscribe( response =>{
      this.hideLocation = false;
      response.forEach(element => {
        this.initialProducts.push(new Offer( element));
        this.products.push(new Offer( element));
      });
    },
    error =>{
      // console.log('error ',error);
    });
  }

  ionViewDidEnter(){
    this.setUserPosition();
  }

  async loadDefaultAnnounce(){
    await this.setUserPosition();

  }
  setUserPosition() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.currentPosition = resp;
      this.getCurrentPositionLocality();
    }).catch((error) => {
      // console.log('Error getting location', error);
    });
  }
 
   getCurrentPositionLocality(){

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
  
    this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        const town = result[0].locality;
        this.locality = this.filterService.getTowns().find( x => x.name == town);

        if (this.locality) {
          this.offerService. getItemByTown(
            this.locality.term_id,
            UtilPagination.getOffset(this.currentPage),
            UtilPagination.getLimit()
          ).subscribe( response => {
            this.listTitle = 'Annonces aux environs';
            this.hideLocation = true;
            this.products = [];
            response.forEach(element => {
              this.initialProducts.push(new Offer( element));
              this.products.push(new Offer( element));
            });

            if(this.products.length == 0){
              this.getLastOffers();
            }
          },
          error => {
            // console.log('error ',error);
          });
        } else {
          this.getLastOffers();
        }
      })
      .catch((error: any) =>  console.log(error));
  
  }

  loadData(event) {
      this.currentPage++;
      if (this.hideLocation) {
        this.offerService. getItemByTown(
          this.locality.name,
          UtilPagination.getOffset(this.currentPage),
          UtilPagination.getLimit()
        ).subscribe( response => {
            response.forEach(element => {
            this.initialProducts.push(new Offer( element));
            this.products.push(new Offer( element));
          });
        },
        error => {
          // console.log('error ', error);
        });
      } else {
        this.offerService.getAllItem(
          UtilPagination.getOffset(this.currentPage),
          UtilPagination.getLimit()
        ).subscribe( response => {
          response.forEach(element => {
            this.initialProducts.push(new Offer( element));
            this.products.push(new Offer( element));
          });
          event.target.complete();
        },
        error => {
          // console.log('error ', error);
        });
      }
  }

}
