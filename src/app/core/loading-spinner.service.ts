
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  constructor(public loadingController: LoadingController) { }
  isLoading = false;

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      // duration: 5000,
      message : 'Chargement',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    return await this.loadingController.dismiss().then(() => {
      console.log('dismissed');
      this.isLoading = false;
    })
      .catch(e => console.log(' error ',e));//just to catch error when dismiss is called before loader is created);
  }
}
