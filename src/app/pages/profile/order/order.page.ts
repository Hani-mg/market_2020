import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { OfferService} from '../../../services/offer.service';

import { ToastController } from '@ionic/angular';

import {PopoverController} from '@ionic/angular';
import { OffertypePopoverComponent} from '../../../components/offertype-popover/offertype-popover.component';
import { AuthenticationService} from '../../../core/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  offerStatus = [
    {status: 0, name: 'En modération', color: 'warning'},
    {status: 1, name: 'Validé', color: 'success'},
    {status: 2, name: 'Refusé', color: 'danger'},
  ];

  myOffer: any;
  constructor( 
    public alertController: AlertController, 
    public offerService: OfferService, 
    public toatsController: ToastController,
    private popover: PopoverController,
    private authenticationService: AuthenticationService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getMyoffer();
  }

  getMyoffer(){
    this.offerService.getMyoffer(this.authenticationService.user.idUser).subscribe( response =>{
      this.myOffer = response;

    },
    error =>{
      // console.log('error ',error);
    });
  }

  
  async presentAlertConfirm(idOffer) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: ' <p translate>Voulez-vous vraiment supprimer cet element ?</p>',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.deleteMyOffer(idOffer);
          }
        },
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
  }

  deleteMyOffer(idOffer){
    this.offerService.deleteMyOffer(idOffer).subscribe( response =>{
      this.translate.get(response.message).subscribe( value => {
        this.presentToast(value);
        }
    );
      this.getMyoffer();
    },
    error =>{
      // console.log('error ',error);
    });
  }

  async presentToast(messageError) {

    const toast = await this.toatsController.create({
        header: ' ',
        message: messageError,

        duration: 2000,
        });
    toast.present();
    }
    getStatus(status){
      return this.offerStatus[status].name;
    }

    getColor(status){
      return this.offerStatus[status].color;
    }
    CreatePopover()
   {
     this.popover.create({component:OffertypePopoverComponent,
     showBackdrop:true}).then((popoverElement)=>{
       popoverElement.present();
     });
   }
}
