import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../../../../services/UserService/user-service.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  
  UpdateForm= new FormGroup({
    name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    role: new FormControl(),
    pwd: new FormControl(),
    confirmPwd: new FormControl()
  })

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    private userService: UserServiceService
  ){}

  user_username:any;
  user_role:any;
  user_name: any;
  user_email:any;
  public inputType:string='password';
  public showPassword(event:any):void{
    if(event.target.checked){
      this.inputType='text'
    }else{
      this.inputType='password'
    }
  }

  ngOnInit(){
    let vals = this.route.params.subscribe(params => {
      this.user_username = params ['username'],
      this.user_role = params['role'];
      this.user_name = params ['name'];
      this.user_email = params['email'];
    })

    this.userService.getUserByUsername(this.user_username).subscribe((res:any)=>{
      console.log(res);
      this.UpdateForm= new FormGroup({
        name: new FormControl(res['name']),
        username: new FormControl(res['username']),
        email: new FormControl(res['email']),
        role: new FormControl(res['role']),
        pwd: new FormControl({value: '', disabled: true}),
        confirmPwd: new FormControl({value: '', disabled: true})
      })
    })
  }

  checkEmail(email:string) : boolean{
    //checks email patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let testValidity = emailRegex.test(email);
    if (testValidity == false){
      return false;
    }
    else return true;
  }

  checkPassword (password: string, confirmPassword: string): boolean{
    if (password == '' || password == ' ' ) {
      return false;  
    }
    //checks password == confirmPassword ?
    if (password != confirmPassword ){
      return false;
    }
    return true;
  }

  updateName( userName:string, nameUpdated:string): boolean{
    if(nameUpdated != userName && nameUpdated != ' ' && nameUpdated != ''){
      return true;
  }
    else if (nameUpdated == userName) return true;
    else return false;
  }

  async updateUsername(username:string, usernameUpdated:string){
      if (username != usernameUpdated){
        let testUnicity = await this.userService.checkUnicityUsername(usernameUpdated).toPromise();
          if (testUnicity)
          {       
            return true;
          }
          else 
            return false; 
      }
      else return true; 

  }

  updateEmail(userEmail:string, emailUpdated:string){
    if ((emailUpdated != userEmail) && (this.checkEmail(emailUpdated) )){
        return true;
    }
    else if (this.checkEmail(emailUpdated)== false) 
    {
      return false;
    }
    return true;
  }

  updatePassword(pwdUpdated:string, confirmPwdUpdated:string){
      if (this.checkPassword( pwdUpdated, confirmPwdUpdated)){
        this.userService.updatePassword(this.user_name, pwdUpdated).subscribe();
        return true;
      }
      return false;
  }

  updateRole(userRole: string, roleUpdated:string){
    if (roleUpdated != userRole ){
      return true;
    }
    return true;
  }

  success: string ='';
  error : string ='';
  spinner : boolean = false;
  clickUpdatePwd : boolean = false;

  async onclickUpdate(){
  
      this.success = '';
      this.error = '';
      this.spinner= true;
      
      console.log(this.UpdateForm.value)
      var name = this.UpdateForm.value.name;
      var username = this.UpdateForm.value.username;
      var email = this.UpdateForm.value.email;
      var role = this.UpdateForm.value.role;
      var password = this.UpdateForm.value.pwd;
      var confirmPassword = this.UpdateForm.value.confirmPwd;

      var resName: boolean = this.updateName(this.user_name,name);
      var resUsername:boolean = await this.updateUsername(this.user_username, username);
      var resEmail:boolean = this.updateEmail(this.user_email, email);
      var resRole = this.updateRole(this.user_role, role);
      var resPassword:boolean = true;
      var updateName : boolean = false;
      var updateUsername : boolean = false;
      var updateEmail : boolean = false;
      var updateRole : boolean = false;
      var updatePassword : boolean = false;
    
    
      if (this.fieldsEnabled){
        resPassword = this.updatePassword(password,confirmPassword);
        if (resPassword){
         
          updatePassword = true;
        }
      }
     if (resUsername && username != this.user_username){
        this.userService.updateUsername(this.user_username, username).subscribe((data:any)=>{
          
        });
        updateUsername = true;
      }
      if (resName && name != this.user_name ){
        this.userService.updateName(this.user_username, name).subscribe((data:any)=>{
          
        });
        updateName = true;
      }
      if (resEmail && email != this.user_email){
        this.userService.updateEmail(this.user_username, email).subscribe((data:any)=>{
          
        });
        updateEmail = true;
      }
      if (resRole && role != this.user_role){
        this.userService.updateRole(this.user_username, role).subscribe((data:any)=>{
         
        });
         updateRole = true;
      }
     if(updateName||updateUsername||updateEmail||updateEmail||updatePassword||updateRole){
      this.router.navigate(['/admin/consulter-users']);
     }
      //checks the inputs.
      if (resUsername==false){
        this.error = "Please enter a valid unique username. ";
      }
      else if (resName==false){
        this.error = "Please enter a valid name. ";
      }
      else if (resEmail==false){
        this.error = "Please enter a valid email. ";
      }
      else if (resPassword==false){
        this.error = "Please check your password. ";
      }
      else if ((resUsername || resName || resEmail || resRole || resPassword) && (updateUsername || updateName || updateRole || updateEmail || updatePassword) ) {
        this.success = "This user is updated successfully. ";
      }

  }
  
  fieldsEnabled :boolean = false;

  enableFields() {
    this.UpdateForm.get('pwd')?.enable();
    this.UpdateForm.get('confirmPwd')?.enable();
    this.fieldsEnabled = true;
  }

}
