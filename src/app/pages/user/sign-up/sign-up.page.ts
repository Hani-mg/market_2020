import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ValidationConfig } from '../../../core/validators/validation-config';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { Router } from '@angular/router';

import { AccountManagementService } from '../../../services/account-management.service';

import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private accountManagementService: AccountManagementService,
    private toastCtrl : ToastController) { }

  validationMessages = ValidationConfig.validationMessages;
  userForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  
  showPassword = false;
  passwordToggleIcon ='eye';
  loading = false;

  ngOnInit() {
    //init validator
    this.matchingPasswordsGroup = new FormGroup({
      password: ValidationConfig.formControl.password,
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.userForm = this.formBuilder.group({
      lastName : new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email : ValidationConfig.formControl.email,
      matchingPasswords : this.matchingPasswordsGroup,
      username : new FormControl('', Validators.required),
      terms : new FormControl(false, Validators.pattern('true')),
    });
  }

  onSubmit(){
    this.loading = true;
    this.accountManagementService.signUp(
      this.userForm.value.lastName,
      this.userForm.value.firstName,
      this.userForm.value.email,
      this.userForm.value.matchingPasswords.password,
      this.userForm.value.matchingPasswords.confirm_password,
      this.userForm.value.username
      ).subscribe( response => {
        this.presentToast(response.message);
        this.loading = false;
        this.router.navigate(['/sign-in']);
        // // console.log(' You should validate your sign up in your email ', response.message);
    },
    error =>{
      // console.log('error ', error);
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

    togglePassword() {
      if( this.showPassword ){
        this.passwordToggleIcon = 'eye-off-outline';
        this.showPassword =  false;
      } else {
       this.passwordToggleIcon = 'eye-outline';
       this.showPassword =  true;
      }
    }
}
