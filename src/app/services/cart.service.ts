import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList:any[]=[];
  public productList = new BehaviorSubject<any>([]);
  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProducts(product:any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product:any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice() :number {
    let sum:number=0;
    this.cartItemList.forEach((item) => {
      sum += item.total;
    })
    return sum;
  }

  removeCartItem(product:any) {
    this.cartItemList = this.cartItemList.filter(item => {
      return item.id!==product.id;
    })
    this.productList.next(this.cartItemList)
  }

  emptyCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
