import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ChangepasswordPage implements OnInit {

  data = {currPassword: '', newPassword: '', confirmPassword: ''};
  //form: NgForm;
  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  UpdatePassword(form: NgForm) {
    
  }

}
