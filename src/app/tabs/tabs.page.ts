import { Component } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { OffertypePopoverComponent} from '../components/offertype-popover/offertype-popover.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private popover:PopoverController) {}

  CreatePopover()
   {
     this.popover.create({component:OffertypePopoverComponent,
     showBackdrop:true}).then((popoverElement)=>{
       popoverElement.present();
     });
   }

}
