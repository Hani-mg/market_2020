
import { UtilDate} from '../core/util/util-date.module';
export class Message {

    idUser: number;
    userName: string;
    lastMessage: string;
    date: Date;


    duration: number;
    durationUnit: string;
    
    constructor(message) {
      this.date = UtilDate.convertStringToDate( message.date);
      const difference = UtilDate.CalculateDurationFromNow(this.date, Date.now());
      this.duration = difference.difference;
      this.durationUnit = difference.measureUnit;
      
      this.idUser = message.idUser;
      this.userName = message.userName;
      this.lastMessage = message.lastMessage;
    }
}