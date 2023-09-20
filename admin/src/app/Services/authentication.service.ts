import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Response } from '../Models/response';
import { Customer } from '../Models/customer';
import { ForgotPasswordViewModel } from '../ViewModels/forgotPasswordVM';
import { RegisterVM } from '../ViewModels/registerVM';
import { ChangePasswordVM } from '../ViewModels/changepasswordVM';
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  apiUrl = 'https://localhost:44390/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }
  islogged: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  public Login(username: string, password: string) {
    let loginCredentials = {
      'username': username, 
      'password': password
    };
    return this.httpClient.post<Response>(`${this.apiUrl}Authenticate/login`, loginCredentials)
    .pipe(tap(res => {
      this.islogged = true;
      console.log(this.islogged);
      let token = this.getDecodedAccessToken(JSON.stringify(res));
      let roleLongName = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';  // TODO: Change to 'role' when using Azure AD 
      let nameLongName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('name', token[nameLongName]);
      localStorage.setItem('roles', token[roleLongName]);
      this.currentUser.next({
        name: token[nameLongName],
        roles: token[roleLongName]
      });    
    }))  
  }

  public getUser() {
    return this.currentUser.asObservable();
  }

  public GetAdminID(username:string){ 
    return this.httpClient.get(`${this.apiUrl}Authenticate/GetAdminID`+ "/" + username)
    .pipe(map(result => result))
  }

  public GetEmployeeID(username:string){ 
    return this.httpClient.get(`${this.apiUrl}Authenticate/GetEmployeeID`+ "/" + username)
    .pipe(map(result => result))
  }

  public Logout() {
    localStorage.removeItem('token');
    this.currentUser.next(false);
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  hasPermission(permission: string[]): boolean {
    let token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    console.log(token);
    if (token) {
      let permissions = token.permissions;
      for (let i = 0; i < permissions.length; i++) {
        if (permission.includes(permissions[i])) {
          return true;
        }
      }
    }
    return false;
  }

  //*** Registering ***//
  public RegisterCustomer(customer: RegisterVM){
    return this.httpClient.post<Response>(`${this.apiUrl}Authenticate/RegisterCustomer`, customer, this.httpOptions)
  }

  public RegisterAdmin(admin: RegisterVM){
    return this.httpClient.post<Response>(`${this.apiUrl}Authenticate/RegisterAdmin`, admin, this.httpOptions)
  }

  public RegisterEmployee(employee: RegisterVM){
    return this.httpClient.post<Response>(`${this.apiUrl}Authenticate/RegisterEmployee`, employee, this.httpOptions)
  }

  public ForgotPassword(forgotpassword: ForgotPasswordViewModel){
    return this.httpClient.post(`${this.apiUrl}Authenticate/ForgotPassword`, forgotpassword, this.httpOptions)
  }

  public ChangeUserPassword(changepasswordVM: ChangePasswordVM){
    return this.httpClient.post<Response>(`${this.apiUrl}Authenticate/ChangeUserPassword`, changepasswordVM, this.httpOptions)
  }

  public DeleteUser(username: string){
    return this.httpClient.delete<Response>(`${this.apiUrl}Authenticate/DeleteUser/${username}`)
      .pipe(map(result => result))
  }
}


