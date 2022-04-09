import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../components/components.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ListingPage } from './listing.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SortingListComponent} from '../../../components/sorting-list/sorting-list.component';

const routes: Routes = [
  {
    path: '',
    component: ListingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    IonicSelectableModule
  ],
  declarations: [ListingPage, SortingListComponent],
  entryComponents: [SortingListComponent]
})
export class ListingPageModule {}
