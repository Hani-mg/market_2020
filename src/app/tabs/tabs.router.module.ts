import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from '../core/authentication/auth.guard';
import {AuthDeadTimeGaurd} from '../core/authentication/auth-deadtime.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthDeadTimeGaurd],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'search',
        canActivate: [AuthDeadTimeGaurd],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'sell/:idType',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-sell/sell.module').then(m => m.SellPageModule)
          }
        ]
      },
      {
        path: 'inbox',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-inbox/inbox.module').then(m => m.InboxPageModule)
          }
        ]
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./tab-profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        canActivate: [AuthDeadTimeGaurd],
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
