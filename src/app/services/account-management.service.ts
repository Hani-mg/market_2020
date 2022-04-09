
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiServiceConf } from '../services/api-service-conf';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountManagementService extends ApiServiceConf {

  constructor(private httpClient: HttpClient) { 
    super();
  }

  signIn(email, password) : Observable<any>{
    const url = this.serverUrlOnline + 'connexion';
    let postData = {
          "username":email,
          "password":password
      }
    console.log('url ',url, postData);
    return this.httpClient.post<any>(url, postData);
   
  }

  signUp(lastName, firstName, email, password, confirmedPassword, username  ): Observable<any>{
    const url = this.serverUrlOnline + 'creer/utilisateur';

    let postData = {
      "nom":lastName,
      "prenom":firstName,
      "email":email,
      "motdepass":password,
      "motdepassConf":confirmedPassword,
      "identifiant": username,
      "role":"seller"
    }
    return this.httpClient.post<any>(url, postData);
  }

  forgotPassword(email){
    const url = this.serverUrlOnline + 'motdepass/oublier';
    const postData = {
      "email": email
    };
    return this.httpClient.post<any>(url, postData);

  }
  

  defineNewPassword(code, email, newPassword, confirmNewPassord){
    const url = this.serverUrlOnline + 'motdepass/modifier';
    let postData = {
      "code":code,
      "email":email,
      "newPassConf":confirmNewPassord,
      "newPass": newPassword
    }
    console.log('url change password ',url, postData);
    return this.httpClient.post<any>(url, postData);
  }

  changePassword(idUser, currentPassword, newPassword, confirmNewPassord){
    const url = this.serverUrlOnline + 'modifier/moncompte';
    let postData = {
      "idUser":idUser,
      "oldPass":currentPassword,
      "newPass": newPassword,
      "newPassConf": confirmNewPassord
    }
    console.log('url change password ',url, postData);
    return this.httpClient.post<any>(url, postData);
  }

  editInformation(idUser, username, lastName, firstName, email, phoneCountry, phone, img  ){
    const url = this.serverUrlOnline + 'modifier/moncompte';
    let postData = {
      "idUser":idUser,
      "identifiant": username,
      "nom":lastName,
      "prenom":firstName,
      "email":email,
      "phoneC": phoneCountry,
      "phone": phone,
      "image64": img
    }
    console.log('url edit usr information ',url, postData);
    return this.httpClient.post<any>(url, postData);
  }

  getLastMessage(idUser){
    const url = this.serverUrlOnline + 'mes/messages/avec/' + idUser;
    console.log('url ',url);
    return this.httpClient.get<any>(url);
  }

  getMessages(idUser, idAnotherUser){
    const url = this.serverUrlOnline + 'messages/' + idUser + '/' + idAnotherUser;
    console.log('url ', url);
    return this.httpClient.get<any>(url);
  }

  sendMessage(idUser, idAnotherUser, message){
    const url = this.serverUrlOnline + 'envoyer/message';
    let postData = {
      "receiver_id":idAnotherUser,
      "sender_id":idUser,
      "message": message
    }
    console.log(" post param ",postData);
    return this.httpClient.post<any>(url, postData);
  }
  

  

}
