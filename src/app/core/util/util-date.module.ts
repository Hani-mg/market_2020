import * as moment from 'moment';
export class UtilDate {

    static convertStringToDate (dateString){
        const momentVariable = moment(dateString, 'YYYY-MM-DD h:mm:ss');  
        return momentVariable.toDate();
    }
    
    static CalculateDurationFromNow(previousDate,nextDate){
        let diff = this.secondsDiff(nextDate, previousDate);
        let unit = 'secondes';
        if ( diff >= 60){
            diff = Math.abs( Math.round( diff / 60) );
            unit='minutes';
        }
        if (diff >= 60 &&  unit==='minutes'){
            diff = Math.abs( Math.round( diff / 60) );
            unit = 'heures';
        }
        if( diff >= 24 && unit === 'heures'){
            diff = Math.abs( Math.round( diff / 24 ) );
            unit = 'jours';
        }
        if(diff >= 7 &&  unit === 'jours'){
            diff = Math.round( diff / 7 );
            unit = 'semaines';

        }
        if(diff >= 5 && unit === 'semaines'){
            diff = Math.round( this.monthsDiff( previousDate, nextDate));
            unit ='mois';
        }
        if( diff >= 12 && unit === 'mois'){
            diff = this.yearsDiff(previousDate, nextDate);
            unit ='ans';
        }
        return {difference:diff, measureUnit: unit};

    }

    static secondsDiff(d1, d2) {
        let millisecondDiff = d2 - d1;
        let secDiff = Math.abs( ( d2 - d1) / 1000 );
        return secDiff;
     }

    static minutesDiff(d1, d2) {
        let seconds = this.secondsDiff(d1, d2);
        let minutesDiff = Math.abs( seconds / 60 );
        return minutesDiff;
   }

    static hoursDiff(d1, d2) {
        let minutes = this.minutesDiff(d1, d2);
        let hoursDiff = Math.abs( minutes / 60 );
        return hoursDiff;
    }

    static daysDiff(d1, d2) {
        let hours = this.hoursDiff(d1, d2);
        let daysDiff = Math.abs( hours / 24 );
        return daysDiff;
     }

     static weeksDiff(d1, d2) {
        let days = this.daysDiff(d1, d2);
        let weeksDiff = Math.abs( days/ 7 );
        return weeksDiff;
     }

     static yearsDiff(d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        let yearsDiff =  date2.getFullYear() - date1.getFullYear();
        return yearsDiff;
    }
    static monthsDiff(d1, d2) {
        let date1 = new Date(d1);
        let date2 = new Date(d2);
        let years = this.yearsDiff(d1, d2);
        let months =(years * 12) + (date2.getMonth() - date1.getMonth()) ;
        return months;
      }
}