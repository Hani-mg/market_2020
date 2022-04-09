import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected = '';
  constructor(private translate: TranslateService, public loadingController: LoadingController, private router: Router) { }
  // set the default language of the application
  setInitialAppLanguage() {
    /*const language = this.translate.getBrowserLang();*/
    const language = 'fr';
    this.translate.setDefaultLang(language);
    this.selected = language;
    return language;
  }

  setLanguage(setLang) {
    this.presentLoading();
    this.translate.use(setLang);
    this.selected = setLang;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait ...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/');
  }

}
