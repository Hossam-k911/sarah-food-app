import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const _Router=inject(Router);
  const _AuthService=inject(AuthService);

  const role=_AuthService.role;
  console.log("roleGard",role);

  if (localStorage.getItem('userToken')&&role=='SystemUser') {
     return true
  }
  _Router.navigateByUrl('auth')
  return false;
};
