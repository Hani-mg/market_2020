import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { TranslateModule } from '@ngx-translate/core';
import { SearchCitiesAutocompleteComponent} from '../components/search-cities-autocomplete/search-cities-autocomplete.component';

// import { OffertypePopoverComponent} from '../components/offertype-popover/offertype-popover.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [TabsPage,/*, OffertypePopoverComponent*/],
  // entryComponents: [SearchCitiesAutocompleteComponent]
})
export class TabsPageModule {}
