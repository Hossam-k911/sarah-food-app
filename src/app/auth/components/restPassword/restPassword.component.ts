import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/Notify.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-restPassword',
  templateUrl: './restPassword.component.html',
  styleUrls: ['./restPassword.component.scss']
})
export class RestPasswordComponent implements OnInit {

  hide: boolean = true;
  files: File[] = [];
  imgSrc: any;

  resetPassForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    seed: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      this.passwordMatchValidator(), // Pass the reference to the validator function
    ]),

  });

  passwordMatchValidator():ValidatorFn{
   return (control:AbstractControl):ValidationErrors|null =>{
    const password=control.get('password');
    const confirmPassword=control.get('confirmPassword');
    const ValidationError={'confirmPassMismatchPass':{'value':confirmPassword}}
    if (password?.value!==confirmPassword?.value) {
      return ValidationError;
    }else return null
   }
  }
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _NotifyService:NotifyService,
  ) {}
  ngOnInit(): void {}



  onResetPass(data: FormGroup) {
    this._AuthService.RestPass(data.value).subscribe({
      next: (res) => {
        this._NotifyService.Success("Data is Sent Successfully");
        this._Router.navigateByUrl('auth')
      },
      error:(errRes)=>{
        const errMsg=errRes.error.message
        this._NotifyService.ServerError(errMsg)
      }
    });
  }


  get email() {
    return this.resetPassForm.get('email');
  }

  get password() {
    return this.resetPassForm.get('password');
  }
  get confirmPassword() {
    return this.resetPassForm.get('confirmPassword');
  }
  get seed() {
    return this.resetPassForm.get('seed');
  }

}
