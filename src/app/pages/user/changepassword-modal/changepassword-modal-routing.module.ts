import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangepasswordModalPage } from './changepassword-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChangepasswordModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangepasswordModalPageRoutingModule {}
