
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

import {FilterService} from '../../services/filter.service';
import {OfferService} from '../../services/offer.service';
import { Router } from '@angular/router';

declare var require: any;
@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;

  segment = 0; // default index
  categories: any;
  towns: any;
  types: any;
  myInput: any;
  constructor( 
     private filterService: FilterService,
     private  offerService: OfferService,
     private router: Router) {}

  ngOnInit() {
    this.categories = this.filterService.getCategoriesGroupByParent();
    this.towns = this.filterService.getTownsGroupByParent();
    this.types = this.filterService.getTypes();
  }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  onEnter(){
    this.router.navigate(['/listing', 'keyword', this.myInput]);
    
  }
 
}
