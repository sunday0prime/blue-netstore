import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems:any;
  public grandTotal:number = 0;
  constructor(private cart:CartService) { }

  cartItemList:any[] = [];
  ngOnInit(): void {
    this.cart.getProducts()
    .subscribe( res => {
      this.cartItemList = res;
      this.grandTotal = this.cart.getTotalPrice();
    })
  }

  emptyCart() {
    this.cart.emptyCart()
  }

  decreaseQuantity(product:any) {
    --product.quantity;
    if (product.quantity==0) this.cart.getProducts()
      .subscribe( res => {
        this.cartItemList = res;
        this.grandTotal = this.cart.getTotalPrice();
      })
  }
  increaseQuantity(product:any){
    ++product.quantity;
  }

}
