import { Component, OnInit } from '@angular/core';

import { ValidationConfig } from '../../../core/validators/validation-config';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

import { AccountManagementService } from '../../../services/account-management.service';
import {AuthenticationService} from '../../../core/authentication/authentication.service';
import { ChangepasswordModalPage } from '../changepassword-modal/changepassword-modal.page';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private toastCtrl : ToastController,
    private  modalController  : ModalController,
    private accountManagementService: AccountManagementService,
    private authenticationService: AuthenticationService ,
    private translate: TranslateService) { }

  validationMessages = ValidationConfig.validationMessages;
  userForm: FormGroup;
  showPassword = false;
  passwordToggleIcon ='eye';
 // loading = false;

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email : new FormControl('', Validators.required),//ValidationConfig.formControl.email,
      password : ValidationConfig.formControl.password
    });
  }

  onSubmit(){
    //this.loading = true;
    this.accountManagementService.signIn(this.userForm.value.email, this.userForm.value.password).subscribe( response =>{
      // console.log(' user ',response);
      this.authenticationService.startSession(response.user);
     // this.loading =  false;
      this.router.navigate(['/']);
      // this.translate.get('TEST DANS CODE').subscribe( value => {
      //   this.presentToast(value);
      //   }
      // );
    },
    error =>{
      // console.log('error ', error);
    });
  }

  forgotPassword(email) {
    this.accountManagementService.forgotPassword(email).subscribe( response =>{
      // // console.log(' forgot password ', response);
      this.openModal();
      this.translate.get(response.message).subscribe( value => {
        this.presentToast(value);
        }
      );
      this.modalController.dismiss();

    },
    error =>{
      // console.log('error ',error);
    });
  }

  async presentToast(messageError) {
    const toast = await this.toastCtrl.create({
        header: ' ',
        message: messageError,

        duration: 5000,
        });
    toast.present();
    }

  async presentForgotPasswordAlertPrompt() {
    let title ='Recuperation de mon compte';
    this.translate.get(title).subscribe( value => {
      title = value;
      }
    );
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'ok',
          handler: data => {
            // // console.log('Confirm Ok');
            this.forgotPassword(data.email);
          }
        }
      ]
    });

    await alert.present();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component : ChangepasswordModalPage
    });
    return await modal.present();
  }

  togglePassword(){
   if ( this.showPassword ) {
     this.passwordToggleIcon = 'eye-off-outline';
     this.showPassword =  false;
   } else {
    this.passwordToggleIcon = 'eye-outline';
    this.showPassword =  true;

   }
  }

}
