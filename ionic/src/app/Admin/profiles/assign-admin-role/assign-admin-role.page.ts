import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ProfileService } from 'src/app/Services/profile.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-assign-admin-role',
  templateUrl: './assign-admin-role.page.html',
  styleUrls: ['./assign-admin-role.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AssignAdminRolePage implements OnInit{
  selectedRole!: string;
  public user!: User;

  constructor(private alertController: AlertController,
    private profileService: ProfileService) { }

  ngOnInit() {
    let user = localStorage.getItem('user');
  }

  public updateUserRole() {
    if(this.user.User_Role == "Admin")
    {
        this.presentAlert(`User ${this.user.Username} is already an admin`);
    }
    else
    {
      this.profileService.AssignAsAdmin(this.user).subscribe((res:any) => {
        this.presentAlert(`User ${this.user.Username} is now an admin`);
      });
    }
  }


async presentAlert(message: string) {
  const alert = await this.alertController.create({
    header: 'Update User Role',
    message: message,
    buttons: ['OK'],
  });
  await alert.present();
}

}
