import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from  '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { VerifyDialogComponent  } from './components/verifyDialog/verifyDialog';
import { ForgetPasswordComponent } from './components/forget-password/ForgetPassword.component';
import { RestPasswordComponent } from './components/restPassword/restPassword.component';

@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    VerifyDialogComponent,
    ForgetPasswordComponent,
    RestPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule
  ],
})
export class AuthModule { }
