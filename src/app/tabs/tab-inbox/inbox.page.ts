import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AccountManagementService} from '../../services/account-management.service';
import { AuthenticationService} from '../../core/authentication/authentication.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-inbox',
  templateUrl: 'inbox.page.html',
  styleUrls: ['inbox.page.scss']
})
export class InboxPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;

  segment = 0;
  lastMessages: any;
  constructor(
    private accountManagementService: AccountManagementService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(){
    this.loadLastMessages();
  }
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  loadLastMessages() {
    this.accountManagementService.getLastMessage(this.authenticationService.user.idUser).subscribe( response =>{
      this.lastMessages = [];
      response.forEach(element => {
        this.lastMessages.push(new Message( element));
      });
    },
    error => {
      // console.log('error ', error);
    });
  }
}


