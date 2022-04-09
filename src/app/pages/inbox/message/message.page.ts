import {IonContent} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AccountManagementService } from 'src/app/services/account-management.service';
import { AuthenticationService} from '../../../core/authentication/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;

  id: number;
  user: any;
  username: string;
  messages: any;
  myId: any;
  messageWritten: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private dataService: DataService,
    private accountManagementService: AccountManagementService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

    
     this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
     this.username = this.activatedRoute.snapshot.paramMap.get('username');
     this.myId = this.authenticationService.user.idUser;
     this.getMessages();
  }

  getMessages(){
    this.accountManagementService.getMessages(this.myId, this.id).subscribe( response =>{
      this.messages = response.slice().reverse();
    },
    error =>{
      // console.log('error ',error);
    });
  }

  sendMessage(){
    this.accountManagementService.sendMessage(this.myId, this.id, this.messageWritten).subscribe( response =>{
      this.messages.push({
        idSender: this.myId,
        idReceiver: this.id,
        messagecontent: this.messageWritten,
        date: Date.now()
      });
      this.messageWritten = '';
    },
    error =>{
      // console.log('error ',error);
    });
  }

  updateScroll() {
    if (this.content.scrollToBottom) {
      this.content.scrollToBottom(0);
    }
}
ionViewDidEnter(){
  this.updateScroll();
}

}
