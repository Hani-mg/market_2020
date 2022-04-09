import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';

import {ReactiveFormsModule} from '@angular/forms';

import { ChangepasswordModalPage } from '../changepassword-modal/changepassword-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [SignInPage, ChangepasswordModalPage],
  entryComponents: [ChangepasswordModalPage]
})
export class SignInPageModule {}
