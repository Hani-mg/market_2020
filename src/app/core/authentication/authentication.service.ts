import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject, throwError } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { User } from '../../models/user';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
     constructor(
       private storage: Storage, 
       private router: Router,
       private platform: Platform) {
        this.platform.ready().then(() => {
          this.setUserData();
        });
     }
      private _user : User;
      authState = new BehaviorSubject(false);

      public get user() {
        return this._user;
      }

      public set user(theUser: User) {
        this._user= theUser;
      }
      
      async setUserData() {
       await this.storage.get('USER_INFO').then((response) => {
            if (response) {
              this.user = new User(response);
              this.authState.next(true);
            }
        });
    };

    getToken(){
      if(this.user){
        return    this.user.token;
      }
      return  ' ' ;
    }
    getAuthorizationToken(){
        if(this.user){
            return   'Bearer ' + this.user.token;
        }
        return  'Bearer ' ;
    }
    startSession(data) {
        this.storage.set('USER_INFO', data);
        this.user= new User(data);
        this.authState.next(true);
        this.setUserData();
    }

   
    logOut() {
    this.storage.remove('USER_INFO').then(() => {
        this.user = undefined;
        this.authState.next(false);
        this.router.navigate(['/']);
    });
    }
    isAuthenticated() {
      return this.authState.value;
    }
}