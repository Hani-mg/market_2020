import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ValidationConfig } from '../../../core/validators/validation-config';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';


import {OfferService} from '../../../services/offer.service';
import {FilterService} from '../../../services/filter.service';
import { AuthenticationService } from '../../../core/authentication/authentication.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {

  idItem: any;
  images: any = [];
  categories: any;
  towns: any;
  types: any;
  townName: string;
  selectedCategory: any;
  selectedCondition: any;

  title: string;
  currentColor: string;
  itemForm: FormGroup;
  validationMessages = ValidationConfig.validationMessages;
  updateButtonIsEnable = true;
  humanitaryForm: FormGroup;
  idType: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private camera: Camera, 
    public alertController: AlertController, 
    public formBuilder: FormBuilder,
    private dataService: DataService,
    private offerService: OfferService,
    private filterService: FilterService,
    private authenticationService: AuthenticationService,
    public toatsController: ToastController,
    private translate: TranslateService ) {}

  ngOnInit() {
    this.idItem = this.activatedRoute.snapshot.paramMap.get('idItem');
    this.images = [];
    this.initValidator();
    this.initHumanitaryValidator();
    // this.categories = this.dataService.getSubCategories();
    this.categories = this.filterService.getCatgories();
    this.towns =  this.filterService.getTowns();
    this.types = this.filterService.getTypes();
    
    this.getItemDetail();
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
      info: new FormControl('', Validators.required)

    });
  }


  getItemDetail(){
    this.offerService.getItemDetail(this.idItem).subscribe( response => {

      const type = this.types.find(x => x.idType == response.type.idType);
      this.idType = type.idType;
      this.currentColor = type.color;
      this.title = type.typeName;
      if(this.idType != 5){
        this.convertImagesToBase64(response.offer.imgUrlList);
        this.itemForm.controls.title.setValue(response.offer.productName);
        this.itemForm.controls.description.setValue(response.offer.description);
        this.itemForm.controls.price.setValue(response.offer.price);
        this.itemForm.controls.category.setValue( this.categories.find(x => x.term_id == response.categorie.idCategory)  );
      
        this.filterService.searchTown(
          response.town.townName
          ).subscribe( responseTown => {
            this.itemForm.controls.town.setValue(responseTown.predictions[0].place_id);
            this.townName = responseTown.predictions[0].description;
        },
        error => {
          // console.log('error ', error);
        });
        this.itemForm.controls.type.setValue(type);
        
        this.itemForm.controls.phoneNumberPermission.setValue(false);
      } else {
        this.convertImagesToBase64(response.offer.imgUrlList);
        this.humanitaryForm.controls.title.setValue(response.offer.productName);
        const about = response.offer.description.split('|');
        this.humanitaryForm.controls.description.setValue(about[0]);
        this.humanitaryForm.controls.associationName.setValue(about[1]);
        this.humanitaryForm.controls.cause.setValue(about[2]);
        this.humanitaryForm.controls.info.setValue(about[3]);

        this.filterService.searchTown(
          response.town.townName
          ).subscribe( responseTown => {
            this.humanitaryForm.controls.town.setValue(responseTown.predictions[0].place_id);
            this.townName = responseTown.predictions[0].description;
        },
        error => {
          // console.log('error ', error);
        });
      }
    },
    error =>{
      // console.log('error ',error);
    });
  }

  chooseCity(placeId){
  }

  
  
  convertImagesToBase64(images){
    for (let i = 0; i < images.length; i++) {
        this.toDataURL2(images[i])
      .then(dataUrl => {
        this.images.push(dataUrl);

      });
    }
  }

  toDataURL2 = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }))

  async onSubmit() {
    this.updateButtonIsEnable = false;
    await this.offerService.updateMyOffer(
      this.authenticationService.user.idUser,
      this.itemForm.value.title,
      this.itemForm.value.description,
      this.itemForm.value.price,
      this.itemForm.value.category.term_id,
      this.itemForm.value.town,
      this.itemForm.value.type.idType,
      Number(this.itemForm.value.phoneNumberPermission),
      this.images,
      this.idItem
    ).subscribe( response => {
      this.translate.get(response.message).subscribe( value => {
        this.presentToast(value);
        }
    );
      this.updateButtonIsEnable = true;
    },
    error => {
      // console.log('error ', error);
    });
  }

  onSubmitHumanitary(){

    this.updateButtonIsEnable = false;
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
        // console.log(' sell ', response);
        this.presentToast(response.message);
        this.updateButtonIsEnable = true;
    },
    error => {
      // console.log('error ', error);
      this.updateButtonIsEnable = true;
    });

  }

  async addPhoto(source: string) {

    if (source === 'library') {

      const libraryImage = await this.openLibrary();
      this.images.push ('data:image/jpg;base64,' + libraryImage);
      // console.log(' library ', libraryImage);
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

   this.title = this.itemForm.value.type.typeName;
   this.currentColor = this.itemForm.value.type.color;
}

async presentToast(messageError) {

  const toast = await this.toatsController.create({
      header: ' ',
      message: messageError,

      duration: 2000,
      });
  toast.present();
  }
}
