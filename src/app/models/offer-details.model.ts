
import { UtilDate} from '../core/util/util-date.module';
import {Category} from './category.model';
export class OfferDetails {
    idProduct: number;
    productName: string;
    imgUrlList: any = [];
    description: string;
    price: 150;
    like : boolean;
    date: Date;
    favNumber: number;

    category: Category;

    idTown: 1;
    townName: string;
    idType: string;

    type: string;

    duration: number;
    durationUnit: string;

    author = {
        idUser : '',
        displayPhoneNumber: '',
        phoneNumber : '',
        username : '',
        offerNumber : ''
      };


    
    constructor(offerObject){
      this.idProduct = offerObject.offer.idProduct;
      this.productName = offerObject.offer.productName;
      this.imgUrlList = offerObject.offer.imgUrlList;
      this.description = offerObject.offer.description;
      this.price = offerObject.offer.price;
      this.date = UtilDate.convertStringToDate( offerObject.offer.date);
      this.favNumber = offerObject.favNumber;
      
      this.category = new Category(offerObject.categorie.idCategory, offerObject.categorie.categoryName);
      this.idTown = offerObject.town.idTown;
      this.townName = offerObject.town.townName;
      this.idType = offerObject.type.idType;

      this.author = {
        idUser : offerObject.owner.idUser,
        phoneNumber : offerObject.phoneNumber,
        username : offerObject.owner.username,
        offerNumber : offerObject.owner.offerNumber,
        displayPhoneNumber : offerObject.owner.displayPhoneNumber
      };
      const difference = UtilDate.CalculateDurationFromNow(this.date, Date.now());
      this.duration = difference.difference;
      this.durationUnit = difference.measureUnit;
  }

  getOffer(){
      return {
        idProduct: this.idProduct,
        productName: this.productName,
        imgUrlList: this.imgUrlList,
        description: this.description,
        price: this.price,
        date: this.date,
        favNumber: this.favNumber,
        durationUnit: this.durationUnit,
        duration: this.duration
      };
  }

  getCategory(){
      return this.category;
  }
  getTowns(){
      return {
          idTown: this.idTown,
          townName : this.townName
      };
  }
  getAuthor(){
      return this.author;
  }
}