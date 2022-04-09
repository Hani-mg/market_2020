import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HumanitaryActionPage } from './humanitary-action.page';

const routes: Routes = [
  {
    path: '',
    component: HumanitaryActionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HumanitaryActionPageRoutingModule {}
