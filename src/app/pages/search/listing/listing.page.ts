import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import {PopoverController} from '@ionic/angular';
import { FilterService} from '../../../services/filter.service';
import { SortingListComponent} from '../../../components/sorting-list/sorting-list.component';
import { IonSelect, IonButton } from '@ionic/angular';
import { OfferService} from '../../../services/offer.service';
import { Offer } from 'src/app/models/offer-model';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {

  @ViewChild('typeList', { static: false }) selectTypeRef: IonSelect; 
  @ViewChild('categoryList', { static: false }) selectCategoryRef: IonSelect; 
  @ViewChild('townList', { static: false }) selectTownRef: IonSelect; 

  products: any = [];
  id: any;
  filter: string;
  categories: any;
  towns: any;
  types: any;
  categorySelected: any;
  townSelected: any;
  typeSelected: any;
  myInputSearch: any;

  constructor(
    private dataService: DataService, 
    private activatedRoute: ActivatedRoute,
    private popover: PopoverController,
    private filterService: FilterService,
    private offerService: OfferService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.filter = this.activatedRoute.snapshot.paramMap.get('filter');
    this.types = this.filterService.getTypes();
    this.categories = this.filterService.getCatgories();
    this.towns =  this.filterService.getTowns();
    if (this.id !== 0) {
      this.getDefaultSelectedFilter();
    }
  }

 

  getDefaultSelectedFilter(){
   
    if (this.filter  == 'category') {
      this.categorySelected = this.categories.find( x => x.term_id == this.id);
      this.search('', '', this.id, '');
    } else if ( this.filter === 'town') {
      this.townSelected = this.towns.find( x => x.term_id == this.id);
      this.search('', this.id, '', '');
    } else if ( this.filter == 'type') {
      this.typeSelected = this.types.find( x => x.idType == this.id);
      this.search('', '', '', this.id);
    } else if( this.filter == 'keyword') {
      this.search(this.id, '', '', '');
    }
   }



  search(keyword, idTown, idCategory, idType) {
    this.offerService.Search(keyword, idTown, idCategory, idType).subscribe( response => {
      this.products = [];
      response.forEach(element => {
        this.products.push(new Offer( element));
      });
    },
    error => {
      // console.log('error ', error);
    });
  }

  openTypeSelection() {
    this.selectTypeRef.open();
  }
  openTownSelection() {
    this.selectTownRef.open();
  }
  openCategorySelection() {
    this.selectCategoryRef.open();
  }
  categoryChange($event) {
    this.searchMulticriteria();
   }
  
   townChange($event) {
    this.searchMulticriteria();
   }
   typeChange($event) {
    this.searchMulticriteria();
  }
  onSearchFieldEnter(){
    this.searchMulticriteria();
  }

  searchMulticriteria() {
    //set filter 
     let filter = {
       keyword: '',
       category: '',
       town: '',
       type: ''
     };
     if ( this.myInputSearch) {
       filter.keyword = this.myInputSearch;
     }
     if ( this.categorySelected) {
       filter.category = this.categorySelected.term_id;
     }
     if (this.townSelected) {
       filter.town = this.townSelected.term_id;
     }
     if (this.typeSelected) {
       filter.type = this.typeSelected.idType;
     }
     this.search (filter.keyword, filter.town, filter.category, filter.type);
  }

  deleteCategoryFilter(){
    this.categorySelected = undefined;
    this.searchMulticriteria();
  }
  deleteTownFilter(){
    this.townSelected = undefined;
    this.searchMulticriteria();
  }
  deleteTypeFilter(){
    this.typeSelected = undefined;
    this.searchMulticriteria();
  }
  
  CreatePopover() {
     this.popover.create({component: SortingListComponent, componentProps: {homeref: this},
     showBackdrop: true}).then((popoverElement) => {
       popoverElement.present();
     });
   }

   sortByMostRecent() {
    this.products.sort( ( a, b ) => {
      if ( b.date < a.date ) {
        return -1;
      }
      if ( b.date > a.date ) {
        return 1;
      }
      return 0;
    });
    this.popover.dismiss();
  }

  sortByOldest() {
    this.products.sort( ( a, b ) => {
      if ( a.date < b.date ) {
        return -1;
      }
      if ( a.date > b.date ) {
        return 1;
      }
      return 0;
    });
    this.popover.dismiss();
  }

  sortByPriceDescending() {
    this.products.sort((a, b) => {
      return b.price - a.price;
    });
    this.popover.dismiss();
  }

  SortNyPriceAscending() {
    this.products.sort((a, b) => {
      return a.price - b.price;
    });
    this.popover.dismiss();
  }
}
