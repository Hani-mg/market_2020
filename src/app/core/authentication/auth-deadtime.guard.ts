import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import {AuthenticationService} from '../../core/authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthDeadTimeGaurd implements CanActivate {
  constructor(
    private router : Router,
    public authenticationService: AuthenticationService
      ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let date: Date = new Date("2021-03-16");  
        let today: Date = new Date();
        if( date.getTime() < today.getTime()){
            return false;
        } else{
            return true;
        }
  }
  
}