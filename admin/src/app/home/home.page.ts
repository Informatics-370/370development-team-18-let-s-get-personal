import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class HomePage implements OnInit {
  subscribeTimer:any
  timeLeft!: number;
  interval:any;

  constructor() { }

  ngOnInit() {
    this.timeLeft = 5000
  }

  timerForm: FormGroup = new FormGroup({
    time: new FormControl('',[Validators.required])
  })

  observableTimer() {
    const source = timer(1000, this.timeLeft);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  handleChange(e: any) {
    console.log('ionChange fired with value: ' + e.detail.value);
    this.timeLeft = e.detail.value
    this.observableTimer()
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }


  // startTimer() {
  //   this.timeLeft = this.timerForm.value.time

  //   this.interval = setInterval(() => {
  //     if(this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.timeLeft = 60;
  //     }
  //   },1000)
  // }

  // pauseTimer() {
  //   clearInterval(this.interval);
  // }


  // <ion-item>
  //           <ion-label position="stacked">Stock Item Type</ion-label><br>
  //           <ion-select placeholder="Select a Stock Type" formControlName="Stock_Type_ID">
  //             <div slot="label">Stock Types <ion-text color="danger">(Required)</ion-text></div>
  //             <ion-select-option *ngFor="let types of stocktypes" value="{{types.stock_Type_ID}}" >
  //               {{types.stock_Type_Name}}
  //             </ion-select-option>
  //           </ion-select>
  //         </ion-item>
}
