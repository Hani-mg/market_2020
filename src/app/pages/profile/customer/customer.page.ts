import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UtilService } from 'src/app/services/util.service';
import { TranslateService } from '@ngx-translate/core';


import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ValidationConfig } from '../../../core/validators/validation-config';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { PhoneValidator } from '../../../core/validators/phone.validator';
import { CountryPhone } from '../../../models/country-phone.model';

import {AccountManagementService} from '../../../services/account-management.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { AuthenticationService } from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;

  segment = 0;
  currentUser = false;
  id: number;
  user: any;
  memberItems: any;

  userInformationForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  changePasswordForm: FormGroup;
  validationMessages = ValidationConfig.validationMessages;
  countryPhoneGroup: FormGroup;
  // countries: Array<CountryPhone>;
  countries = [];
  state;
  countrySelected: CountryPhone;

  image: any;
  
  showPassword = false;
  passwordToggleIcon ='eye';

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private utilService: UtilService,
    public formBuilder: FormBuilder,
    public accountManagementService: AccountManagementService,
    private authenticationService: AuthenticationService,
    public alertController: AlertController,
    private camera: Camera,
    public toatsController: ToastController,
    private translate: TranslateService) { }

  ngOnInit() {


    if (this.activatedRoute.snapshot.paramMap.get('id') === '1') {
      this.currentUser = true;
    }

    // tslint:disable-next-line:radix
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.user = this.dataService.getSingleUser(this.id);
    this.memberItems = this.dataService.getMemberItems(this.id);

    // console.log(this.memberItems);
    this.countries = this.utilService.getCountries();
    this.initValidator();
    this.initializeMyInformation();

  }

  initializeMyInformation(){
    
    this.userInformationForm.controls.lastName.setValue(this.authenticationService.user.lastname);
    this.userInformationForm.controls.firstName.setValue(this.authenticationService.user.firstname);
    this.userInformationForm.controls.email.setValue(this.authenticationService.user.email);
    //code pays
    this.userInformationForm.controls.countryPhone.get('phone').setValue(this.authenticationService.user.phoneNumber);
    // console.log(' image ',this.authenticationService.user. profilUrlImg);
    this.toDataURL(this.authenticationService.user. profilUrlImg)
      .then(dataUrl => {
        this.image = dataUrl;
      });
  }

  toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }))

  countryChange() {
    this.countrySelected = new CountryPhone(this.userInformationForm.value.countryPhone.country.alpha2Code,
      this.userInformationForm.value.countryPhone.country.name);
  }
  initValidator() {
    //  We just use a few random countries, however, you can use the countries you need by just adding them to this list.
    // also you can use a library to get all the countries from the world.
    // this.countries = [
    //   new CountryPhone('UY', 'Uruguay'),
    //   new CountryPhone('US', 'United States'),
    //   new CountryPhone('BR', 'Brasil')
    // ];

    /**update information validator **/
    let country = new FormControl(this.countries[0]);
    this.countrySelected = new CountryPhone(this.countries[0].alpha2Code, this.countries[0].name);
    let phone = new FormControl('', Validators.compose([
      PhoneValidator.validCountryPhone(country)
    ]));
    this.countryPhoneGroup = new FormGroup({
      country: country,
      phone: phone
    });

    this.userInformationForm = this.formBuilder.group({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: ValidationConfig.formControl.email,
      countryPhone: this.countryPhoneGroup,
      // phoneNumber : new FormControl('', Validators.required)
    });
    /* */

    /**Change password validator**/
    this.matchingPasswordsGroup = new FormGroup({
      newPassword: ValidationConfig.formControl.password,
      confirmNewPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.changePasswordForm = this.formBuilder.group({
      // currentPassword : { ...ValidationConfig.formControl.password },
      currentPassword: new FormControl('', Validators.required),
      matchingPassword: this.matchingPasswordsGroup
    });
  }

  onSubmitChangePassword() {
    this.accountManagementService.changePassword(
      this.authenticationService.user.idUser,
      this.changePasswordForm.value.currentPassword, 
      this.changePasswordForm.value.matchingPassword.newPassword,
      this.changePasswordForm.value.matchingPassword.confirmNewPassword,
      ).subscribe( response =>{
      this.translate.get(response.message).subscribe( value => {
        this.presentToast(value);
        }
      );
      // console.log(' password change :', response.message);
    },
    error =>{
      // console.log('error ',error);
    });
   }

  onSubmitUpdateInformation() {
    this.accountManagementService.editInformation(
      this.authenticationService.user.idUser,
      this.authenticationService.user.username,
      this.userInformationForm.value.lastName,
      this.userInformationForm.value.firstName,
      this.userInformationForm.value.email,
      this.countrySelected.iso,
      this.userInformationForm.value.countryPhone.phone,
      this.image
    ).subscribe( response =>{
      this.translate.get(response.message).subscribe( value => {
        this.presentToast(value);
        }
      );
    },
    error =>{
      // console.log('error ',error);
    });
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  //upload image
  async choosePhoto(source: string) {

    if (source === 'library') {

      const libraryImage = await this.openLibrary();
      this.image ='data:image/jpg;base64,' + libraryImage;

    } else {
      const cameraImage = await this.openCamera();
      this.image ='data:image/jpg;base64,' + cameraImage;
    }
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      buttons: [
        {
          text: 'Take photo',
          handler: () => {
            this.choosePhoto('camera');
          }
        }, {
          text: 'Choose from photo gallery',
          handler: () => {
            this.choosePhoto('library');
          }
        }
            ]
    });

    await alert.present();
  }
  async presentToast(messageError) {

    const toast = await this.toatsController.create({
        header: ' ',
        message: messageError,

        duration: 2000,
        });
    toast.present();
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
