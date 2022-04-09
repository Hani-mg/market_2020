import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {AuthGuard} from './core/authentication/auth.guard';
import {AuthDeadTimeGaurd} from './core/authentication/auth-deadtime.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  { path: 'product/:id', canActivate: [AuthDeadTimeGaurd],loadChildren: './pages/product/product.module#ProductPageModule' },
  { path: 'message/:id/:username',   canActivate: [AuthGuard], loadChildren: './pages/inbox/message/message.module#MessagePageModule' },
  { path: 'new-message', canActivate: [AuthDeadTimeGaurd], loadChildren: './pages/inbox/new-message/new-message.module#NewMessagePageModule' },
  { path: 'wishlist',  canActivate: [AuthGuard], loadChildren: './pages/profile/wishlist/wishlist.module#WishlistPageModule' },
  { path: 'personalisation', canActivate: [AuthDeadTimeGaurd], loadChildren: './pages/profile/personalisation/personalisation.module#PersonalisationPageModule' },
  { path: 'customer/:id', canActivate: [AuthGuard], loadChildren: './pages/profile/customer/customer.module#CustomerPageModule' },
  { path: 'order', canActivate: [AuthGuard], loadChildren: './pages/profile/order/order.module#OrderPageModule' },
  { path: 'listing/:filter/:id', canActivate: [AuthDeadTimeGaurd], loadChildren: './pages/search/listing/listing.module#ListingPageModule' },
  {
    path: 'sign-in', canActivate: [AuthDeadTimeGaurd],
    
    loadChildren: () => import('./pages/user/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up', canActivate: [AuthDeadTimeGaurd],
    loadChildren: () => import('./pages/user/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'edit-offer/:idItem', canActivate: [AuthDeadTimeGaurd],
    loadChildren: () => import('./pages/profile/edit-offer/edit-offer.module').then( m => m.EditOfferPageModule)
  },
  {
    path: 'changepassword-modal', canActivate: [AuthDeadTimeGaurd],
    loadChildren: () => import('./pages/user/changepassword-modal/changepassword-modal.module').then( m => m.ChangepasswordModalPageModule)
  },
  {
    path: 'humanitary-action',
    loadChildren: () => import('./humanitary-action/humanitary-action.module').then( m => m.HumanitaryActionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
