import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { User } from '../../models/user';
import { Offer} from '../../models/offer-model';
import { AccountManagementService} from '../../services/account-management.service';
import { OfferService} from '../../services/offer.service';
import { UtilDate} from '../../core/util/util-date.module';
import { FilterService} from '../../services/filter.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @Input() products: Array<Offer>;
  @Input() hideLocation: boolean;
  // @Output() load = new EventEmitter<boolean>();

  profile: User;
  constructor(
    private toastCtrl : ToastController,
    private dataService: DataService, 
    private authenticationService: AuthenticationService,
    private accountManagementService : AccountManagementService,
    private offerService: OfferService,
    private filterService : FilterService) { }

  ngOnInit() {
    // this.profile = this.dataService.getProfile();
    this.profile = this.authenticationService.user;
    // console.log(this.products);
    // let user = new User();
    // user.addToWishList(1);;
    // // console.log(' fake user ',user)

    //test
    // this.accountManagementService.signIn('email','motdepasse').subscribe( response =>{
    //   this.profile = new User(response);
    //   // console.log(' Profile ', this.profile);
    // },
    // error =>{
    //   // console.log('error ',error);
    // });
    
    

  }

  // check if the product is in the wishlist of the current user (src/app/datas/users.json : user id = 1 wishlist tab )
  isFav(itemId) {
    if (this.profile !== undefined && this.profile.wishlist.indexOf(itemId) > -1) {
      return true;
    } else {
      return false;
    }
  }

  // public getDurationFromNow(date){
  //   // console.log(' now ', (new Date()).valueOf() );
  //   // console.log(date,' create date ',(new Date(date)));
  //   return (new Date()).valueOf() - (new Date(date)).valueOf();
  // }
// On click toogle the value of wishlist
  toogleFav(itemId) {
    if (this.profile ){
      if (this.profile.wishlist.indexOf(itemId) > -1) {
        this.offerService.removeToWishlist( this.authenticationService.user.idUser, itemId).subscribe( response =>{
          this.profile.removeToWishList(itemId);
          // console.log( 'remove fav ', response,' list ', this.profile.wishlist);
        },
        error =>{
          // console.log('error ',error);
        });
      } else {
        this.offerService.addToWishlist( this.authenticationService.user.idUser, itemId).subscribe( response =>{
          this.profile.addToWishList(itemId);
          // console.log( 'add fav ', response,' list ', this.profile.wishlist);
        },
        error =>{
          // console.log('error ',error);
        });
      }
      // console.log(' whishlist ', this.profile.wishlist);
    }  else {
      
      this.presentToast(' Veuillez vous connecter ');
    }
  }

  async presentToast(messageError) {
    const toast = await this.toastCtrl.create({
        header: ' ',
        message: messageError,

        duration: 5000,
        });
    toast.present();
    }

    getProductColor(idType){
     return this.filterService.getTypesById(idType).color;
    }
    getProductLabel(idType){
      return this.filterService.getTypesById(idType).label;
     }
  // https://angular.io/guide/component-interaction#!#bidirectional-service
  // loadData(){
    
  //     this.load.emit(true);
    
  // }

}
