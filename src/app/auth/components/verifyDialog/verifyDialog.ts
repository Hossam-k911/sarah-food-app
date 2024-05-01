import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-popup',
  templateUrl: './verifyDialog.component.html',
  styleUrls: ['./verifyDialog.component.scss']
})
export class VerifyDialogComponent  {


  verifyForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required, Validators.email
    ]),
    code: new FormControl(null, [Validators.maxLength(8)]),
  });

  constructor(private _AuthService:AuthService){

  }

  onVerifyAccount(data: FormGroup) {
    this._AuthService.verifyAccount(data.value).subscribe({
      next: (res:any) => {
        console.log(res);
      },
    });
  }
}
