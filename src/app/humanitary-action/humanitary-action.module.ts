import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HumanitaryActionPageRoutingModule } from './humanitary-action-routing.module';

import { HumanitaryActionPage } from './humanitary-action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HumanitaryActionPageRoutingModule
  ],
  declarations: [HumanitaryActionPage]
})
export class HumanitaryActionPageModule {}
