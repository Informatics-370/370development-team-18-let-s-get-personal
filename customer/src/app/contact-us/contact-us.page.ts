import { Component, EnvironmentInjector, inject, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, NgForm, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContactUs } from '../Models/contactus';
import { ContactUsService } from 'src/app/Services/contactus.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ContactUsPage implements OnInit {
  isModalOpen = false;

  constructor(private router:Router, private alertController:AlertController, private service: ContactUsService) { }

  ngOnInit() {

  }

  ContactForm: FormGroup = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Message: new FormControl('', [Validators.required]),
    Email: new FormControl('', Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    Cell_Number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('[- +()0-9]{9,}')]))
  })

  // get f() { return this.ContactForm.controls }

  Submit() {
    let contact = new ContactUs()
    contact.contact_Us_Email = this.ContactForm.value.Email
    contact.contact_Us_Name = this.ContactForm.value.Name
    contact.contact_Us_Phone = this.ContactForm.value.Cell_Number
    contact.contact_Us_Message = this.ContactForm.value.Message

    this.service.AddMessageRequest(contact).subscribe(result => {
      this.SuccessAlert()      
    },(error) => {
      this.ErrorAlert();        
      console.error('contact us error:', error);
    })
  }

  async ContactUsTip() {
    const alert = await this.alertController.create({
      header: 'How to use:',
      subHeader: 'Enter your details at the provided spaces and click the "Send Comment" button.',
      message:'We will send an email to reply to your message within 4 working days. If you do not get a reply within 4 days please email us at itspersonal@gmail.com',
      buttons: [{
        text: 'OK',
        role: 'cancel',
      }],
    });
    await alert.present();
  }

  async SuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success!',
      subHeader: " We have received you're message" ,
      message:'',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }
      ],
    });
    await alert.present();
  }

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'We are sorry!',
      subHeader: " We have not received you're message" ,
      message:'Please try again or contact via email at: itspersonal@gmail.com',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.reloadPage();
        }
      }
      ],
    });
    await alert.present();
  }

  reloadPage() {
    window.location.reload()
  }
}
