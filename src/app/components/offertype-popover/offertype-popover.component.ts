import { Component, OnInit } from '@angular/core';

import {PopoverController} from '@ionic/angular';
import {FilterService} from '../../services/filter.service';

@Component({
  selector: 'app-offertype-popover',
  templateUrl: './offertype-popover.component.html',
  styleUrls: ['./offertype-popover.component.scss'],
})
export class OffertypePopoverComponent implements OnInit {

  types: any;
  constructor(private popover : PopoverController, private filterService: FilterService) { }

  ngOnInit() {
    this.types = this.filterService.getTypes();
  }

  ClosePopover()
   {
     this.popover.dismiss();
   }

}
