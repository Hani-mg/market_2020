export class User {
    idUser: number;
    email: string;
    username: string;
    lastname: string;
    firstname: string;
    profilUrlImg: string;
    phoneNumber: string;
    wishlist: number[] = [];
    token: string;

    constructor(userObject){
        this.idUser = userObject.idUser;
        this.email = userObject.email;
        this.username = userObject.username;
        this.lastname = userObject.lastname;
        this.firstname = userObject.firstname;
        this.profilUrlImg = userObject.profilUrlImg;
        this.phoneNumber = userObject.phoneNumber;
        this.wishlist = userObject.wishlist;
        this.token = userObject.token;
    }

    displayPhonenUmber: boolean;

    // add item to wishlist
    public addToWishList(itemId) {
        this.wishlist.push(itemId); 
    }
  
    // remove item to wishlist
    public removeToWishList(itemId) {
      this.wishlist.splice( this.wishlist.indexOf(itemId), 1 );
    }
}