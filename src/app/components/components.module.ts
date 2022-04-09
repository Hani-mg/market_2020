import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { SearchCitiesAutocompleteComponent} from './search-cities-autocomplete/search-cities-autocomplete.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule.forChild()
  ],
    declarations: [ProductListComponent, SearchCitiesAutocompleteComponent],
    exports: [ProductListComponent, SearchCitiesAutocompleteComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })

export class ComponentsModule {}
