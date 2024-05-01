import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { jwtDecode } from 'jwt-decode';
import { NotifyService } from 'src/app/core/services/Notify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role: string|null=null;
  constructor(
    private _HttpClient: HttpClient) {
      //because if change token and make reload
    if (localStorage.getItem('userToken')!==null) {
        this.getProfile()
    }
  }

   getProfile() {
    let encoded: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('role', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    this.getRole();
  }
  getRole() {
    if (
      localStorage.getItem('userToken') != null &&
      localStorage.getItem('role') != null
    ) {
      this.role =localStorage.getItem('role') ;
    }
  }
  login(data: Auth.ILogin): Observable<any> {
    return this._HttpClient.post('Users/Login', data);
  }
  forgetPass(data: Auth.IForgetPass): Observable<any> {
    return this._HttpClient.post('Users/Reset/Request', data);
  }


  register(data: FormData): Observable<any> {
    return this._HttpClient.post('Users/Register', data);
  }
  verifyAccount(data: Auth.IVerifyAccount) {
    return this._HttpClient.put('Users/verify', data);
  }
  RestPass(data: Auth.IResetPass) {
    return this._HttpClient.post('Users/Reset', data);
  }
}
