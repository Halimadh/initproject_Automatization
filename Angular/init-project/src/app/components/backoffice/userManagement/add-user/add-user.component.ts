import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserServiceService } from '../../../../services/UserService/user-service.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/Auth.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent {

  AddForm= new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    role: new FormControl(),
    pwd: new FormControl(),
    confirmPwd: new FormControl()
  })
  
  drawerMode: string="";


  constructor(
    private userService: UserServiceService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private authserv: LoginService
  )
  {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.drawerMode = 'open';
      this.cdRef.detectChanges();
    }, 0);
  }
  
  checkemail(data:any): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(data.email);
  }

  checkPassword(data: any) : boolean{
    if ((data.pwd!=null) && (data.pwd.trim() === '')) return false;
    if ((data.pwd == data.confirmPwd) && (data.pwd != null) && (data.pwd != undefined) && (data.pwd.charAt[0] != ' ')){
      return true;
    }
    return false;
  }

  checkAllRequiredFields(data: any) : boolean{
    if (data.name ==null){
      return false;
    }
    else if (data.username == null){
      return false;
    }
    else if (data.email == null){
      return false;
    }
    else if (data.role == null){
      return false;
    }
    else if (data.pwd == null){
      return false;
    }
    else if (data.confirmPwd == null){
      return false;
    }
    return true;
  }

  checkValidity(data:any): boolean{
    if ((this.checkPassword(data)) && (this.checkAllRequiredFields(data)) && (this.checkemail(data))){
      return true;
    }
    return false;
  }

  role(data:any){
    if (data.role =='simpleUser') return 'simple user';
    else return 'admin';
  }
  response: string='';

  onclickAdd(data:any){
    if( this.checkValidity(data)){
      this.userService.createUser(data.username,data.name,data.email,this.role(data),data.pwd).subscribe(()=>{
        let res= this.authserv.sendEmailConfirmation(data.email,data.username,data.pwd)
        this.router.navigate(['/admin/consulter-users']);
      
      });
    }
    
    else{
    if (this.checkAllRequiredFields(data)==false){
      this.response = "Please fill in all the required fields. ";
    } 
    else if (this.checkemail(data)==false){
      this.response="Please enter a valid email. ";
    }
    else if (this.checkPassword(data)==false){
      this.response ="Please check your password. ";
    } 
    }

    

  }


}
