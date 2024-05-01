import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotifyService } from 'src/app/core/services/Notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './ForgetPassword.component.html',
  styleUrls: ['./ForgetPassword.component.scss'],
})
export class ForgetPasswordComponent {
  hide: boolean = true;
  forgetForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/),
    ]),
  });
  constructor(private _AuthService: AuthService,
              private _NotifyService:NotifyService,
              private _Router:Router
  ) {}
  ngOnInit(): void {
    console.log('fd');
  }

  onForgetForm(data: FormGroup) {
    console.log('data', data);

    this._AuthService.forgetPass(data.value).subscribe({
      next: (res) => {
        this._NotifyService.Success(res.message);
        this._Router.navigateByUrl('auth/restPass')
      },
      error: () => {},
    });
  }
  get email() {
    return this.forgetForm.get('email');
  }
}
