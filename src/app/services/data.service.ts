import { Injectable } from '@angular/core';
declare var require: any;
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private profiles: any;
  private profile: any;
  private products: any;
  private categories: any;
  private brands: any;
  private conditions: any;

  constructor() {
    // Import all JSON data
    this.profiles = require('../datas/user.json');
    this.products = require('../datas/product.json');
    this.categories = require('../datas/category.json');
    this.brands = require('../datas/brand.json');
    this.conditions = require('../datas/condition.json');


    // get default profile
    this.profiles.forEach(user => {
      // set current user
      if (user.id === 1) {
        this.profile = user;
      }
    });

  }

  // get list of products by category id
  getCategoryList(id) {
    const itemList: string[] = [];
    this.products.forEach(item => {
      if (item.category_id === id) {
        itemList.push(item);
      }
    });

    return itemList;

  }

  // get the list of categories
  getCategories() {
    return this.categories;
  }

  // get the list of subcategories by category
  getSubCategories() {
    const subcat = [];

    this.categories.forEach(category => {
      category.child.forEach(sub => {
        sub.parent = category;
        subcat.push(sub);
      });
    });
    return subcat;
  }

  // get list of brand
  getBrands() {
    return this.brands;
  }

  // get list of conditions
  getConditions() {
    return this.conditions;
  }

  // get Current profile, byy default id = 1
  getProfile() {
    return this.profile;
  }

  // get user data by id user
  getSingleUser(id) {
    let SingleUser;

    this.profiles.forEach(item => {
      if (item.id === id) {
        SingleUser = item;
      }
    });

    return SingleUser;
  }

    // product data by id product
    getSingleProduct(id) {
      let singleProduct;
      this.products.forEach(item => {
        if (item.id === id) {
          singleProduct = item;
        }
      });
      return singleProduct;
    }

  // get list of product
  getProducts() {
    // in random mode
    this.products = this.shuffleArray(this.products); // comment this line if you dont want the random mode
    return this.products;
  }

  // get wishlist of the current user
  getWishList() {
    const wishlist = [];
    this.profile.wishlist.forEach(element => {
      wishlist.push(this.getSingleProduct(element));
    });

    return wishlist;
  }

  // add item to wishlist
  addToWishList(itemId) {
      this.profile.wishlist.push(itemId);
  }

  // remove item to wishlist
  removeToWishList(itemId) {
    this.profile.wishlist.splice( this.profile.wishlist.indexOf(itemId), 1 );
  }

  // get member items
  getMemberItems(userId) {
    const memberItems: string[] = [];
    this.products.forEach(item => {
      // set memeber's items
      if (item.user_id === userId) {
        memberItems.push(item);
      }

   });
    return memberItems;
  }

  // crosselling
  getSimilarItems(categoryId, productId) {

    const similarItems: string[] = [];
    this.products.forEach(item => {
      // set similar items
      if (item.category_id === categoryId) {
        if (item.id !== productId) {
          similarItems.push(item);
        }
    }
  });
    return similarItems;
  }


// shuffle array
  shuffleArray(array) {
    let m = array.length, t, i;
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

}
