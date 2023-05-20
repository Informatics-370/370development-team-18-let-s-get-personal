import { Component, OnInit, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class InventoryPage implements OnInit {

  constructor(public environmentInjector: EnvironmentInjector, private router: Router) { }

  ngOnInit() {
  }

  stocktypes()
  {
    this.router.navigate(['./stocktypes']);
  }
  stockcoloursnav()
  {
    this.router.navigate(['./stockitemcolours']);
  }
}
