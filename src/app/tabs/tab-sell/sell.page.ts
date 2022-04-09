import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ValidationConfig } from '../../core/validators/validation-config';
import { ActivatedRoute } from '@angular/router';
import {FilterService} from '../../services/filter.service';
import {OfferService} from '../../services/offer.service';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { LoadingSpinnerService} from '../../core/loading-spinner.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sell',
  templateUrl: 'sell.page.html',
  styleUrls: ['sell.page.scss']
})
export class SellPage implements OnInit {

  images: any;
  categories: any;
  towns: any;
  types: any;
  selectedCategory: any;
  selectedBrand: any;
  selectedCondition: any;

  title: string;
  idType: any;
  currentColor: string; // blue
  itemForm: FormGroup;
  humanitaryForm: FormGroup;
  validationMessages = ValidationConfig.validationMessages;
  postButtonIsEnable = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private camera: Camera,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private filterService: FilterService,
    private offerService: OfferService,
    private authenticationService: AuthenticationService,
    private toastCtrl: ToastController,
    private loadingSpinnerService: LoadingSpinnerService,
    private translate: TranslateService ) {}

  ngOnInit() {
    this.idType = this.activatedRoute.snapshot.paramMap.get('idType');
    
    this.initHumanitaryValidator();
   
    this.initValidator();
    const type = this.filterService.getTypes().find(x => x.idType == this.idType);
    this.itemForm.controls.type.setValue(type);
    this.humanitaryForm.controls.type.setValue(type);
    this.title = type.typeName;
    this.currentColor = type.color;
    this.images = [];
    this.categories = this.filterService.getCatgories();
    this.towns =  this.filterService.getTowns();
    this.types = this.filterService.getTypes();
  }

  initValidator(){
    this.itemForm = this.formBuilder.group({
      title : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      price : new FormControl('', Validators.required),
      // images: new FormControl('', Validators.required),
      category : new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      phoneNumberPermission: new FormControl(false, Validators.required)

    });
  }

  initHumanitaryValidator(){
    this.humanitaryForm = this.formBuilder.group({
      title : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      associationName : new FormControl('', Validators.required),
      // images: new FormControl('', Validators.required),
      cause : new FormControl('', Validators.required),
      info: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required)

    });
  }

  
  chooseCity(placeId){
  }

  onSubmit(){
    this.postButtonIsEnable = false;
    let phoneNumber = '';
    if(this.itemForm.value.phoneNumberPermission) {
      phoneNumber = this.authenticationService.user.phoneNumber;
    }
    this.offerService.createOffer(
      this.authenticationService.user.idUser,
      this.authenticationService.user.email,
      this.itemForm.value.title,
      this.itemForm.value.description,
      this.itemForm.value.price,
      this.itemForm.value.category.term_id,
      this.itemForm.value.town,
      this.itemForm.value.type.idType,
      phoneNumber,
      this.images
      ).subscribe( response => {
        this.translate.get(response.message).subscribe( value => {
          this.presentToast(value);
          }
        );
        this.postButtonIsEnable = true;
    },
    error => {
      // console.log('error ', error);
      this.postButtonIsEnable = true;
    });

  }

  onSubmitHumanitary(){

    this.postButtonIsEnable = false;
    let description = this.humanitaryForm.value.description+ '|' + this.humanitaryForm.value.associationName +'|' + this.humanitaryForm.value.cause + '|'+this.humanitaryForm.value.info; 
    this.offerService.createOffer(
      this.authenticationService.user.idUser,
      this.authenticationService.user.email,
      this.humanitaryForm.value.title,
      description,
      0,
      143,
      this.humanitaryForm.value.town,
      this.humanitaryForm.value.type.idType,
      '',
      this.images
      ).subscribe( response => {
        this.translate.get(response.message).subscribe( value => {
          this.presentToast(value);
          }
        );
        this.postButtonIsEnable = true;
    },
    error => {
      // console.log('error ', error);
      this.postButtonIsEnable = true;
    });

  }

  async addPhoto(source: string) {

    if (source === 'library') {

      const libraryImage = await this.openLibrary();
      this.images.push ('data:image/jpg;base64,' + libraryImage);
      this.images.reverse();

    } else {
      const cameraImage = await this.openCamera();
      this.images.push ('data:image/jpg;base64,' + cameraImage);
      this.images.reverse();
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
            this.addPhoto('camera');
          }
        }, {
          text: 'Choose from photo gallery',
          handler: () => {
            this.addPhoto('library');
          }
        }
            ]
    });

    await alert.present();
  }


  deletePhoto(index) {
    this.images.splice(index, 1);
 }


 categoryChange($event) {
 }

 typeChange($event) {
   if(this.idType !== 5){
    this.title = this.itemForm.value.type.typeName;
    this.currentColor = this.itemForm.value.type.color;
    this.idType = this.itemForm.value.type.idType;

   
   } else {
    this.title = this.humanitaryForm.value.type.typeName;
    this.currentColor = this.humanitaryForm.value.type.color;
    this.idType = this.humanitaryForm.value.type.idType;

   }
   const type = this.filterService.getTypes().find(x => x.idType == this.idType);
   this.itemForm.controls.type.setValue(type);
   this.humanitaryForm.controls.type.setValue(type);
}

 conditionChange($event) {
}

async presentToast(messageError) {
  const toast = await this.toastCtrl.create({
      header: ' ',
      message: messageError,

      duration: 3000,
      });
  toast.present();
  }

}
