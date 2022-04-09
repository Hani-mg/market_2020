import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { OfferService } from '../../services/offer.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Offer } from '../../models/offer-model';
import { User } from '../../models/user';
import { Category } from '../../models/category.model';
import { OfferType } from '../../models/offer-type.model';
import { Town } from '../../models/town.model';
import { AccountManagementService} from '../../services/account-management.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OfferDetails} from '../../models/offer-details.model';
import { FilterService} from '../../services/filter.service';
declare var google;

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})

export class ProductPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

 
  urlGoogleMapEmbed='https://www.google.com/maps/embed/v1/place?key=AIzaSyDG4fEeEx7wC1AL2gQ-i_M6BRV05JWBQ88&q=';
  segment = 0; // activated segment by default
  hideVariation = true; // by default hide the product variation block
  profile: User;


    
  
  offer={
    idProduct: 0,
    productName: '',
    description: '',
    price: 0,
    date: new Date(),
    imgUrlList: [],
    durationUnit: '',
    duration: 0,
    favNumber: 0
  };//: Offer =new Offer();
  owner = {
    idUser: '',
    username : '',
    offerNumber: '',
    displayPhoneNumber: '',
    phoneNumber: ''

  };//: User = new User();
  category  = new Category();//: Category = new Category();
  town= new Town();
  offerType={};//: OfferType = new OfferType();
  id: number;
  lastOffers = [];
  similarItems = [];

  color: string;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private dataService: DataService ,
    private offerService: OfferService,
    private filterService: FilterService,
    private authenticationService: AuthenticationService,
    private accountManagementService: AccountManagementService,
    private platform: Platform,
    private dom:DomSanitizer) {
     }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));  
    this.profile =  this.authenticationService.user; 
    this.loadProductDetail();
    this.loadSimilarItems();
    this.loadLastOffers();

  }
  
  getMapUrl(townName){
    const url=this.urlGoogleMapEmbed + townName;
    return this.dom.bypassSecurityTrustResourceUrl(url); 
  }


  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  async toogleVariation() {
      this.hideVariation = false;
  }


isFav(itemId) {
  if (this.profile !==  undefined && this.profile.wishlist.indexOf(itemId) > -1) {
    return true;
  }
}

toogleFav(itemId) {
  if (this.profile ){
    if (this.profile.wishlist.indexOf(itemId) > -1) {
      this.offerService.removeToWishlist(this.authenticationService.user.idUser, itemId).subscribe( response =>{
        this.profile.removeToWishList(itemId);
      },
      error =>{
        // console.log('error ',error);
      });
    } else {
      this.offerService.addToWishlist(this.authenticationService.user.idUser, itemId).subscribe( response =>{
        this.profile.addToWishList(itemId);
      },
      error =>{
        // console.log('error ',error);
      });
    }
  }
}


getTabNumber(num) {
  return new Array(num);
}

loadProductDetail(){
  this.offerService.getItemDetail(this.id).subscribe( response =>{
    const offerDetail = new OfferDetails(response);
    this.offer = offerDetail.getOffer();
    this.owner = offerDetail.getAuthor();
    this.category= offerDetail.getCategory();
    this.town = offerDetail.getTowns();
    this.offerType = offerDetail.idType;
    
    this.color = this.filterService.getTypesById(this.offerType).color;
    this.loadSimilarItems();
  },
  error =>{
    // console.log('error ',error);
  });
}


loadSimilarItems(){
  this.offerService.getSimilarItems( this.category.idCategory).subscribe( response =>{
    response.forEach(element => {
      this.similarItems.push(new Offer( element));
    });
  },
  error => {
    // console.log('error ', error);
  });
}

loadLastOffers(){
  this.offerService.getLastOffers().subscribe( response =>{
   
    response.forEach(element => {
      this.lastOffers.push(new Offer( element));
    });
  },
  error =>{
    // console.log('error ',error);
  });
}

}




