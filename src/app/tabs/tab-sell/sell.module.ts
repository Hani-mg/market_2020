import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellPage } from './sell.page';
import { IonicSelectableModule } from 'ionic-selectable';

import { TranslateModule } from '@ngx-translate/core';

import {ReactiveFormsModule} from '@angular/forms';

import { ComponentsModule } from '../../components/components.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SellPage }]),
    TranslateModule.forChild(),
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [SellPage],
})
export class SellPageModule {}
