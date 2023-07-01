import { EventEmitter, Injectable } from '@angular/core';
import { Stock_Item } from 'src/app/Models/stockitem';
import { BasketItem } from 'src/app/Models/basket';
import { map, Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  apiUrl = 'https://localhost:44390/api/'
  
    httpOptions ={
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    }

  static tmpCartName : string = "ls-cart-subscriptions";
  public basketChange: EventEmitter<BasketItem[]> = new EventEmitter<BasketItem[]>();
  private basketItemList: BasketItem[];
  cartProductsNumberDS = new Subject<number>();
  cartitems!: BasketItem;
  constructor(private httpClient: HttpClient) {
    this.basketItemList = JSON.parse(localStorage.getItem('basket')!);
  }

  checkcartitems(){
    //checking if no cartitems exists
    if(this.cartitems == null){
      this.cartitems = new BasketItem();
    }
  }

  public getCurrentBasket() {
    return this.basketItemList;
  }

  public GetCustomer(Customer_ID:Number){ 
    return this.httpClient.get(`${this.apiUrl}Basket/GetBasketInfo/${Customer_ID}`)
    .pipe(map(result => result))
  }

  public addProductToAPI(basket: BasketItem){
    return this.httpClient.post(`${this.apiUrl}Basket/AddBasketInfo`, basket)
      .pipe(map(result => result))
  }

  public addProductToBasket(stockItem: Stock_Item, newQuantity: number) {
    const basketItem = new BasketItem();
    basketItem.stockItem = stockItem;
    basketItem.quantity = newQuantity;

    const findIndex = this.basketItemList.findIndex((item: BasketItem) => {
      return item.stockItem.Stock_Item_ID == stockItem.Stock_Item_ID
    });

    if (findIndex >= 0) {
      this.basketItemList[findIndex].quantity = newQuantity;
    } else {
      this.basketItemList.push(basketItem);
    }
    localStorage.setItem('basket', JSON.stringify(this.basketItemList));
    this.basketChange.next(this.basketItemList);

    this.notifyOnNewItemInCart();
  }

  public removeItemFromBasket(stockItem: Stock_Item) {
    let storedCartString = localStorage.getItem(BasketService.tmpCartName)
    
        let cartitems= [];
        if (storedCartString) {
          cartitems = JSON.parse(storedCartString)
        }
        for (var idx = 0; idx < cartitems.length; idx++) {
            if (cartitems[idx].id == stockItem.Stock_Item_ID) {
              cartitems.splice(idx, 1);
                break;
            }
        }

        localStorage.setItem(BasketService.tmpCartName, JSON.stringify(cartitems))

    this.notifyOnNewItemInCart();
  }

  getNumberOfItemsInCart() : number {
    return this.basketItemList.length
  }

  notifyOnNewItemInCart() {
    this.cartProductsNumberDS.next(this.getNumberOfItemsInCart());
  }
  
  public clearBasket() {
    localStorage.removeItem(BasketItem.name);
    this.notifyOnNewItemInCart();
  }
}
