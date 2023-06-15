import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-process-refund',
  templateUrl: './process-refund.page.html',
  styleUrls: ['./process-refund.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProcessRefundPage implements OnInit {

  constructor() { }

  ngOnInit():void {

  }
  
  processRefund(){
    
  }

}
