import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/core/services/Notify.service';
import { MatDialog } from '@angular/material/dialog';
import { VerifyDialogComponent  } from '../verifyDialog/verifyDialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide: boolean = true;
  files: File[] = [];
  imgSrc: any;

  registerForm = new FormGroup({
    userName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z]+\d+$/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]), //egypt number
    country: new FormControl(null, [Validators.required]),
    profileImage: new FormControl(null),
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


  verifyForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required, Validators.email
    ]),
    code: new FormControl(null, [Validators.required,Validators.maxLength(8)]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _NotifyService:NotifyService,
    private _MatDialog: MatDialog
  ) {}
  ngOnInit(): void {}


  onRegister(data: FormGroup) {
    let myData = new FormData();

    myData.append('profileImage', this.imgSrc);

    Object.entries(data.value).forEach(([key, value]) => {
      if (value) {
        myData.append(key, value as string);
      }
    });

    this._AuthService.register(myData).subscribe({
      next: (res) => {
        console.log(res);
        this._NotifyService.Success("Data is Sent Successfully")
      },
      error:(errRes)=>{
        const errMsg=errRes.error.message
        this._NotifyService.ServerError(errMsg)
      }
    });
  }

  onVerifyAccount(data: FormGroup) {
    this._AuthService.verifyAccount(data.value).subscribe({
      next: (res) => {
        this._NotifyService.Success("Data is Sent Successfully");
        setTimeout(() => {
          this._Router.navigateByUrl('/auth')
        }, 2000);

      },
      error:(errRes)=>{
        const errMsg=errRes.error.message
        this._NotifyService.ServerError(errMsg)
      }
    });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imgSrc = this.files[0];
  }
  openVerifyDialog(){
    this._MatDialog.open(VerifyDialogComponent ,{width: '500px',height: '400px',})
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  get userName() {
    return this.registerForm.get('userName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get country() {
    return this.registerForm.get('country');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // verify form
  get verifyMail() {
    return this.verifyForm.get('email');
  }
  get code() {
    return this.verifyForm.get('code');
  }
}
