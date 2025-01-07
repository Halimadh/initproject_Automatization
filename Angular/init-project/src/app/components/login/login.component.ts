import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../services/auth/Auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  title ='Login page'
  loginForm = new FormGroup({
    username: new FormControl(),
    pwd :new FormControl()
  })
  constructor(
    private formBuilder: FormBuilder, 
    private service: LoginService, 
    private router: Router  ,  private spinnerService:NgxSpinnerService
    ){}
    public inputType:string='password';
    public showPassword(event:any):void{
      if(event.target.checked){
        this.inputType='text'
      }else{
        this.inputType='password'
      }
    }

  ngOnInit(){
    
    this.loginForm = this.formBuilder.group({
      username : ['', Validators.required],
      pwd: ['', Validators.required]
    })
	}

alert : string = '';

async onClickLogin(data : any){
  if (data.username == '' || data.pwd == ''){
    this.alert = "All fields are required.";
    return ;
  }
  this.spinnerService.show()
  let res = await this.service.authenticate(data.username,data.pwd);
  this.spinnerService.hide()
  if (res === false){
    this.alert = "Invalid username or password. ";
  }
  this.service.storeUserToken(res.token);
  localStorage.setItem('userDetails', JSON.stringify(res.user));
  if(res.user.role=="admin"){
    this.router.navigateByUrl(`/admin/dashboard`);
  }else{
    this.router.navigateByUrl(`/testHome`);
  }
}

}
