import { Component, OnInit } from '@angular/core';
import {NavParams} from '@ionic/angular';

@Component({
  selector: 'app-sorting-list',
  templateUrl: './sorting-list.component.html',
  styleUrls: ['./sorting-list.component.scss'],
})
export class SortingListComponent implements OnInit {

  constructor(public navParams: NavParams) { }

  ngOnInit() {}

  sortByMostRecent(){
    this.navParams.data.homeref.sortByMostRecent();
  }

  sortByOldest(){
    this.navParams.data.homeref.sortByOldest();
  }

  sortByPriceDescending(){
    this.navParams.data.homeref.sortByPriceDescending();
  }

  SortNyPriceAscending(){
    this.navParams.data.homeref.SortNyPriceAscending();
  }
  
}
