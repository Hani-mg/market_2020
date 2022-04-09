import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ValidationConfig } from '../../../core/validators/validation-config';
import { PasswordValidator } from '../../../core/validators/password.validator';
import {AccountManagementService} from '../../../services/account-management.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-changepassword-modal',
  templateUrl: './changepassword-modal.page.html',
  styleUrls: ['./changepassword-modal.page.scss'],
})
export class ChangepasswordModalPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private accountManagementService: AccountManagementService,
    private toastCtrl: ToastController,
    private modalController: ModalController) { }

    
  matchingPasswordsGroup: FormGroup;
  changePasswordForm: FormGroup;
  validationMessages = ValidationConfig.validationMessages;
  
  showPassword = false;
  passwordToggleIcon ='eye';

  ngOnInit() {

    this.initValidator();
  }

  initValidator() {

   

    /**Change password validator**/
    this.matchingPasswordsGroup = new FormGroup({
      newPassword: ValidationConfig.formControl.password,
      confirmNewPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.changePasswordForm = this.formBuilder.group({
      matchingPassword: this.matchingPasswordsGroup,
      email: ValidationConfig.formControl.email,
      code : new FormControl('', Validators.required),
    });
  }


  onSubmit(){
    this.accountManagementService.defineNewPassword(
      this.changePasswordForm.value.code,
      this.changePasswordForm.value.email,
      this.changePasswordForm.value.matchingPassword.newPassword,
      this.changePasswordForm.value.matchingPassword.confirmNewPassword).subscribe( response =>{
        this.presentToast(response.message);
    },
    error =>{
      // console.log('error ',error);
    });
  }

  
  async presentToast(messageError) {
    const toast = await this.toastCtrl.create({
        header: ' ',
        message: messageError,

        duration: 2000,
        });
    toast.present();
    }

  async closeModal(){
    await this.modalController.dismiss();
  }

  togglePassword(){
    if( this.showPassword ){
      this.passwordToggleIcon ='eye-off-outline';
      this.showPassword =  false;
    }
    else{
     this.passwordToggleIcon ='eye-outline';
     this.showPassword =  true;
 
    }
   }

}

