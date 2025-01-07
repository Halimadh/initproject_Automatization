import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { LoginService } from '../auth/Auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
 constructor (
  private service : LoginService,
  private router : Router
  ){}
  
  canActivate(): boolean{
    if (this.service.isLoggedIn()){
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
