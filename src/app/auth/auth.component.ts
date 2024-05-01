import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from '../core/services/Notify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  hide: boolean = true;
  token:any;
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/),
    ]),
  });
  constructor(private _AuthService: AuthService,
    private _Router:Router,
    private _NotifyService:NotifyService
  ) {}
  ngOnInit(): void {
    console.log('fd');
  }

  onLogin(data: FormGroup) {
    console.log('data', data);

    this._AuthService.login(data.value).subscribe({
      next: (res) => {
        this.token=res
      },
      error: (errRes) => {
        const errMes=errRes.error.message
        this._NotifyService.ServerError(errMes)
      },
      complete: () => {
        localStorage.setItem('userToken', this.token.token);
        this._AuthService.getProfile();
        this._Router.navigateByUrl('dashboard')
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
