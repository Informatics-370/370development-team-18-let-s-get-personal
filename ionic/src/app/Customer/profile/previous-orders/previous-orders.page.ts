import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router ,ActivatedRoute} from '@angular/router';
import { Order } from 'src/app/Models/orders';


@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.page.html',
  styleUrls: ['./previous-orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
 // providers: [ProductRatingDataService]
})
export class PreviousOrdersPage implements OnInit {
  orders: Order[] =[];
  stocktype: any
  constructor(public environmentInjector: EnvironmentInjector, private router: Router) { }

  ngOnInit() {
  }
  ratings()
  {
    this.router.navigate(['./product-rating']);
  }
}
