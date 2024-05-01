import { ForgetPasswordComponent } from './components/forget-password/ForgetPassword.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { RestPasswordComponent } from './components/restPassword/restPassword.component';

const routes: Routes = [{ path: 'register', component: RegisterComponent },
                        { path: 'forgetPass', component: ForgetPasswordComponent },
                        { path: 'restPass', component: RestPasswordComponent },
                        { path: '', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
