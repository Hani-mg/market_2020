import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { OfferService } from '../../../services/offer.service';
import { Offer} from '../../../models/offer-model';
import { AuthenticationService} from '../../../core/authentication/authentication.service';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  profile: any;
  wishlist: any =[];
  currentPage = 1;

  constructor(
    private dataService: DataService, 
    private offerService: OfferService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getWishList();
  }

  getWishList(){
    this.offerService.getWhishlist(this.authenticationService.user.idUser).subscribe( response =>{
      response.forEach(element => {
        this.wishlist.push(new Offer( element));
      });
    },
    error =>{
      // console.log('error ',error);
    });
  }

}
