import { EventEmitter, Injectable } from '@angular/core';
import { StockItem } from 'src/app/Models/stockitem';
import { BasketItem } from 'src/app/Models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  public basketChange: EventEmitter<BasketItem[]> = new EventEmitter<BasketItem[]>();
  private basketItemList: BasketItem[];
  private storageKey: string = 'basket';

  constructor() {
    this.basketItemList = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  }

  public getCurrentBasket() {
    return this.basketItemList;
  }

  public addProductToBasket(stockItem: StockItem, newQuantity: number) {
    const basketItem = new BasketItem();
    basketItem.stockItem = stockItem;
    basketItem.quantity = newQuantity;

    const findIndex = this.basketItemList.findIndex((item: BasketItem) => {
      return item.stockItem.StockItemId == stockItem.StockItemId
    });

    if (findIndex >= 0) {
      this.basketItemList[findIndex].quantity = newQuantity;
    } else {
      this.basketItemList.push(basketItem);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.basketItemList));
    this.basketChange.emit(this.basketItemList);
  }

  public removeItemFromBasket(stockItem: StockItem) {
    const findIndex = this.basketItemList.findIndex((item: BasketItem) => {
      return item.stockItem.StockItemId == stockItem.StockItemId
    });

    if (findIndex >= 0 ) {
      this.basketItemList.splice(findIndex, 1);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.basketItemList));
    this.basketChange.emit(this.basketItemList);
  }

  public clearBasket() {
    this.basketItemList = [];
    localStorage.setItem(this.storageKey, JSON.stringify(this.basketItemList));
    this.basketChange.emit(this.basketItemList);
  }
}
