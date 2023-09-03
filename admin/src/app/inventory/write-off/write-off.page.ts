import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventoryDataService } from 'src/app/Services/inventory.service';
import { WriteOffVM } from 'src/app/ViewModels/writeoffVM';
@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.page.html',
  styleUrls: ['./write-off.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class WriteOffPage implements OnInit {

  writeoffs: WriteOffVM[] = []
  constructor(public service: InventoryDataService) { }

  ngOnInit() 
  {
    this.GetWriteOffItems()
  }

  GetWriteOffItems(){
    this.service.GetWriteOffs().subscribe(result => {
      this.writeoffs = result as WriteOffVM[]
    })
  }

}
