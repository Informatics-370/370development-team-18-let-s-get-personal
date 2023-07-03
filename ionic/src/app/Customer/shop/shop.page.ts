import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Stock_Item } from 'src/app/Models/stockitem';
import { StockItemDataService } from 'src/app/Services/stockitem.service';
import { BasketService } from 'src/app/Services/basket.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { SharedDirectivesModule } from 'src/app/Directives/shared-directives.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedDirectivesModule]
})
export class ShopPage implements OnInit {
  public stockItemList: Stock_Item[] = [];
  public loading: boolean = true;
  private loadingModel: any;
  public quantity:any;
  quantities: Array<any> = [];
  basketList: Array<Stock_Item> = [];
  productIds: Array<any> = [];

  filterTerm: string = "";
  filteredItems:  Stock_Item[] = [];

  constructor( private loadingController: LoadingController,
    private stockItemService: StockItemDataService, private basketService: BasketService, 
    private authService: AuthenticationService, private alertController:AlertController) 
  { }

  async ngOnInit() {
    await this.showLoading();

    //get searched restaurants
    if(this.filterTerm==""){
      this.filteredItems = this.stockItemList;
    }    
  }

  GetProducts(){
    this.stockItemService.GetStockItems().subscribe(result =>{
      this.stockItemList = result as Stock_Item[];
    })
  }

  search(){
    //empty array
    this.filteredItems = [];

    //filter items
    this.filteredItems = this.stockItemList.filter((searchitem)=>
      searchitem.Stock_Item_Name.toLocaleLowerCase().includes(this.filterTerm.toLocaleLowerCase())//||
      //searchitem.Stock_Item_Price == Number(this.filterTerm)||
    );
   }

  logoutAddToCart() {
    this.authService.Logout();
  }

  addToBasket(product: Stock_Item){
    const basketProduct = {
      ...product,
      Quantity: parseInt((<HTMLInputElement>document.getElementById("quantity("+ product.Stock_Item_ID + ")")).value)   
    };

    //if(basketProduct.Quantity <= product.quantityOnHand){
      this.basketList = JSON.parse(localStorage.getItem('basket')!);
      if(this.basketList == null){
          this.basketList = [];
          this.basketList.push(basketProduct);
            
          localStorage.setItem('basket',JSON.stringify(this.basketList));
          
          this.productIds = [];
          this.productIds.push(basketProduct.Stock_Item_ID);
          localStorage.setItem('productIds', JSON.stringify(this.productIds));
          console.log(this.productIds)
          this.quantities = [];
          this.quantities.push(basketProduct.Quantity);
          localStorage.setItem('quantities', JSON.stringify(this.quantities));
          console.log(this.quantities)
          if(this.quantities == null){
            this.addToCartErrorAlert();
          }
          else{
            this.addToCartSuccessAlert();
          }
      }
      else{
        let oldQuantity = this.quantities;
        this.basketList.push(basketProduct);
        localStorage.setItem('basket',JSON.stringify(this.basketList));        
       
        this.productIds.push(basketProduct.Stock_Item_ID);
        localStorage.setItem('productIds', JSON.stringify(this.productIds));
        console.log(this.productIds)
          
        this.quantities.push(basketProduct.Quantity);
        localStorage.setItem('quantities', JSON.stringify(this.quantities));
        console.log(this.quantities)

        if(oldQuantity == this.quantities){
          this.addToCartErrorAlert();
        }
        else{
          this.addToCartSuccessAlert();
        }
      }
    console.log(this.basketList)
       
  }

  //async addToBasket(stockItem: Stock_Item) {

    //this.basketService.addProductToBasket(stockItem, newQuantity);
  //}

  async showLoading() {
    this.loadingModel = await this.loadingController.create({
      message: 'Loading Stock Items...',
    });
    await this.loadingModel.present();
  }

  async addToCartSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: 'Item Added To Best Seller List',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async addToCartErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: 'Item Was Not Added',
      message: 'Please try again',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
