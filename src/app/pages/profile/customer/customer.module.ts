import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerPage } from './customer.page';
import { ComponentsModule } from '../../../components/components.module';

import { TranslateModule } from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';

const routes: Routes = [
  {
    path: '',
    component: CustomerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [CustomerPage]
})
export class CustomerPageModule {}
