import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOfferPageRoutingModule } from './edit-offer-routing.module';

import { EditOfferPage } from './edit-offer.page';
import { IonicSelectableModule } from 'ionic-selectable';

import { TranslateModule } from '@ngx-translate/core';

import {ReactiveFormsModule} from '@angular/forms';
import { ComponentsModule} from '../../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EditOfferPageRoutingModule,
    TranslateModule.forChild(),
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [EditOfferPage],
  // entryComponents : [SearchCitiesAutocompleteComponent ]
})
export class EditOfferPageModule {}
