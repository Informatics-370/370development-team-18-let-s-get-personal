import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';
import { Title } from '@angular/platform-browser';
import { Gender } from 'src/app/Models/gender';
import { AddressService } from 'src/app/Services/address.service';
import { Customer } from 'src/app/Models/customer';
import { Province } from 'src/app/Models/province';
import { City } from 'src/app/Models/city';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class CreateProfilePage {

  titles!: string[];
  selectedTitle!: string;
  titlename = this.selectedTitle;
  genders!: string[];
  selectedGender!: string;
  gendername = this.selectedGender;
  // provinces!: string[];
  selectedProvince!: string;
  provincename = this.selectedProvince;
  cities!: string[];
  selectedCity!: string;
  cityname = this.selectedCity;
  street!: string;
  number!: number;
  unitNumber!: number;
  dwellingType!: string;
  areaCode!: number;
  FirstName!: string;
  surname!: string;
  cellNumber!: string;
  email!: string;
  profiletitle!: string;
  profilegender!: string;
  profileprovince!: string;
  profilecity!: string;
  
  provinces: string[] = ['Gauteng', 
  'Western Cape', 
  'KwaZulu-Natal', 
  'Eastern Cape', 
  'Free State', 
  'Limpopo', 
  'Mpumalanga', 
  'Northern Cape', 
  'North West'];

  gautentCities: string[] = ['Johannesburg', 'Pretoria', 'Centurion', 'Midrand'];
  westernCapeCities: string[] = ['Cape Town', 'Stellenbosch', 'Paarl', 'Somerset West'];
  kwaZuluNatalCities: string[] = ['Durban', 'Pietermaritzburg', 'Richards Bay', 'Newcastle'];
  easternCapeCities: string[] = ['Port Elizabeth', 'East London', 'Grahamstown', 'Mthatha'];
  freeStateCities: string[] = ['Bloemfontein', 'Welkom', 'Parys', 'Bethlehem'];
  limpopoCities: string[] = ['Polokwane', 'Tzaneen', 'Thohoyandou', 'Mokopane'];
  mpumalangaCities: string[] = ['Nelspruit', 'Witbank', 'Middelburg', 'Secunda'];
  northernCapeCities: string[] = ['Kimberley', 'Upington', 'Springbok', 'Kuruman'];
  northWestCities: string[] = ['Rustenburg', 'Potchefstroom', 'Klerksdorp', 'Mafikeng'];

  constructor(private profileService:ProfileService,
    private addressService: AddressService) { }

  public getTitles() {
    this.addressService.GetAllTitles().subscribe((res:any) => {
      this.titles = res;
    });
  }

  public getTitleByName(titlename: string) {
    this.addressService.GetTitleByName(titlename).subscribe((res:any) => { 
      this.profiletitle = res;
    });
  }

  public getGenders() {
    this.addressService.GetAllGenders().subscribe((res:any) => {
      this.genders = res;
    });
  }

  public getGenderByName(gendername: string) {
    this.addressService.GetGenderByName(gendername).subscribe((res:any) => {
      this.profilegender = res;
    });
  }

  public getProvinceByName(provincename: string) {
    this.addressService.GetProvinceByName(provincename).subscribe((res:any) => {
      this.profileprovince = res;
    });
  }

  public getCityByName(cityname: string) {
    this.addressService.GetCityByName(cityname).subscribe((res:any) => {
      this.profilecity = res;
    });
  }

  onProvinceChange() {
    for (let index = 0; index < this.provinces.length; index++) 
    {
      if (this.provinces[0] == this.selectedProvince) 
      {
        this.cities = this.gautentCities;
      }
      else if (this.provinces[1] == this.selectedProvince)
      {
        this.cities = this.westernCapeCities;
      }
      else if (this.provinces[2] == this.selectedProvince)
      {
        this.cities = this.kwaZuluNatalCities;
      }
      else if (this.provinces[3] == this.selectedProvince)
      {
        this.cities = this.easternCapeCities;
      }
      else if (this.provinces[4] == this.selectedProvince)
      {
        this.cities = this.freeStateCities;
      }
      else if (this.provinces[5] == this.selectedProvince)
      {
        this.cities = this.limpopoCities;
      }
      else if (this.provinces[6] == this.selectedProvince)
      {
        this.cities = this.mpumalangaCities;
      }
      else if (this.provinces[7] == this.selectedProvince)
      {
        this.cities = this.northernCapeCities;
      }
      else if (this.provinces[8] == this.selectedProvince)
      {
        this.cities = this.northWestCities;
      }
      else
      {
        this.cities = [];
      }
    }
  }

  saveProfile(){
    var newProfile: Customer;
    newProfile = {
      Title: this.profiletitle,
      Gender: this.selectedGender,
      FirstName: this.FirstName,
      Surname: this.surname,
      Cell_Number: this.cellNumber,
      Email: this.email,
      Address: {
        Address_ID: 0,
        Street: this.street,
        Number: this.number,
        Unit_Number: this.unitNumber,
        Dwelling_Type: this.dwellingType,
        Area_Code: this.areaCode,
        City_Name: this.profilecity,
        Province_Name: this.selectedProvince
      }
    }

    this.profileService.CreateCustomerProfile(newProfile).subscribe((res:any) => {
      console.log(res);
    });
  }

}
