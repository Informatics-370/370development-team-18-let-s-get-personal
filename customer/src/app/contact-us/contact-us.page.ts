import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContactUsPage implements OnInit {
  isModalOpen = false;

  constructor() { }

  ngOnInit() {
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
/*
  ContactForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    Cell_Number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('[- +()0-9]{9,}')]))
  })

  get f() { return this.ContactForm.controls }

  Submit() {}*/

}
