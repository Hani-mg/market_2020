import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangepasswordModalPageRoutingModule } from './changepassword-modal-routing.module';

// import { ChangepasswordModalPage } from './changepassword-modal.page';

import {ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangepasswordModalPageRoutingModule,
    TranslateModule.forChild()
  ],
  // declarations: [ChangepasswordModalPage]
})
export class ChangepasswordModalPageModule {}
