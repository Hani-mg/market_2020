
import { UtilDate} from '../core/util/util-date.module';
export class Offer {
    idProduct: number;
    productName: string;
    imgUrlList: any = [];
    idCategory: number;
    categoryName: string;
    price: 150;
    idTown: 1;
    townName: string;
    like : boolean;
    date: Date;
    favNumber: number;
    idType: number;
    isSold: boolean;

    duration: number;
    durationUnit: string;
    
    constructor(offerObject){
      this.date = UtilDate.convertStringToDate( offerObject.date);
      const difference = UtilDate.CalculateDurationFromNow(this.date, Date.now());
      this.duration = difference.difference;
      this.durationUnit = difference.measureUnit;
      
      this.idProduct = offerObject.idProduct;
      this.productName = offerObject.productName;
      this.imgUrlList = offerObject.imgUrlList;
      this.idCategory = offerObject.idCategory;
      this.categoryName = offerObject.categoryName;
      this.price = offerObject.price;
      this.idTown = offerObject.idTown;
      this.townName = offerObject.townName;
      this.favNumber = offerObject.favNumber;
      this.idType = offerObject.idType;
      this.isSold = offerObject.isSold;

      
  }

    
  }