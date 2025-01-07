import { Component } from '@angular/core';
import { LoginService } from '../services/auth/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent {
  constructor( protected authService : LoginService, private router:Router){}

  onClickVersions(){
    this.router.navigate([''])
  }
}
